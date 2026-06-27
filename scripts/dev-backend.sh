#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
exec ./scripts/dev-backend-gpu.sh
