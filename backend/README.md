# Vox Backend

FastAPI service for uploads, faster-whisper transcription, subtitle exports, summaries, and FFmpeg video subtitle burn-in.

## Run

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
../scripts/dev-backend.sh
```

FFmpeg must exist on PATH for video extraction and burn-in.
