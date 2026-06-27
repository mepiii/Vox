"""Purpose: FastAPI entrypoint for Vox backend.
Callers: Uvicorn, deployment runtimes.
Deps: FastAPI, CORS middleware, route modules.
API: app ASGI application.
Side effects: Registers routes and CORS policy.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routes import download, health, transcribe, upload, video

app = FastAPI(title=settings.app_name, version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3020", "http://127.0.0.1:3020"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(upload.router)
app.include_router(transcribe.router)
app.include_router(download.router)
app.include_router(video.router)
