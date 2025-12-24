#!/usr/bin/env bash
set -euo pipefail

echo "📦 Installing backend..."
( cd backend && npm install )

echo "📦 Installing frontend..."
( cd frontend && npm install )

echo "🎉 Done."