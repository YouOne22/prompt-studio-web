import os
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from google import genai

app = FastAPI()

api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key) if api_key else None

class PromptRequest(BaseModel):
    design_type: str
    sub_style: str
    orientation: str = "Landscape (Horizontal)"
    size: str = "3x1 meter"
    tone: str = "Professional & Persuasif"
    target_ai: str = "ChatGPT"
    details: str = ""

@app.get("/", response_class=FileResponse)
def read_root():
    return FileResponse("index.html")

@app.get("/api/health")
def health_check():
    return {"status": "ok", "app": "Prompt Studio Web"}

def generate_local_fallback(design_type: str, sub_style: str, orientation: str, size: str, tone: str, target_ai: str, details: str) -> str:
    extra = f"\n- Catatan Spesifik / Konteks: {details}" if details else ""
    
    # Menentukan parameter aspect ratio untuk AI Image Generator (Midjourney / DALL-E)
    ar_hint = "--ar 16:9"
    if "Portrait" in orientation:
        ar_hint = "--ar 2:3" if ("Kartu" in design_type or "Poster" in design_type) else "--ar 9:16"
    elif "Persegi" in orientation or "Square" in orientation:
        ar_hint = "--ar 1:1"
    elif "Landscape" in orientation:
        ar_hint = "--ar 3:1" if "Spanduk" in design_type else "--ar 16:9"

    return (
        f"[MASTER DESIGN PROMPT FOR {target_ai.upper()}]\n\n"
        f"Act as a World-Class Art Director and Master Visual Designer. "
        f"Create an exhaustive, professional design brief and generation prompt for the following project:\n\n"
        f"[PROJECT SPECIFICATIONS]\n"
        f"- Jenis Desain: {design_type.upper()}\n"
        f"- Sub-Kategori / Gaya: {sub_style}\n"
        f"- Orientasi Tata Letak: {orientation}\n"
        f"- Dimensi Ukuran: {size}\n"
        f"- Tone & Visual Atmosphere: {tone}\n"
        f"- Target AI Platform: {target_ai}{extra}\n\n"
        f"[BRIEF DESAIN & INSTRUKSI EKSEKUSI]\n"
        f"1. KONSEP VISUAL & ATMOSFER:\n"
        f"   - Rekomendasi Palet Warna (Warna Utama, Sekunder, dan Aksensuasi).\n"
        f"   - Gaya Tipografi (Font Header yang menonjol & Font Body yang legibel).\n\n"
        f"2. TATA LETAK & HIERARKI VISUAL ({size} - {orientation}):\n"
        f"   - Pembagian area fokus (Focal Point), penempatan Judul Utama, dan Call-to-Action (CTA).\n"
        f"   - Batas aman cetak (Safe Zone & Bleed Margins) jika untuk media cetak.\n\n"
        f"3. DRAF COPYWRITING PERSUASIF:\n"
        f"   - Headline memikat, Sub-headline pendukung, dan susunan teks informasi penting.\n\n"
        f"4. PROMPT SPESIFIK GENERATOR GAMBAR (Midjourney / DALL-E / Stable Diffusion):\n"
        f"   - Teks prompt visual: High resolution, photorealistic / clean vector illustration, professional studio lighting, centered layout, {ar_hint}."
    )

@app.post("/api/generate")
def generate_prompt(req: PromptRequest):
    system_instruction = (
        f"Kamu adalah Art Director dan Prompt Engineering Specialist tingkat tinggi. "
        f"Tugasmu adalah merancang Master Prompt desain visual profesional berstandar industri tinggi "
        f"untuk pembuatan '{req.design_type}' gaya '{req.sub_style}', berukuran '{req.size}' ({req.orientation}). "
        f"Gaya bahasa/tone adalah '{req.tone}' dan ditujukan khusus untuk platform '{req.target_ai}'.\n\n"
        f"Aturan Penting:\n"
        f"1. Buat struktur brief yang mencakup Komposisi Visual, Tata Letak presisi sesuai ukuran {req.size}, Palet Warna, dan Draf Teks Persuasif.\n"
        f"2. Sertakan rekomendasi parameter aspect ratio (--ar) jika dipakai pada AI Image Generator.\n"
        f"3. Output HARUS langsung berupa Master Prompt final tanpa salam pembuka dan tanpa penjelasan meta."
    )

    user_content = (
        f"Jenis Desain: {req.design_type}\n"
        f"Sub-Kategori/Gaya: {req.sub_style}\n"
        f"Orientasi: {req.orientation}\n"
        f"Ukuran: {req.size}\n"
        f"Tone/Gaya Bahasa: {req.tone}\n"
        f"Target AI: {req.target_ai}\n"
        f"Detail Tambahan: {req.details if req.details else 'Tidak ada'}"
    )

    if client:
        try:
            response = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=user_content,
                config={"system_instruction": system_instruction}
            )
            if response and response.text:
                return {"status": "success", "prompt": response.text}
        except Exception:
            pass

    # Fallback lokal cerdas jika AI limit/offline
    fallback_result = generate_local_fallback(
        req.design_type, req.sub_style, req.orientation, req.size, req.tone, req.target_ai, req.details
    )
    return {"status": "success", "prompt": fallback_result}
