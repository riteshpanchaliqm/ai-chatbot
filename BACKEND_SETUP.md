# Backend Setup Guide

Since Firebase Functions has Python version compatibility issues (requires Python 3.11 but we're using 3.13), we'll set up the backend separately.

## Option 1: Deploy to Railway (Recommended)

### 1. Create Railway Account
- Go to https://railway.app/
- Sign up with GitHub
- Create a new project

### 2. Deploy Backend
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize Railway project
cd backend
railway init

# Deploy
railway up
```

### 3. Set Environment Variables in Railway
Add these environment variables in Railway dashboard:
```
OPENAI_API_KEY=your_openai_api_key_here
SUPABASE_URL=https://bcbicycrknftzyfelahr.supabase.co
SUPABASE_KEY=your_supabase_service_key_here
FIREBASE_PROJECT_ID=releasedashboard-dccee
```

### 4. Update Frontend API URL
Once deployed, update the API URL in `frontend/src/contexts/ChatContext.tsx`:
```typescript
const API_BASE_URL = import.meta.env.PROD
  ? 'https://your-railway-app.railway.app'  // Replace with your Railway URL
  : (import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000')
```

## Option 2: Deploy to Render

### 1. Create Render Account
- Go to https://render.com/
- Sign up with GitHub
- Create a new Web Service

### 2. Connect Repository
- Connect your GitHub repository
- Set build command: `pip install -r requirements.txt`
- Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### 3. Set Environment Variables
Add the same environment variables as above in Render dashboard.

## Option 3: Deploy to Heroku

### 1. Create Heroku Account
- Go to https://heroku.com/
- Sign up and install Heroku CLI

### 2. Deploy
```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Add Python buildpack
heroku buildpacks:set heroku/python

# Deploy
git add .
git commit -m "Deploy backend"
git push heroku main
```

### 3. Set Environment Variables
```bash
heroku config:set OPENAI_API_KEY=your_key
heroku config:set SUPABASE_URL=your_url
heroku config:set SUPABASE_KEY=your_key
```

## Option 4: Local Development

### 1. Run Backend Locally
```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Update Frontend
The frontend is already configured to use localhost:8000 in development.

## Database Setup

### 1. Set Up Supabase Database
1. Go to your Supabase project: https://supabase.com/dashboard/project/bcbicycrknftzyfelahr
2. Go to SQL Editor
3. Run the SQL from `setup-supabase.sql`

### 2. Verify Tables
Check that these tables are created:
- `users`
- `conversations`
- `messages`

## Testing the Complete Setup

### 1. Test Authentication
- Visit: https://releasedashboard-dccee.web.app
- Sign in with Google
- Verify you can access the chat interface

### 2. Test AI Chat
- Send a message in the chat
- Verify you get an AI response
- Check conversation history

### 3. Test Database
- Create multiple conversations
- Verify they're saved in Supabase
- Test conversation switching

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Make sure your backend URL is in the CORS allowlist
2. **Authentication Errors**: Verify Firebase Auth is enabled
3. **Database Errors**: Check Supabase connection and RLS policies
4. **API Errors**: Verify environment variables are set correctly

### Debug Steps:
1. Check browser console for errors
2. Check backend logs
3. Verify environment variables
4. Test API endpoints directly

## Current Status

✅ **Frontend**: Deployed to Firebase Hosting
✅ **Authentication**: Google Auth configured
✅ **UI/UX**: Complete with AI flavor
⏳ **Backend**: Ready to deploy (choose option above)
⏳ **Database**: Ready to set up
⏳ **AI Integration**: Ready to enable

## Next Steps

1. Choose a backend deployment option
2. Set up the database schema
3. Update the frontend API URL
4. Test the complete application

Your frontend is live and ready! Just need to complete the backend setup to have a fully functional AI chatbot. 