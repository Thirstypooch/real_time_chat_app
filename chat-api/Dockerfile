# Use an official PHP image with FPM (FastCGI Process Manager)
FROM php:8.3-fpm

# Set working directory
WORKDIR /var/www/html

# Install system dependencies
# ADDED postgresql-client to make `pg_isready` available
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    libzip-dev \
    libpq-dev \
    nginx \
    supervisor \
    postgresql-client \
    && docker-php-ext-install pdo pdo_pgsql zip sockets pcntl

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy application code
COPY . .

# Copy fly.io configurations
COPY .fly/nginx /etc/nginx
COPY .fly/php /usr/local/etc/php
COPY .fly/supervisor /etc/supervisor

# Set correct permissions for scripts
# THIS IS A CRITICAL STEP
RUN chmod +x /var/www/html/.fly/entrypoint.sh \
    && chmod +x /var/www/html/.fly/start-nginx.sh \
    && chmod +x /var/www/html/.fly/scripts/*.sh

# Install composer dependencies
RUN composer install --no-interaction --no-dev --no-plugins --no-scripts --prefer-dist --optimize-autoloader

RUN rm -f .env

# Create run directory and set correct permissions for PHP-FPM and Laravel
RUN mkdir -p /var/run/php && \
    chown -R www-data:www-data /var/run/php && \
    chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose port 8080
EXPOSE 8080

# Set the container's entrypoint
ENTRYPOINT ["/var/www/html/.fly/entrypoint.sh"]
