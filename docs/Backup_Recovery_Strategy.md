# Backup & Disaster Recovery Strategy

## Database Backups
PostgreSQL is orchestrated via Docker. To create a backup dump, run:
```bash
docker-compose exec -t db pg_dump -U postgres smart_workshop -F c > backup_$(date +%Y%m%d).dump
```

### Cron Job Automation
Set up a daily cron job at 02:00 AM on the host machine:
```text
0 2 * * * /usr/local/bin/docker-compose -f /path/to/repo/docker-compose.yml exec -T db pg_dump -U postgres smart_workshop -F c > /path/to/backups/db_$(date +\%Y\%m\%d).dump
```

## File Uploads Backup
Asset images and documents are stored in the `backend_uploads` docker volume. 
Archive them regularly:
```bash
tar -czvf uploads_backup_$(date +%Y%m%d).tar.gz /var/lib/docker/volumes/repo_backend_uploads/_data
```
