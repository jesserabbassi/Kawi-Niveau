### Building and running the full application

Run Docker Compose from the repository root:

```powershell
docker compose up --build
```

The services will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Swagger UI: http://localhost:5000/swagger
- PostgreSQL from the host machine: localhost:5433

Inside Docker, containers talk to each other by service name:

- Backend connects to PostgreSQL with `Host=database;Port=5432`
- Frontend browser code calls the backend through the host URL `http://localhost:5000/api`

To stop the app:

```powershell
docker compose down
```

To also delete the database data volume and start with a fresh database:

```powershell
docker compose down -v
```
