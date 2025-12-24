#!/usr/bin/env bash
set -euo pipefail

echo "🧨 Uninstalling backend..."
rm -rf backend/node_modules

echo "🧨 Uninstalling frontend..."
rm -rf frontend/node_modules

echo "🔥 Done."