#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ ! -f .env ]]; then
  echo "No .env file. Run: cp env/secrets.template .env"
  exit 1
fi

if grep -v '^[[:space:]]*#' .env | grep -qE '=PASTE_|^PASTE_'; then
  echo "Replace all PASTE_ placeholders in .env before pushing to Netlify."
  exit 1
fi

echo "Using: $(pwd)/.env"
echo "Importing .env into Netlify (linked site)..."
npx netlify env:import .env --replace-existing
echo "Done. If API still returns Unauthorized, trigger one Netlify deploy (Deploys → Trigger deploy)."
echo "Test with: npm run newsletter:dry-run"
