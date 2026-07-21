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
    target_ai: str = "ChatGPT"
    details: str = ""

@app.get("/", response_class=FileResponse)
def read_root():
    return FileResponse("index.html")

@app.get("/api/health")
def health_check():
    return {"status": "ok", "app": "Prompt Studio Web"}

def generate_local_fallback(topic: str, tone: str, target_ai: str, details: str) -> str:
    tones_map = {
        "Kreatif & Naratif": "Gunakan pendekatan bercerita yang imajinatif dan memikat.",
        "Professional & Persuasif": "Gunakan gaya bahasa bisnis yang lugas, otoritatif, dan meyakinkan.",
        "Kasual & Ramah": "Gunakan gaya bahasa santai, akrab, dan mudah dicerna.",
        "Teknis & Detail": "Berikan spesifikasi teknis mendalam dan terstruktur logis."
    }
    
    selected_tone = tones_map.get(tone, "Gunakan gaya profesional.")
    extra = f"\nKonteks Tambahan: {details}" if details else ""

    return (
        f"[OPTIMIZED PROMPT FOR {target_ai.upper()}]\n\n"
        f"Act as an elite Prompt Engineering Specialist. Your task is to process the following core objective:\n"
        f"Topic: {topic}\n\n"
        f"[EXECUTION GUIDELINES]\n"
        f"- Tone & Style: {tone} ({selected_tone})\n"
        f"- Target Platform: Optimized specifically for the nuances and capabilities of {target_ai}.\n"
        f"- Structure: Provide a clear persona, step-by-step instructions, constraints, and expected output format.{extra}\n\n"
        f"Deliver a highly structured, production-ready master prompt that is robust, actionable, and yields exceptional results."
    )

@app.post("/api/generate")
def generate_prompt(req: PromptRequest):
    system_instruction = (
        f"Kamu adalah Prompt Engineering Specialist tingkat tinggi. "
        f"Tugasmu adalah meracik topik, tone, dan detail dari user menjadi Master Prompt "
        f"yang sangat efektif dan terstruktur khusus untuk platform {req.target_ai}.\n\n"
        f"Aturan Penting: Output HARUS langsung berupa teks prompt final tanpa salam pembuka, "
        f"tanpa penjelasan tambahan, dan tanpa komentar meta."
    )

    user_content = (
        f"Topik Utama: {req.topic}\n"
        f"Gaya Bahasa/Tone: {req.tone}\n"
        f"Target AI: {req.target_ai}\n"
        f"Detail/Konteks Khusus: {req.details if req.details else 'Tidak ada'}"
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
    fallback_result = generate_local_fallback(req.topic, req.tone, req.target_ai, req.details)
    return {"status": "success", "prompt": fallback_result}
