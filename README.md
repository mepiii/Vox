# Vox

Vox is an AI-powered audio and video transcription platform that generates clean transcripts, synced subtitles, summaries, and export-ready files using faster-whisper and FFmpeg.

## Overview

Vox turns audio and video into timestamped text, editable subtitle segments, lightweight summaries, and downloadable export files. It is built as a production-style portfolio SaaS with a Next.js dashboard frontend and FastAPI machine-learning backend.

## Features

- Audio transcription
- Video transcription with FFmpeg audio extraction
- Synced subtitle generation
- Transcript editor
- Subtitle editor with timing edits
- TXT, SRT, VTT, JSON, CSV exports
- Summary, key points, action items
- Optional video subtitle burn-in endpoint
- Premium animated landing page
- Dark dashboard workflow

## Tech stack

- Frontend: Next.js, TypeScript, TailwindCSS, Framer Motion, lucide-react, React Dropzone
- Backend: Python, FastAPI, Pydantic, Uvicorn
- ML: faster-whisper, CPU/int8 by default
- Media: FFmpeg
- Storage: local `uploads`, `outputs`, `temp` folders

## Screenshots placeholder

Add landing, upload, processing, and editor screenshots after running locally.

## Architecture

```txt
frontend app -> FastAPI routes -> services -> local storage
                           ├── file_service
                           ├── audio_service / FFmpeg
                           ├── whisper_service / faster-whisper
                           ├── subtitle_service
                           ├── summary_service
                           └── video_service / FFmpeg burn-in
```

## How it works

1. User uploads audio or video.
2. Backend validates file type and size.
3. Video files are converted to WAV with FFmpeg.
4. faster-whisper creates timestamped segments.
5. Vox writes TXT, SRT, VTT, JSON, and CSV exports.
6. User edits transcript or subtitle timings.
7. Backend regenerates export files.

## Backend setup

```bash
python -m venv backend/venv
backend/venv/bin/pip install -r backend/requirements.txt
npm run dev:backend
```

GPU mode is default for your RTX 3050. CPU fallback:

```bash
npm run dev:backend:cpu
```

Check FFmpeg:

```bash
ffmpeg -version
```

## Frontend setup

```bash
npm --prefix frontend install
npm run dev:frontend
```

## Environment variables

Backend `.env`:

```env
APP_NAME=Vox
BACKEND_HOST=127.0.0.1
BACKEND_PORT=8010
WHISPER_MODEL_SIZE=base
WHISPER_DEVICE=cuda
WHISPER_COMPUTE_TYPE=float16
WHISPER_CPU_THREADS=2
WHISPER_NUM_WORKERS=1
WHISPER_GPU_DEVICE_INDEX=0
MAX_UPLOAD_SIZE_MB=100
UPLOAD_DIR=uploads
OUTPUT_DIR=outputs
TEMP_DIR=temp
```

Frontend `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8010
```

## API documentation

- `GET /health`
- `POST /api/upload`
- `POST /api/transcribe`
- `POST /api/segments/update`
- `GET /api/download/{filename}`
- `POST /api/video/burn`

## Export formats

- TXT clean transcript
- SRT subtitle captions
- VTT web captions
- JSON segment data
- CSV spreadsheet data

## Future improvements

- Background jobs for long media
- Supabase/S3/Cloudinary storage adapter
- Real speaker diarization
- LLM-powered summaries and translation
- Auth and project history
- GPU deployment profile

## Deployment notes

- Frontend: Vercel
- Backend: Railway, Render, or Docker VPS
- Backend image must include FFmpeg
- Whisper model downloads can be heavy
- CPU inference can be slow on long files
