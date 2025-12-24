#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

echo "🔎 Searching for package.json files..."
mapfile -t PKGS < <(find . -name package.json \
  -not -path "*/node_modules/*" \
  -not -path "*/dist/*" \
  -not -path "*/build/*" \
  -not -path "*/.git/*")

if [ "${#PKGS[@]}" -eq 0 ]; then
  echo "No package.json found."
  exit 0
fi

echo "✅ Found ${#PKGS[@]} project(s). Installing..."
for pkg in "${PKGS[@]}"; do
  dir="$(dirname "$pkg")"
  echo ""
  echo "📦 Installing in: $dir"
  (cd "$dir" && npm install)
done

echo ""
echo "🎉 Done."