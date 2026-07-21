import os
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from google import genai

app = FastAPI()

# Mengambil API Key dari Variables Railway
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

@app.post("/api/generate")
def generate_prompt(req: PromptRequest):
    if not client:
        raise HTTPException(
            status_code=500, 
            detail="GEMINI_API_KEY belum terdeteksi. Pastikan variabel sudah ada di Railway."
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
        response = client.models.generate_content(
            model="gemini-1.5-flash",
            contents=user_content,
            config={"system_instruction": system_instruction}
        )
        return {"status": "success", "prompt": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gagal generate dari AI: {str(e)}")
