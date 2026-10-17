#!/usr/bin/env bash
# Publishes Speedy Learning to Cloudflare Pages and connects www.speedylearning.co.uk.
# Needs CLOUDFLARE_API_TOKEN (Pages: Edit, DNS: Edit) and CLOUDFLARE_ACCOUNT_ID in the environment.
set -euo pipefail
: "${CLOUDFLARE_API_TOKEN:?Add CLOUDFLARE_API_TOKEN to the environment}"
: "${CLOUDFLARE_ACCOUNT_ID:?Add CLOUDFLARE_ACCOUNT_ID to the environment}"
PROJECT=speedylearning
API=https://api.cloudflare.com/client/v4
AUTH=(-H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" -H "Content-Type: application/json")

rm -rf dist && mkdir -p dist
cp src/public/games/speedy-learning.html dist/index.html

# Create the Pages project the first time (ignore "already exists")
curl -sS "${AUTH[@]}" -X POST "$API/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects" \
  -d "{\"name\":\"$PROJECT\",\"production_branch\":\"main\"}" >/dev/null || true

npx --yes wrangler@3 pages deploy dist --project-name "$PROJECT" --branch main --commit-dirty=true

# Connect the domains (Cloudflare adds the DNS records and certificate when the zone is on the same account)
for d in www.speedylearning.co.uk speedylearning.co.uk; do
  curl -sS "${AUTH[@]}" -X POST "$API/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects/$PROJECT/domains" -d "{\"name\":\"$d\"}" | head -c 300; echo
done

# Make sure www points at the Pages site
ZONE=$(curl -sS "${AUTH[@]}" "$API/zones?name=speedylearning.co.uk" | sed -n 's/.*"id":"\([a-f0-9]\{32\}\)".*/\1/p' | head -1)
if [ -n "$ZONE" ]; then
  for host in www speedylearning.co.uk; do
    curl -sS "${AUTH[@]}" -X POST "$API/zones/$ZONE/dns_records" \
      -d "{\"type\":\"CNAME\",\"name\":\"$host\",\"content\":\"$PROJECT.pages.dev\",\"proxied\":true}" | head -c 200; echo
  done
fi
echo "Done: https://www.speedylearning.co.uk (may take a few minutes to go live)"
