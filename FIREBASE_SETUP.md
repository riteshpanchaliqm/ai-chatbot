# Firebase Hosting Setup Guide

This guide will walk you through setting up the AI Chatbot to be hosted entirely on Firebase (Hosting + Functions).

## 🚀 Quick Start

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase:**
   ```bash
   firebase login
   ```

3. **Initialize Firebase project:**
   ```bash
   firebase init
   ```

4. **Deploy to Firebase:**
   ```bash
   ./firebase-deploy.sh
   ```

## 🔧 Firebase Project Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter your project name (e.g., "ai-chatbot")
4. Enable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Services

#### Authentication
1. Go to Authentication > Sign-in method
2. Enable Google provider
3. Add your domain to authorized domains:
   - `localhost` (for development)
   - `your-project-id.web.app`
   - `your-project-id.firebaseapp.com`

#### Functions
1. Go to Functions
2. Click "Get started"
3. Choose your preferred region (e.g., us-central1)
4. Select Node.js runtime (we'll use Python)

### 3. Update Configuration

#### Update `.firebaserc`
```json
{
  "projects": {
    "default": "your-actual-project-id"
  }
}
```

#### Update `firebase.json`
```json
{
  "hosting": {
    "public": "frontend/dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },
  "functions": {
    "source": "backend",
    "runtime": "python311"
  }
}
```

## 🔧 Environment Configuration

### 1. Frontend Environment

Create `frontend/.env.local`:
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_REGION=us-central1

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Backend URL (for development only)
VITE_BACKEND_URL=http://localhost:8000
```

### 2. Firebase Functions Environment

Set environment variables in Firebase Functions:

```bash
# Set OpenAI API key
firebase functions:config:set openai.api_key="your_openai_api_key"

# Set Supabase configuration
firebase functions:config:set supabase.url="your_supabase_url"
firebase functions:config:set supabase.key="your_supabase_service_key"

# Set Firebase project ID
firebase functions:config:set firebase.project_id="your_firebase_project_id"
```

Or use the Firebase Console:
1. Go to Functions > Configuration
2. Add environment variables:
   - `OPENAI_API_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
   - `FIREBASE_PROJECT_ID`

## 🚀 Deployment

### 1. Development

```bash
# Start frontend development server
cd frontend
npm run dev

# Start backend locally (for testing)
cd backend
uvicorn main:app --reload --port 8000
```

### 2. Production Deployment

```bash
# Deploy everything to Firebase
./firebase-deploy.sh

# Or deploy step by step:
npm run build          # Build frontend
firebase deploy        # Deploy hosting and functions
```

### 3. Deploy Only Hosting

```bash
cd frontend
npm run build
firebase deploy --only hosting
```

### 4. Deploy Only Functions

```bash
firebase deploy --only functions
```

## 📁 Project Structure (Firebase)

```
OpenAI_Chatbot/
├── frontend/                 # React application
│   ├── dist/               # Built files (deployed to hosting)
│   ├── src/
│   └── package.json
├── backend/                  # FastAPI server (deployed to functions)
│   ├── main.py             # Firebase Functions entry point
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Environment variables
├── firebase.json           # Firebase configuration
├── .firebaserc            # Firebase project settings
├── firebase-deploy.sh     # Deployment script
└── README.md
```

## 🔧 Firebase Functions Configuration

### Python Runtime Setup

1. **Install Python 3.11** (required for Firebase Functions)
2. **Update requirements.txt** to include functions-framework
3. **Configure the entry point** in `backend/main.py`

### Environment Variables

Firebase Functions environment variables can be set via:

1. **Firebase CLI:**
   ```bash
   firebase functions:config:set openai.api_key="your_key"
   ```

2. **Firebase Console:**
   - Go to Functions > Configuration
   - Add environment variables

3. **Local development:**
   - Use `.env` file in backend directory

## 🎯 Features

### Firebase Hosting
- **Global CDN**: Fast loading worldwide
- **HTTPS**: Automatic SSL certificates
- **Custom domains**: Add your own domain
- **Version control**: Rollback deployments
- **Preview channels**: Test before production

### Firebase Functions
- **Serverless**: No server management
- **Auto-scaling**: Handles traffic spikes
- **Pay-per-use**: Only pay for what you use
- **Global deployment**: Low latency worldwide
- **Integrated**: Works seamlessly with other Firebase services

## 🔒 Security

### Firebase Security Rules
- **Hosting**: Public static files
- **Functions**: Authenticated API endpoints
- **Authentication**: Firebase Auth integration
- **CORS**: Configured for your domains

### Environment Variables
- **Secure storage**: Firebase Functions environment
- **No exposure**: Variables not in client code
- **Easy management**: Firebase Console interface

## 🚀 Performance

### Optimization
- **Static hosting**: Fast frontend delivery
- **CDN caching**: Global content delivery
- **Function optimization**: Cold start management
- **Image optimization**: Automatic compression

### Monitoring
- **Firebase Analytics**: User behavior tracking
- **Functions logs**: Server-side monitoring
- **Performance monitoring**: Real-time metrics
- **Error tracking**: Automatic error reporting

## 🐛 Troubleshooting

### Common Issues

1. **Functions not deploying:**
   ```bash
   firebase functions:log
   ```

2. **Hosting issues:**
   ```bash
   firebase hosting:channel:list
   ```

3. **Environment variables:**
   ```bash
   firebase functions:config:get
   ```

4. **Authentication errors:**
   - Check Firebase Auth configuration
   - Verify authorized domains
   - Test with Firebase Auth emulator

### Development Tools

1. **Firebase Emulator:**
   ```bash
   firebase emulators:start
   ```

2. **Local Functions:**
   ```bash
   firebase functions:shell
   ```

3. **Debug Functions:**
   ```bash
   firebase functions:log --only api
   ```

## 📞 Support

### Firebase Documentation
- [Firebase Hosting](https://firebase.google.com/docs/hosting)
- [Firebase Functions](https://firebase.google.com/docs/functions)
- [Firebase Auth](https://firebase.google.com/docs/auth)

### Community
- [Firebase Community](https://firebase.google.com/community)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/firebase)
- [Firebase YouTube](https://www.youtube.com/user/Firebase)

## 🎯 Next Steps

After successful deployment:

1. **Custom Domain**: Add your own domain
2. **Analytics**: Enable Firebase Analytics
3. **Monitoring**: Set up error tracking
4. **CI/CD**: Automate deployments
5. **Scaling**: Optimize for high traffic

Happy deploying! 🚀 