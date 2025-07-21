# Build Stage
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_REVERB_APP_KEY
ENV VITE_REVERB_APP_KEY=$VITE_REVERB_APP_KEY
RUN npm run build

# Production Stage
FROM caddy:2-alpine
WORKDIR /usr/share/caddy
COPY --from=build /app/dist/ ./
# Use a Caddyfile for SPA routing
COPY Caddyfile /etc/caddy/Caddyfile