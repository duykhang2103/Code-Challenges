# ExpressJS CRUD Backend (TypeScript)

This project is a simple CRUD backend server built with ExpressJS and TypeScript. It provides endpoints to create, read, update, and delete resources, with data persisted in a database.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A supported database (e.g., SQLite, PostgreSQL, MongoDB, etc.)

## Technology

1. Server: ExpressJS
2. Database: MongoDB

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/duykhang2103/Code-Challenges.git
   cd src/problem5
   ```

2. **Setup Environment Variables**

   ```bash
   cp .env.example .env
   ```

Then, edit _.env_ and fill in the required variables (e.g., database connection, port, etc.).

3. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

## Running the Application

### Development

```sh
npm run dev
# or
yarn dev
```

### Production

```sh
npm run build
npm start
# or
yarn build
yarn start
```

The server will start on the port specified in your `.env` file (default: 3000).

## API Endpoints

- `POST   /movies` — Create a movie
- `GET    /movies` — List movies (with filters)
- `GET    /movies/:id` — Get movie details
- `PUT    /movies/:id` — Update movie
- `DELETE /movies/:id` — Delete movie

## Notes

- All endpoints accept and return JSON.
- See the source code for details on request/response formats.
