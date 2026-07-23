# Production Security Checklist

- [ ] **HTTPS/TLS**: Ensure the server sits behind a reverse proxy (like Nginx/HAProxy/AWS ALB) configured with SSL certificates.
- [ ] **CORS Settings**: Restrict `CORS_ORIGIN` in `backend/.env` to the exact frontend domain.
- [ ] **Strong Passwords**: Change `DB_PASSWORD` and all `JWT_SECRET` keys from the default templates.
- [ ] **Firewall**: Restrict port `5432` (DB) and `5000` (API) so they are only accessible internally or by the load balancer. Port `80`/`443` should be the only exposed ports.
- [ ] **Rate Limiting**: Currently configured to 100 requests / 15 mins for Auth. Adjust as needed.
- [ ] **Helmet**: Helmet is enabled on the backend to enforce secure HTTP headers and basic Content Security Policies (CSP).
