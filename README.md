# Client Table Demo (React + ASP.NET Core)

This repository contains a full-stack demo application for managing clients.

- The frontend is built with React + Vite.
- The backend is built with ASP.NET Core Web API + Entity Framework Core.
- Data is stored in SQL Server.

The app lets you:

- list clients,
- filter by name, email, and deactivation date,
- add new clients,
- deactivate active clients.

## Project Structure

```
.
├── backend/    # ASP.NET Core Web API (net8.0)
└── frontend/   # React app (Vite)
```

## Tech Stack

- Backend: ASP.NET Core 8, Entity Framework Core 8, SQL Server provider
- Frontend: React 19, Vite 7
- API style: REST (`/api/klijenti`)

## Prerequisites

- .NET SDK 8.0+
- Node.js 18+ and npm
- SQL Server instance (or SQL Server LocalDB on Windows)

## Backend Setup

1. Go to the backend folder:

```bash
cd backend
```

2. Configure the connection string in `backend/appsettings.json`.

Current default:

```json
"ConnectionStrings": {
	"DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=API;Integrated Security=True;TrustServerCertificate=True"
}
```

If you are not on Windows/LocalDB, replace it with your SQL Server connection string.

3. Apply migrations (if needed):

```bash
dotnet tool install --global dotnet-ef
dotnet ef database update
```

4. Run the backend:

```bash
dotnet run
```

Backend runs on:

- `http://localhost:5057`
- `https://localhost:7031`

## Frontend Setup

1. Open a new terminal and go to frontend:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

Frontend runs on:

- `http://localhost:5173`

## CORS

The backend CORS policy currently allows:

- `http://localhost:5173`

If your frontend runs on another origin, update CORS configuration in `backend/Program.cs`.

## API Endpoints

Base URL: `http://localhost:5057/api/klijenti`

- `GET /api/klijenti` - Get all clients
- `GET /api/klijenti/{id}` - Get one client by ID
- `POST /api/klijenti` - Create a client
- `PUT /api/klijenti/{id}` - Update a client
- `DELETE /api/klijenti/{id}` - Delete a client
- `PUT /api/klijenti/{id}/deaktiviraj` - Deactivate a client

Example request body for create/update:

```json
{
	"name": "John Doe",
	"email": "john@example.com",
	"phone": "+38160123456",
	"poslovnoLice": false,
	"datumKreiranja": "2026-03-25T00:00:00",
	"aktivan": true
}
```

## Development Notes

- Frontend currently calls backend at `http://localhost:5057`.
- If backend URL changes, update fetch URLs in frontend components.

## Quick Start

Run backend and frontend in separate terminals:

```bash
# Terminal 1
cd backend
dotnet run

# Terminal 2
cd frontend
npm install
npm run dev
```

Then open `http://localhost:5173`.

## Troubleshooting

- Database connection error:
	- verify SQL Server is running,
	- verify `DefaultConnection` in `backend/appsettings.json`,
	- run `dotnet ef database update` again.
- CORS error in browser:
	- check that frontend is on `http://localhost:5173`,
	- verify backend CORS policy in `backend/Program.cs`.
- HTTPS certificate warning:
	- run `dotnet dev-certs https --trust`.
