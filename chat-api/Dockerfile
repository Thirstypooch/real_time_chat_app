# Use an official PHP image with FPM (FastCGI Process Manager)
FROM php:8.3-fpm

# Set working directory
WORKDIR /var/www/html

# Install system dependencies needed for Laravel
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    libzip-dev \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql zip sockets

# Install Composer (PHP package manager)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy existing application directory contents
COPY . .

# Install composer dependencies
RUN composer install --no-interaction --no-plugins --no-scripts --prefer-dist --optimize-autoloader

# Expose port 8000 for the PHP server
EXPOSE 8000
