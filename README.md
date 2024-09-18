## Features

### Auth Service

- **User Registration**: Allows users to register with an email and password.
- **User Login**: Authenticates users and provides JWT-based access and refresh tokens.
- **Token Refresh**: Provides a new access token when a valid refresh token is provided.

### Trade Service

- **Create Trade**: Inserts a new trade object into the database.
- **Fetch Trades**: Allows fetching all trades with filtering options (e.g., by user ID or trade type).
- **Fetch Single Trade**: Fetches a specific trade by its ID.

## Tech Stack

- **NestJS**: A Node.js framework for building scalable server-side applications.
- **Supabase**: Backend-as-a-service (BaaS) platform for handling database and authentication. Uses SQL.
- **JWT**: JSON Web Token used for securely transmitting information.
- **bcrypt**: Library used for hashing passwords.

## Project setup

1. Clone the repository.

```bash
$ npm install
```

## Compile and run the project

```bash
# watch mode
$ npm run start:dev

```

You can import the collection of REST api for personal testing.

Please make sure that Supabase API keys and DB url is used!
JWT secret is hardcoded but can be taken from the env too if required.

PostgreSQL was used for DB as it is generally a better idea to use a SQL based DB for financial related data items. In this particular scenario mongo would have also been fine.

Env variables used:

```
SUPABASE_URL
SUPABASE_API_KEY
```
