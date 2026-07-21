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
    tone: str
    target_ai: str = "ChatGPT"
    details: str = ""

@app.get("/", response_class=FileResponse)
def read_root():
    return FileResponse("index.html")

@app.get("/api/health")
def health_check():
    return {"status": "ok", "app": "Prompt Studio Web"}

def generate_local_fallback(design_type: str, sub_style: str, tone: str, target_ai: str, details: str) -> str:
    extra = f"\n- Detail/Khas Klien: {details}" if details else ""
    return (
        f"[OPTIMIZED PROMPT FOR {target_ai.upper()}]\n\n"
        f"Act as an expert Visual Design Director and Master Prompt Engineer. "
        f"Your task is to generate professional design concepts, layout structures, and copywriting frameworks for:\n"
        f"- Jenis Desain: {design_type.toUpperCase()}\n"
        f"- Sub-Kategori / Gaya: {sub_style}\n"
        f"- Tone & Gaya Bahasa: {tone}\n"
        f"- Target Platform AI: {target_ai}\n"
        f"{extra}\n\n"
        f"[STRUKTUR OUTPUT YANG DIINGINKAN]\n"
        f"1. Konsep Visual & Palet Warna Utama\n"
        f"2. Tata Letak (Layout & Hierarki Informasi)\n"
        f"3. Draf Copywriting / Teks Utama yang Persuasif\n"
        f"4. Prompt Spesifik (jika untuk AI Image Generator seperti Midjourney / DALL-E) atau Instruksi Eksekusi."
    )

@app.post("/api/generate")
def generate_prompt(req: PromptRequest):
    system_instruction = (
        f"Kamu adalah pakar Desain Grafis dan Prompt Engineering tingkat tinggi. "
        f"Tugasmu adalah merancang instruksi/prompt profesional untuk pembuatan aset visual "
        f"berupa {req.design_type} dengan gaya '{req.sub_style}', bernuansa '{req.tone}', "
        f"khusus untuk platform {req.target_ai}.\n\n"
        f"Aturan Penting: Output HARUS langsung berupa teks prompt final yang terstruktur, "
        f"kaya detail kreatif, tanpa salam pembuka dan tanpa penjelasan tambahan."
    )

    user_content = (
        f"Jenis Desain: {req.design_type}\n"
        f"Sub-Kategori/Gaya Desain: {req.sub_style}\n"
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

    # Fallback lokal cerdas jika AI offline/limit
    fallback_result = generate_local_fallback(req.design_type, sub_style=req.sub_style, tone=req.tone, target_ai=req.target_ai, details=req.details)
    return {"status": "success", "prompt": fallback_result}
