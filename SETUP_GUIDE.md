# AI Chatbot Setup Guide

This guide will walk you through setting up the AI Chatbot with OpenAI, Firebase, and Supabase.

## 🚀 Quick Start

1. **Run the setup script:**
   ```bash
   ./setup.sh
   ```

2. **Configure your environment variables (see sections below)**

3. **Start the application:**
   ```bash
   # Terminal 1 - Backend
   cd backend
   uvicorn main:app --reload --port 8000
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

## 🔧 Service Configuration

### 1. OpenAI Setup

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Navigate to "API Keys" section
4. Create a new API key
5. Copy the API key and add it to your environment files

**Environment Variables:**
- `frontend/.env.local`: `VITE_OPENAI_API_KEY=your_openai_api_key`
- `backend/.env`: `OPENAI_API_KEY=your_openai_api_key`

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Google Authentication:
   - Go to Authentication > Sign-in method
   - Enable Google provider
   - Add your domain to authorized domains

4. Get your Firebase config:
   - Go to Project Settings
   - Scroll down to "Your apps"
   - Click "Add app" > Web app
   - Copy the config object

5. Create a service account:
   - Go to Project Settings > Service accounts
   - Click "Generate new private key"
   - Download the JSON file
   - Rename to `firebase-service-account.json` and place in `backend/`

**Environment Variables:**
```env
# frontend/.env.local
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# backend/.env
FIREBASE_PROJECT_ID=your_firebase_project_id
```

### 3. Supabase Setup

1. Go to [Supabase](https://supabase.com/)
2. Create a new project
3. Go to SQL Editor
4. Run the schema from `backend/supabase_schema.sql`
5. Get your project URL and keys:
   - Go to Settings > API
   - Copy the URL and keys

**Environment Variables:**
```env
# frontend/.env.local
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# backend/.env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_key
```

## 📁 Project Structure

```
OpenAI_Chatbot/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── contexts/        # React contexts
│   │   ├── App.tsx         # Main app component
│   │   └── main.tsx        # Entry point
│   ├── package.json
│   └── .env.local          # Frontend environment
├── backend/                  # FastAPI server
│   ├── main.py             # Main API server
│   ├── requirements.txt    # Python dependencies
│   ├── .env               # Backend environment
│   └── firebase-service-account.json
├── shared/                  # Shared types and utilities
├── setup.sh                # Automated setup script
├── README.md              # Project documentation
└── SETUP_GUIDE.md         # This guide
```

## 🎨 Features

### Frontend Features
- **Modern UI**: Built with Chakra UI for a beautiful, responsive design
- **Dark/Light Mode**: Toggle between themes
- **Real-time Chat**: Instant messaging with AI
- **Markdown Support**: Rich text formatting with code highlighting
- **Conversation History**: Save and manage chat conversations
- **Mobile Responsive**: Works perfectly on all devices
- **Google Authentication**: Secure login with Firebase

### Backend Features
- **FastAPI**: High-performance Python web framework
- **OpenAI Integration**: GPT-4 powered conversations
- **Firebase Auth**: Secure authentication with JWT tokens
- **Supabase Database**: PostgreSQL with real-time capabilities
- **CORS Support**: Cross-origin resource sharing
- **Error Handling**: Comprehensive error management

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Row Level Security**: Database-level security in Supabase
- **CORS Protection**: Cross-origin request protection
- **Input Validation**: Pydantic models for data validation
- **Rate Limiting**: API rate limiting (can be added)
- **Environment Variables**: Secure configuration management

## 🚀 Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Backend (Railway/Render)
1. Push your code to GitHub
2. Connect to Railway or Render
3. Set environment variables
4. Deploy with automatic scaling

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend URL is correct in frontend environment
   - Check CORS configuration in backend

2. **Authentication Errors**
   - Verify Firebase configuration
   - Check service account JSON file
   - Ensure Google Auth is enabled

3. **Database Errors**
   - Run the Supabase schema
   - Check environment variables
   - Verify RLS policies

4. **OpenAI API Errors**
   - Verify API key is correct
   - Check API quota and billing
   - Ensure model name is correct

### Debug Mode

**Frontend:**
```bash
cd frontend
npm run dev
# Check browser console for errors
```

**Backend:**
```bash
cd backend
uvicorn main:app --reload --port 8000 --log-level debug
# Check terminal output for errors
```

## 📞 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Verify all environment variables are set correctly
3. Ensure all services are properly configured
4. Check the browser console and server logs for errors

## 🎯 Next Steps

After successful setup:

1. **Customize the AI**: Modify the system prompt in `backend/main.py`
2. **Add Features**: Implement file upload, voice chat, etc.
3. **Deploy**: Deploy to production environments
4. **Monitor**: Add logging and monitoring
5. **Scale**: Implement caching and optimization

Happy coding! 🤖 