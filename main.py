import os
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from google import genai
from prompts.builder import build_prompt

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key) if api_key else None

class PromptRequest(BaseModel):
    design_type: str
    sub_style: str
    orientation: str = "Landscape (Horizontal)"
    size: str = "3x1 meter"
    render_mode: str = "Flat Vector / Siap Cetak"
    tone: str = "Professional & Persuasif"
    target_ai: str = "ChatGPT"
    details: str = ""

@app.get("/", response_class=FileResponse)
def read_root():
    return FileResponse("index.html")

@app.get("/api/health")
def health_check():
    return {"status": "ok", "app": "Prompt Studio 3-Column Workspace"}

@app.post("/api/generate")
def generate_prompt(req: PromptRequest):
    system_instruction, user_content, fallback_result = build_prompt(req)

    if client:
        try:
            response = client.models.generate_content(
                model="gemini-Imagen-3",
                contents=user_content,
                config={"system_instruction": system_instruction}
            )
            if response and response.text:
                return {"status": "success", "prompt": response.text}
        except Exception:
            pass

    return {"status": "success", "prompt": fallback_result}
