# Use an official PHP image with FPM (FastCGI Process Manager)
FROM php:8.3-fpm

# Set working directory
WORKDIR /var/www/html

# Install system dependencies needed for Laravel, Nginx, and Supervisor
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    libzip-dev \
    libpq-dev \
    nginx \
    supervisor \
    && docker-php-ext-install pdo pdo_pgsql zip sockets pcntl

# Install Composer (PHP package manager)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy the application code
COPY . .

# Copy your existing fly.io configurations into the image
COPY .fly/nginx /etc/nginx
COPY .fly/php /usr/local/etc/php
COPY .fly/supervisor /etc/supervisor

# Install composer dependencies for production
RUN composer install --no-interaction --no-dev --no-plugins --no-scripts --prefer-dist --optimize-autoloader

# Set correct permissions for storage and bootstrap cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose port 8080 for Nginx
EXPOSE 8080

# Set the container's entrypoint to your existing script
ENTRYPOINT ["/var/www/html/.fly/entrypoint.sh"]
