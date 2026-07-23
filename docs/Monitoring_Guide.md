# Monitoring & Logging

## Backend Logs
The backend uses **Winston** for file logging and **Morgan** for HTTP logging.
- Error logs: Inside the container at `/app/logs/error.log`
- Access logs: Inside the container at `/app/logs/combined.log`

To view logs in real-time from Docker:
```bash
docker-compose logs -f backend
```

## Health Checks
- **API Status**: `GET http://localhost:5000/api/health`
- **Database Status**: The docker-compose file inherently tracks Postgres health using `pg_isready`.
