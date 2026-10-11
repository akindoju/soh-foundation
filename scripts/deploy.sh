#!/usr/bin/env bash
#
# Deploy using a personal Vercel token, so the global CLI login can stay signed
# into work. `--token` authenticates as the token's owner for this command only
# and ignores whoever `vercel login` last set - nothing to switch, ever.
#
#   npm run deploy          preview URL (nobody sees it unless you share it)
#   npm run deploy:prod     promote to the real domain
#
# Reads VERCEL_TOKEN (and optionally VERCEL_SCOPE) from .env.deploy, which is
# gitignored and never uploaded.
set -euo pipefail
cd "$(dirname "$0")/.."

if [ ! -f .env.deploy ]; then
  cat >&2 <<'MSG'
Missing .env.deploy

Create it with your personal Vercel token:

  VERCEL_TOKEN=xxxxxxxxxxxxxxxxxxxx

Get one at https://vercel.com/account/tokens while signed in to your PERSONAL
account. When creating it, set Scope to your personal account - not a team.
MSG
  exit 1
fi

# shellcheck disable=SC1091
set -a; . ./.env.deploy; set +a

if [ -z "${VERCEL_TOKEN:-}" ]; then
  echo "VERCEL_TOKEN is empty in .env.deploy" >&2
  exit 1
fi

ARGS=(--token "$VERCEL_TOKEN")
[ -n "${VERCEL_SCOPE:-}" ] && ARGS+=(--scope "$VERCEL_SCOPE")

# Confirm which account the token belongs to before anything is uploaded -
# cheap insurance against publishing to the wrong place.
echo "Deploying as: $(vercel whoami "${ARGS[@]}" 2>/dev/null | tail -1)"

if [ "${1:-}" = "prod" ]; then
  echo "→ PRODUCTION"
  vercel deploy --prod "${ARGS[@]}"
else
  echo "→ preview"
  vercel deploy "${ARGS[@]}"
fi
