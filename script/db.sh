#!/bin/bash

set -e

if [ "$#" -lt 5 ]; then
    echo "Error: Missing required parameters"
    echo "Usage: $0 DATABASE_PORT DATABASE_USERNAME DATABASE_PASSWORD DATABASE_NAME ROOT_PASSWORD"
    exit 1
fi

DATABASE_PORT=$1
DATABASE_USERNAME=$2
DATABASE_PASSWORD=$3
DATABASE_NAME=$4
ROOT_PASSWORD=$5

CONTAINER_NAME="mysql-${DATABASE_USERNAME}"

if [ -z "$DATABASE_PORT" ] || [ -z "$DATABASE_USERNAME" ] || [ -z "$DATABASE_PASSWORD" ] || [ -z "$DATABASE_NAME" ] || [ -z "$ROOT_PASSWORD" ]; then
    echo "Error: All parameters must have values"
    exit 1
fi

if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "Container $CONTAINER_NAME is already running"
elif [ "$(docker ps -aq -f status=exited -f name=$CONTAINER_NAME)" ]; then
    echo "Container $CONTAINER_NAME exists but is not running. Starting it..."
    docker start $CONTAINER_NAME
else
    if ! docker image inspect mysql:8.0 >/dev/null 2>&1; then
        echo "Pulling MySQL image..."
        docker pull mysql:8.0
    else
        echo "MySQL image already exists. Skipping pull..."
    fi

    echo "Starting new MySQL container..."
    docker run -d \
        --name $CONTAINER_NAME \
        -e MYSQL_ROOT_PASSWORD=$ROOT_PASSWORD \
        -p $DATABASE_PORT:3306 \
        mysql:8.0

    echo "Waiting for MySQL to start..."
    sleep 15
fi

echo "Setting up database and user permissions..."
docker exec $CONTAINER_NAME mysql -uroot -p$ROOT_PASSWORD -e "
    CREATE DATABASE IF NOT EXISTS $DATABASE_NAME;
    CREATE USER IF NOT EXISTS '$DATABASE_USERNAME'@'%' IDENTIFIED BY '$DATABASE_PASSWORD';
    GRANT ALL PRIVILEGES ON $DATABASE_NAME.* TO '$DATABASE_USERNAME'@'%';
    FLUSH PRIVILEGES;
"

echo "Verifying database access..."
if docker exec $CONTAINER_NAME mysql -u$DATABASE_USERNAME -p$DATABASE_PASSWORD -e "USE $DATABASE_NAME" 2>/dev/null; then
    echo "Database setup verified successfully"
else
    echo "Error: Failed to verify database access"
    exit 1
fi

echo "Database(MySQL) setup completed successfully!"
