#!/bin/sh
set -e

INDEX_FILE=$(find /usr/share/caddy -name 'index*.html' | head -n 1)

if [ -z "$INDEX_FILE" ]; then
  echo "Error: index.html not found in /usr/share/caddy"
  exit 1
fi

# Use -i.bak for Alpine sed compatibility and chain sed commands.
sed -i.bak \
    -e "s|__VITE_API_URL__|${VITE_API_URL}|g" \
    -e "s|__VITE_REVERB_APP_KEY__|${VITE_REVERB_APP_KEY}|g" \
    -e "s|__VITE_REVERB_HOST__|${VITE_REVERB_HOST}|g" \
    -e "s|__VITE_REVERB_PORT__|${VITE_REVERB_PORT}|g" \
    -e "s|__VITE_REVERB_SCHEME__|${VITE_REVERB_SCHEME}|g" \
    "$INDEX_FILE"

# Remove the backup file created by sed
rm "${INDEX_FILE}.bak"

echo "Runtime config injected. Starting Caddy server."

caddy run --config /etc/caddy/Caddyfile --adapter caddyfile