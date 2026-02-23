#!/bin/bash

# Get Netlify access token from config
TOKEN=$(cat ~/.config/netlify/config.json 2>/dev/null | python3 -c "import sys, json; print(json.load(sys.stdin)['users'][0]['auth']['token'])" 2>/dev/null)

if [ -z "$TOKEN" ]; then
  echo "Could not find Netlify token, trying alternative location..."
  TOKEN=$(netlify api listSites --data '{}' 2>&1 | grep -o 'token.*' | cut -d' ' -f2)
fi

SITE_ID="e86c2722-dd7a-4d82-ac6f-96aadd412558"
DOMAIN="weldonmakori.com"

# Add custom domain to Netlify site
curl -X POST "https://api.netlify.com/api/v1/sites/${SITE_ID}/domains" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{\"domain\": \"${DOMAIN}\"}"

echo ""
echo "Domain added. Checking SSL certificate provisioning..."

# Check domain status
curl -X GET "https://api.netlify.com/api/v1/sites/${SITE_ID}/domains/${DOMAIN}" \
  -H "Authorization: Bearer ${TOKEN}"
