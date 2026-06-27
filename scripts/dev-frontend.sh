#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../frontend"
export NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL:-http://127.0.0.1:8010}
exec npm run dev -- --port 3020
