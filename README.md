# AI Chat Ideas Generator

This project consists of a React frontend and a backend server. Follow the instructions below to set up and run both parts of the application.

## Prerequisites

- Node.js and npm installed on your machine
- Gemini API key (you can obtain one from [Google AI Studio](https://makersuite.google.com/app/apikey))

## Setup and Running Instructions

### Frontend

1. Clone the repository:

   ```
   git clone [your-repo-url]
   ```

2. Navigate to the frontend directory:

   ```
   cd frontend
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

The frontend should now be running on `http://localhost:5173` (or another port if 5173 is in use).

### Backend

1. Open a new terminal window/tab

2. Navigate to the backend directory from the project root:

   ```
   cd backend
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Create a `.env` file in the backend directory and add your Gemini API key:

   ```
   GEMINI_API_KEY=your_api_key_here
   ```

5. Start the backend server:
   ```
   npm run dev
   ```

The backend should now be running on `http://localhost:3001` (or whichever port you've configured).

## Important Note

Make sure to keep your Gemini API key confidential and never commit it to version control. The `.env` file should be included in your `.gitignore`.


