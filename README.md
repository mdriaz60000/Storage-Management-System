# Storage Management System - Server

A modern, secure Storage Management System backend built with Node.js, Express, and MongoDB. This backend powers user authentication, storage tracking, and file/note management with a clean and scalable architecture.

## Project Overview

This is a backend server application built with Node.js and Express.js that provides API endpoints for creating and managing notices. The system supports various notice types (General, Holiday & Event, HR & Policy Update, IT System Maintenance, Warning/Disciplinary, Emergency/Urgent) and can target specific departments, teams, or individuals. Notices can be published, unpublished, or saved as drafts with support for attachments.

**Live Link:** [https://storage-management-system-indol.vercel.app//](https://storage-management-system-indol.vercel.app//)

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js 
- **Database:** MongoDB (via Mongoose )
- **Environment Variables:** dotenv 
- **Development Tool:** nodemon 

## Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Storage-Management-System
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the root directory
   - Add the required environment variables (see ENV Variable Instructions below)

4. **Run the application**
   
   For development (with auto-reload):
   ```bash
   npm run dev
   ```
   
   For production:
   ```bash
   npm start
   ```

5. **Verify the server is running**
   - The server will start on the port specified in your `.env` file (default: 5000)
   - Visit `http://localhost:5000` to see the "Hello World!" message

## ENV Variable Instructions

Create a `.env` file in the root directory of the project with the following variables:

```env
PORT=5000
DATABASE_URL=
```

### Environment Variables Explained:

- **PORT**: The port number on which the server will run (default: 5000)
- **DATABASE_URL**: MongoDB connection string for the Notice-Management database

### Important Notes:

- Never commit your `.env` file to version control
- Make sure `.env` is included in your `.gitignore` file
- For production deployments (like Vercel), set these environment variables in your hosting platform's dashboard

## API Endpoints

### Base URL
- **Local:** `http://localhost:5000/api/v1`
- **Production:** `https://storage-management-system-indol.vercel.app

### Auth Endpoints

- **POST** `/api/v1/register` - Create a new Account
- **POST** `/api/v1/login` -  Account login
- **POST** `/api/v1/forget-password` -  Forget Password
- **POST** `/api/v1/verify-reset-code` -  Account verify
- **POST** `/api/v1/reset-password` -  Resetpassword
- **PUt** `/api/v1/delete-account` -  Account Delete
-




## Deployment

This project is configured for deployment on Vercel. The `vercel.json` file contains the necessary configuration for serverless deployment.

## License

ISC

