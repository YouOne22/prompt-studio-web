import os
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from google import genai
from prompts.builder import build_prompt

app = FastAPI(title="Prompt Studio API", version="1.0.0")

# Mount folder static untuk JavaScript & CSS
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
                model="openai_api_key",
                contents=user_content,
                config={"system_instruction": system_instruction}
            )
            if response and response.text:
                return {"status": "success", "prompt": response.text}
        except Exception as e:
            print(f"[Warning] Gemini API Error / Failover to Fallback: {e}")

    return {"status": "success", "prompt": fallback_result}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
