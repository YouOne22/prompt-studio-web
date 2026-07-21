from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Prompt Studio Web is Running!"}

@app.get("/api/debug")
def debug():
    return {"status": "ok", "message": "Endpoint debug aktif!"}