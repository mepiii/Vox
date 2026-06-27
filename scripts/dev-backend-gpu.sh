#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
cp backend/.env.gpu backend/.env
export PYTHONPATH=backend
export OMP_NUM_THREADS=${OMP_NUM_THREADS:-2}
export MKL_NUM_THREADS=${MKL_NUM_THREADS:-2}
export TOKENIZERS_PARALLELISM=${TOKENIZERS_PARALLELISM:-false}
exec backend/venv/bin/uvicorn app.main:app --host 127.0.0.1 --port 8010
