#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

ENV_FILE="${ENV_FILE:-.env}"
DRY_RUN="${DRY_RUN:-true}"
SLUG="${SLUG:-munduk-moding-plantation-review}"
SITE="${SITE:-https://voyaflair.com}"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing $ENV_FILE — run: cp env/secrets.template .env and fill PASTE_ values"
  exit 1
fi

# Load KEY=value lines (skip comments and blanks)
while IFS= read -r line || [[ -n "$line" ]]; do
  [[ "$line" =~ ^[[:space:]]*# ]] && continue
  line="$(echo "$line" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
  [[ -z "$line" ]] && continue
  [[ "$line" != *=* ]] && continue
  key="${line%%=*}"
  value="${line#*=}"
  value="${value//$'\r'/}"
  value="$(printf '%s' "$value" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
  export "${key}=${value}"
done < "$ENV_FILE"

if [[ -z "${NEWSLETTER_ADMIN_SECRET:-}" ]] || [[ "${NEWSLETTER_ADMIN_SECRET}" == PASTE_* ]]; then
  echo "Set NEWSLETTER_ADMIN_SECRET in $(pwd)/$ENV_FILE"
  exit 1
fi

BODY="{\"articleSlug\":\"$SLUG\""
if [[ "$DRY_RUN" == "true" ]]; then
  BODY+=",\"dryRun\":true"
fi
BODY+="}"

curl -s -X POST "${SITE}/api/send-newsletter/" \
  -H "Authorization: Bearer ${NEWSLETTER_ADMIN_SECRET}" \
  -H "Content-Type: application/json" \
  -d "$BODY"
echo
