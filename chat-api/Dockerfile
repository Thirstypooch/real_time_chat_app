# Use a standard PHP 8.2 FPM image as our base
FROM php:8.2-fpm as base

# Set working directory
WORKDIR /var/www/html

# Install system dependencies required by Laravel and PHP extensions
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev \
    libpq-dev \
    nginx \
    supervisor

# Install PHP extensions
RUN docker-php-ext-install pdo_pgsql bcmath gd zip pcntl

# Get the latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy application code
COPY . .

# Install Composer dependencies
RUN composer install --no-dev --no-interaction --no-plugins --no-scripts --prefer-dist --optimize-autoloader
RUN php artisan migrate --force

# --- Final Image ---
FROM base as final

# Copy application code again to ensure correct context
COPY . .

# Set permissions for Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Copy Nginx, PHP-FPM, and Supervisor configurations
COPY .docker/nginx/default.conf /etc/nginx/sites-available/default
COPY .docker/php/www.conf /usr/local/etc/php-fpm.d/www.conf
COPY .docker/supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose port 8080 for Nginx
EXPOSE 8080

# The main command to run when the container starts
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
