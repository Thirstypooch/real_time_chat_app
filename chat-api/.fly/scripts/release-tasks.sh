#!/usr/bin/env bash

# This script runs before the app is started, as a release command.
# It is a good place to run database migrations.

set -e # Abort with an error if any command fails

# Wait for the database to be ready
# We will use a simple loop to try and connect.
# The `pg_isready` command is a lightweight way to check if the PostgreSQL server is accepting connections.
# We need to parse the DATABASE_URL to get the connection details.
DB_HOST=$(echo $DATABASE_URL | awk -F'[@:/]' '{print $5}')
DB_PORT=$(echo $DATABASE_URL | awk -F'[:/]' '{print $6}')
DB_USER=$(echo $DATABASE_URL | awk -F'[:@]' '{print $2}' | awk -F':' '{print $1}')
DB_NAME=$(echo $DATABASE_URL | awk -F'/' '{print $NF}')

echo "Waiting for database to be ready..."
counter=0
while ! PGPASSWORD=$(echo $DATABASE_URL | awk -F'[:@]' '{print $2}' | awk -F':' '{print $2}') pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -q; do
    sleep 2
    counter=$((counter+1))
    if [ $counter -ge 30 ]; then
        echo "Database did not become ready in time. Aborting."
        exit 1
    fi
done
echo "Database is ready."

# Run the migrations
/usr/bin/php /var/www/html/artisan migrate --force
