# Angular-Express Project

This project includes a simple application with user registration, login, display of high scores, and the ability to submit high scores. It consists of an Angular frontend and an Express backend using a MongoDB database.

## Structure
The project is divided into two main directories:

- `frontend/`: Contains the Angular-based frontend code.
- `backend/`: Contains the Express and Mongoose-based backend code.

## Prerequisites

- Node.js
- Angular CLI
- MongoDB

## Installation
### Backend
Navigate to the `backend/` directory:

```bash
cd backend 
```

Install the required npm packages:

```bash
npm install
```

Start the MongoDB service on your system.

Start the backend server:

```bash
node server.js
```

### Frontend
Navigate to the `frontend/` directory:

```bash
cd ../frontend
```

Install the required npm packages:

```bash
npm install
```

Start the Angular application:

```bash
ng serve
```

Open a web browser and navigate to [http://localhost:4200](http://localhost:4200) to use the application.

## Features
- **User Registration**: Allows new users to register with an email, password, and optional additional information.
- **Login/Logout**: Users can log in and out. User information and authentication tokens are managed during login.
- **High Score Display and Submission**: Authenticated users can submit their high scores and view a list of all users' high scores.

## API Endpoints
The backend provides various endpoints, including:

- **POST /users**: Registers a new user.
- **POST /highscores**: Adds a new high score.
- **GET /highscores**: Lists all high scores.
- **DELETE /sessions/:username**: Logs out a user and deletes the authentication token.
