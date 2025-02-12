#!/bin/bash

set -e

if [ "$#" -lt 4 ]; then
    echo "Error: Missing required parameters"
    echo "Usage: $0 DB_CONTAINER_NAME DB_ROOT_PASSWORD DB_NAME DB_PORT [MYSQL_VERSION]"
    exit 1
fi

DB_CONTAINER_NAME=$1
DB_ROOT_PASSWORD=$2
DB_NAME=$3
DB_PORT=$4
MYSQL_VERSION=${5:-"latest"}

if [ -z "$DB_CONTAINER_NAME" ] || [ -z "$DB_ROOT_PASSWORD" ] || [ -z "$DB_NAME" ] || [ -z "$DB_PORT" ]; then
    echo "Error: All parameters must have values"
    exit 1
fi

if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
    echo "Container $DB_CONTAINER_NAME is already running"
elif [ "$(docker ps -aq -f status=exited -f name=$DB_CONTAINER_NAME)" ]; then
    echo "Container $DB_CONTAINER_NAME exists but is not running. Starting it..."
    docker start $DB_CONTAINER_NAME
else
    if ! docker image inspect mysql:$MYSQL_VERSION >/dev/null 2>&1; then
        echo "Pulling MySQL image..."
        docker pull mysql:$MYSQL_VERSION
    else
        echo "MySQL image already exists. Skipping pull..."
    fi

    echo "Starting new MySQL container..."
    docker run -d \
        --name $DB_CONTAINER_NAME \
        -e MYSQL_ROOT_PASSWORD=$DB_ROOT_PASSWORD \
        -e MYSQL_DATABASE=$DB_NAME \
        -p $DB_PORT:3306 \
        mysql:$MYSQL_VERSION

    echo "Waiting for MySQL to start..."
    sleep 10
fi

echo "Checking database..."
if docker exec $DB_CONTAINER_NAME mysql -uroot -p$DB_ROOT_PASSWORD -e "USE $DB_NAME" 2>/dev/null; then
    echo "Database $DB_NAME already exists"
else
    echo "Creating database $DB_NAME..."
    docker exec $DB_CONTAINER_NAME mysql \
        -uroot \
        -p$DB_ROOT_PASSWORD \
        -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;"
    echo "Database created successfully"
fi

echo "Database(MySql) setup completed successfully!"
