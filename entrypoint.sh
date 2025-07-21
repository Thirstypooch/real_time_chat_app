#!/bin/sh
set -e

# Find the built index.html file
INDEX_FILE=$(find /usr/share/caddy -name 'index-*.html')

# Replace placeholders with environment variables
sed -i "s|__VITE_API_URL__|${VITE_API_URL}|g" $INDEX_FILE
sed -i "s|__VITE_REVERB_APP_KEY__|${VITE_REVERB_APP_KEY}|g" $INDEX_FILE
sed -i "s|__VITE_REVERB_HOST__|${VITE_REVERB_HOST}|g" $INDEX_FILE
sed -i "s|__VITE_REVERB_PORT__|${VITE_REVERB_PORT}|g" $INDEX_FILE
sed -i "s|__VITE_REVERB_SCHEME__|${VITE_REVERB_SCHEME}|g" $INDEX_FILE

echo "Runtime config injected. Starting Caddy server."

# Start the Caddy server
caddy run --config /etc/caddy/Caddyfile --adapter caddyfile