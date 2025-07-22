#!/bin/sh
set -e

# Get the list of VITE_ variables from the environment
VITE_VARS=$(env | grep '^VITE_' | awk -F= '{print $1}')

# Go through each VITE_ variable
for VAR_NAME in $VITE_VARS
do
  # Read the value of the variable
  VAR_VALUE=$(eval echo "\$$VAR_NAME")
  # Replace the placeholder in the index.html file
  sed -i "s|__${VAR_NAME}__|${VAR_VALUE}|g" /usr/share/nginx/html/index.html
done

# Start the web server
exec nginx -g 'daemon off;'