#!/usr/bin/env bash
set -e

if [ -z "$DATABASE_URL" ]; then
    echo "ERROR: DATABASE_URL environment variable is not set."
    exit 1
fi

# Parse DATABASE_URL
export DB_CONNECTION=pgsql
export DB_HOST=$(echo "$DATABASE_URL" | awk -F'@' '{print $2}' | awk -F':' '{print $1}')
export DB_PORT=$(echo "$DATABASE_URL" | awk -F':' '{print $4}' | awk -F'/' '{print $1}')
export DB_DATABASE=$(echo "$DATABASE_URL" | awk -F'/' '{print $NF}' | awk -F'?' '{print $1}')
export DB_USERNAME=$(echo "$DATABASE_URL" | awk -F'://' '{print $2}' | awk -F':' '{print $1}')
export DB_PASSWORD=$(echo "$DATABASE_URL" | awk -F':' '{print $3}' | awk -F'@' '{print $1}')


echo "--> Running release tasks..."

# Wait for database
echo "Connecting to database '$DB_DATABASE' on host '$DB_HOST'..."
counter=0
while ! pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USERNAME" -d "$DB_DATABASE" -q; do
    sleep 2
    counter=$((counter+1))
    if [ $counter -ge 30 ]; then
        echo "Error: Database did not become ready in 60 seconds."
        exit 1
    fi
    echo "Database not ready, waiting..."
done
echo "Database is ready!"

# Force Laravel to read fresh environment variables
echo "Clearing cached configuration..."
/usr/local/bin/php /var/www/html/artisan config:clear

# Run migrations
echo "Running database migrations..."
/usr/local/bin/php /var/www/html/artisan migrate --force
echo "Migrations complete."

echo "--> Release tasks finished."
