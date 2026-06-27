"""Purpose: Central settings for Vox backend.
Callers: FastAPI routes and media services.
Deps: pydantic-settings, pathlib.
API: settings singleton with app, storage, and Whisper config.
Side effects: Creates local storage folders on import.
"""
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parents[1]


class Settings(BaseSettings):
    app_name: str = "Vox"
    backend_host: str = "127.0.0.1"
    backend_port: int = 8010
    whisper_model_size: str = "tiny"
    whisper_device: str = "cpu"
    whisper_compute_type: str = "int8"
    whisper_cpu_threads: int = 2
    whisper_num_workers: int = 1
    whisper_gpu_device_index: int = 0
    max_upload_size_mb: int = 100
    upload_dir: Path = BASE_DIR / "uploads"
    output_dir: Path = BASE_DIR / "outputs"
    temp_dir: Path = BASE_DIR / "temp"

    model_config = SettingsConfigDict(env_file=BASE_DIR / ".env", env_file_encoding="utf-8")

    @property
    def max_upload_bytes(self) -> int:
        return self.max_upload_size_mb * 1024 * 1024


settings = Settings()
for directory in (settings.upload_dir, settings.output_dir, settings.temp_dir):
    directory.mkdir(parents=True, exist_ok=True)
