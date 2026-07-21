import os
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from google import genai

app = FastAPI()

api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key) if api_key else None

class PromptRequest(BaseModel):
    topic: str
    tone: str
    details: str = ""

@app.get("/", response_class=FileResponse)
def read_root():
    return FileResponse("index.html")

@app.get("/api/health")
def health_check():
    return {"status": "ok", "app": "Prompt Studio Web"}

# Fungsi Cadangan (Local Fallback Generator) jika AI kena Limit/Eror
def generate_local_fallback(topic: str, tone: str, details: str) -> str:
    tones_map = {
        "Kreatif & Naratif": "Gunakan pendekatan bercerita yang imajinatif, emosional, dan memikat.",
        "Professional & Persuasif": "Gunakan gaya bahasa bisnis yang lugas, otoritatif, dan meyakinkan untuk konversi tinggi.",
        "Kasual & Ramah": "Gunakan gaya bahasa santai, akrab, seperti berbicara langsung dengan teman dekat.",
        "Teknis & Detail": "Berikan spesifikasi teknis yang mendalam, terstruktur secara logis, dan analitis."
    }
    
    selected_tone_instruction = tones_map.get(tone, "Gunakan gaya bahasa yang profesional dan efektif.")
    extra_context = f"\nKonteks Tambahan: {details}" if details else ""

    return (
        f"[PERAN & TUJUAN]\n"
        f"Kamu adalah seorang pakar Prompt Engineering profesional dan Senior Specialist di bidangnya. "
        f"Tugasmu adalah merancang dan mengeksekusi topik '{topic}' dengan standar kualitas tertinggi.\n\n"
        f"[PANDUAN GAYA & TONE]\n"
        f"- Gaya Bahasa: {tone} ({selected_tone_instruction})\n\n"
        f"[STRUKTUR & INSTRUKSI KHUSUS]\n"
        f"1. Analisis inti permasalahan dari topik yang diberikan secara mendalam.\n"
        f"2. Berikan hasil yang terstruktur dengan kerangka kerja yang jelas (Judul, Poin Utama, dan Call-to-Action).\n"
        f"3. Pastikan output langsung dapat digunakan tanpa penjelasan bertele-tele.{extra_context}\n\n"
        f"[FORMAT OUTPUT]\n"
        f"Berikan jawaban yang sangat rapi, terstruktur, mudah dipahami, dan berstandar industri tinggi."
    )

@app.post("/api/generate")
def generate_prompt(req: PromptRequest):
    system_instruction = (
        "Kamu adalah Prompt Engineering Specialist tingkat tinggi. "
        "Tugasmu adalah mengambil topik kasar, gaya bahasa, dan detail dari user, "
        "lalu meraciknya menjadi sebuah Master Prompt yang sangat efektif, terstruktur, "
        "dan siap dipakai oleh AI seperti ChatGPT, Claude, atau Gemini.\n\n"
        "Aturan Penting: Output HARUS langsung berupa teks prompt final tanpa salam pembuka, "
        "tanpa penjelasan tambahan, dan tanpa komentar meta."
    )

    user_content = (
        f"Topik Utama: {req.topic}\n"
        f"Gaya Bahasa/Tone: {req.tone}\n"
        f"Detail/Konteks Khusus: {req.details if req.details else 'Tidak ada'}"
    )

    # Coba gunakan Gemini AI terlebih dahulu jika client ada
    if client:
        try:
            response = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=user_content,
                config={"system_instruction": system_instruction}
            )
            if response and response.text:
                return {"status": "success", "prompt": response.text}
        except Exception as e:
            # Jika terkena limit (429) atau eror koneksi, jalankan fallback secara otomatis diam-diam
            pass

    # Jika AI gagal/kena limit, fallback lokal langsung aktif tanpa bikin user pusing
    fallback_result = generate_local_fallback(req.topic, req.tone, req.details)
    return {"status": "success", "prompt": fallback_result}
