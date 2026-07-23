# Deployment Guide

## Prerequisites
- Docker Engine & Docker Compose installed.
- Git installed.
- Access to ports `80` and `5000`.

## Quick Start
1. Clone the repository.
2. Copy environment templates:
   ```bash
   cp .env.example .env
   cp backend/.env.example backend/.env
   cp smart-workshop/.env.example smart-workshop/.env
   ```
3. Edit the `.env` files with production secrets (change JWT keys, Database passwords).
4. Run the stack:
   ```bash
   docker-compose up -d --build
   ```
5. Apply database migrations:
   ```bash
   docker-compose exec backend npm run db:push
   ```

The frontend will be available at `http://localhost` and the API at `http://localhost:5000`.
