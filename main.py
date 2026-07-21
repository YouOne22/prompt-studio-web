import os
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
import google.generativeai as genai

app = FastAPI()

# Inisialisasi API Key dari Variables Railway
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

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

@app.post("/api/generate")
def generate_prompt(req: PromptRequest):
    if not api_key:
        raise HTTPException(
            status_code=500, 
            detail="GEMINI_API_KEY belum terdeteksi di Railway."
        )
    
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

    try:
        # Memaksa penggunaan API v1 Stable agar tidak 404
        model = genai.GenerativeModel(
            model_name="models/gemini-1.5-flash",
            system_instruction=system_instruction
        )
        
        # Override client options ke v1
        response = model.generate_content(
            user_content,
            request_options={"api_version": "v1"}
        )
        return {"status": "success", "prompt": response.text}
    except Exception as e:
        err_msg = str(e)
        if "429" in err_msg:
            raise HTTPException(
                status_code=429, 
                detail="Antrean AI sedang penuh (Rate Limit). Silakan tunggu sekitar 30 detik lalu coba lagi."
            )
        raise HTTPException(status_code=500, detail=f"Gagal generate dari AI: {err_msg}")
