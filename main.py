import os
import json
import urllib.request
import urllib.error
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel

app = FastAPI()

api_key = os.getenv("GEMINI_API_KEY")

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

    # URL Endpoint Resmi Gemini 1.5 Flash (REST API v1beta)
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"

    payload = {
        "system_instruction": {
            "parts": [{"text": system_instruction}]
        },
        "contents": [
            {
                "parts": [{"text": user_content}]
            }
        ]
    }

    headers = {"Content-Type": "application/json"}

    try:
        data = json.dumps(payload).encode("utf-8")
        request = urllib.request.Request(url, data=data, headers=headers, method="POST")
        
        with urllib.request.urlopen(request) as response:
            res_body = json.loads(response.read().decode("utf-8"))
            generated_text = res_body["candidates"][0]["content"]["parts"][0]["text"]
            return {"status": "success", "prompt": generated_text}

    except urllib.error.HTTPError as e:
        error_response = e.read().decode("utf-8")
        if e.code == 429:
            raise HTTPException(
                status_code=429,
                detail="Antrean AI sedang penuh (Rate Limit). Tunggu sekitar 30 detik lalu coba lagi."
            )
        raise HTTPException(status_code=e.code, detail=f"Google API Error ({e.code}): {error_response}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gagal memproses request: {str(e)}")
