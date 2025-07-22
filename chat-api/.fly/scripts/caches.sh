#!/usr/bin/env bash

# Use the correct path for the PHP executable
/usr/local/bin/php /var/www/html/artisan config:cache --no-ansi -q
# /usr/local/bin/php /var/www/html/artisan route:cache --no-ansi -q
/usr/local/bin/php /var/www/html/artisan view:cache --no-ansi -q
