# GameShelf

## Project Summary
GameShelf is a web application that organizes a user’s video game library. It’s designed to track what a user is playing across all platforms and make it easy to keep track of what they’ve played, are currently playing, or would like to play. Users can search and add games to their personal library, and assign them a status that organizes them into groups. The multi-platform nature of video gaming is sometimes difficult to navigate, especially when in the middle of multiple games at once. GameShelf will make it easy to know exactly where you left off.

## Technology Breakdown
- MongoDB
- Express
- Angular
- Node.js

## Team Roles
*	Varshith, Savannah – Frontend
*	Alan – Backend
*	Karson – Database
*	Caroline – Deployment/docs

## App deployment link
(To be completed)

## YouTube presentation link
(To be completed)

## Setup Instructions
### Prerequisites

- Node.js (LTS recommended)

- npm

- MongoDB (local or Atlas)

---

### Clone Repository

```
git clone https://github.com/alanzheng05/GameShelf.git
```


### Frontend Setup
```
cd frontend
npm install
npm start
```

Frontend runs at:
http://localhost:4200

### Backend Setup
```
cd backend
npm install
node seed.js
npm run dev
```

Backend runs at:
http://localhost:3000

### Environment Variables
The backend requires environment variables to run properly.

Create a .env file in the backend/ directory by copying the provided template:

```
cp backend/.env.template backend/.env
```

Then fill in the required values:
```
MONGO_URI=your_mongodb_connection_string
PORT=3000
IGDB_CLIENT_ID=your_client_id
IGDB_ACCESS_TOKEN=your_access_token
```

### Running the App

Run frontend and backend in separate terminals:

* Terminal 1 → backend
* Terminal 2 → frontend
