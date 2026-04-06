# DreamViz

DreamViz is a full-stack web application that lets users generate, download, and share AI images from text prompts. Built with React, Node.js, Express, and PostgreSQL, DreamViz demonstrates secure authentication, usage tracking, and AI integration using the OpenAI API.

## Features
- User authentication & protected routes (JWT)
- AI image generation from prompts via OpenAI API
- Generation history
- Download & share images
- Backend-enforced usage limits
- Smooth UX with error and loading state handling

## Tech Stack
- Frontend: React
- Backend: Node.js, Express
- Database: PostgreSQL
- Testing: Jest
- Auth: Bcrypt, JWT
- AI: OpenAI API

## Running Locally
-git clone <repo>
-cd DreamViz
-npm install
-cd frontend && npm install
-npm run dev

## Some of the challanges and solutions
- API usage limits: Implemented backend rate limiting per user using JWT authentication and tracking database data.

- Error handling & loading states: Built a centralized system by using REACT state hook to handle errors and loading states across the app, providing a smooth and reliable user experience.

- User authentication & security: Developed secure signup/login flows with Bcrypt, JWT, protecting routes and user data from unauthorized access.

- User history management: Implemented efficient storage and retrieval of user-generated images in PostgreSQL, allowing users to view, download, and share past creations.



