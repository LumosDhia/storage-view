#!/bin/bash

# --- StorageView / OpenList Start Script ---
echo "🚀 Starting StorageView Dashboard..."

# 1. Create docker-compose.yml if it doesn't exist
if [ ! -f docker-compose.yml ]; then
    echo "📄 Creating docker-compose.yml..."
    cat <<EOF > docker-compose.yml
version: '3.3'
services:
    alist:
        image: 'xhofe/alist:latest'
        container_name: alist
        volumes:
            - './data:/opt/alist/data'
        ports:
            - '5244:5244'
        environment:
            - PUID=0
            - PGID=0
            - UMASK=022
        restart: always
EOF
fi

# 2. Start the Docker services
echo "🐳 Pulling and starting OpenList (Alist) via Docker..."
docker compose up -d

# 3. Wait for the container to initialize
echo "⏳ Waiting for initialization..."
sleep 8

# 4. Set the admin password
echo "🔑 Setting admin password to 'admin123'..."
docker exec alist ./alist admin set admin123

# 5. Output Success
echo ""
echo "✅ StorageView is now running!"
echo "------------------------------------------------"
echo "🌐 URL:      http://localhost:5244"
echo "👤 Username: admin"
echo "🔑 Password: admin123"
echo "------------------------------------------------"
echo "Log in and go to 'Storage' to add your R2 and Google Drive."
