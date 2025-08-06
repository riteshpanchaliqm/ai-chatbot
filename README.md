# 🤖 AI Chatbot

A modern, full-stack AI chatbot built with React, FastAPI, and OpenAI GPT-4. Features Google Authentication, real-time chat, conversation history, and a beautiful UI.

## ✨ Features

- **🤖 AI-Powered Chat**: Powered by OpenAI GPT-4
- **🔐 Google Authentication**: Secure sign-in with Firebase Auth
- **💬 Real-time Chat**: Instant messaging with AI responses
- **📚 Conversation History**: Save and manage chat conversations
- **🎨 Modern UI**: Beautiful, responsive design with dark mode
- **📱 Mobile Responsive**: Works perfectly on all devices
- **🔒 Secure**: Row Level Security with Supabase
- **☁️ Cloud Deployed**: Hosted on Firebase + Render

## 🚀 Live Demo

**Frontend**: https://releasedashboard-dccee.web.app

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Chakra UI** for beautiful components
- **Firebase Auth** for Google authentication
- **Vite** for fast development
- **React Router** for navigation
- **Axios** for API calls
- **Zustand** for state management

### Backend
- **FastAPI** with Python
- **OpenAI API** for AI responses
- **Supabase** for database
- **Firebase Admin** for authentication
- **Render** for hosting

### Infrastructure
- **Firebase Hosting** for frontend
- **Render** for backend API
- **Supabase** for PostgreSQL database
- **Firebase Auth** for authentication

## 📁 Project Structure

```
OpenAI_Chatbot/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── contexts/        # React contexts
│   │   └── App.tsx         # Main app
│   ├── package.json
│   └── vite.config.ts
├── backend/                  # FastAPI backend
│   ├── main.py             # API routes
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Environment variables
├── setup-supabase.sql      # Database schema
├── firebase.json           # Firebase configuration
├── .firebaserc            # Firebase project settings
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- Firebase CLI
- Git

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd OpenAI_Chatbot
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 3. Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 4. Environment Variables

Create `backend/.env`:
```env
OPENAI_API_KEY=your_openai_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_key
FIREBASE_PROJECT_ID=your_firebase_project_id
```

Create `frontend/.env.local`:
```env
VITE_BACKEND_URL=http://localhost:8000
```

## 🗄️ Database Setup

1. Go to your Supabase project
2. Open SQL Editor
3. Run the SQL from `setup-supabase.sql`

## 🚀 Deployment

### Frontend (Firebase Hosting)
```bash
cd frontend
npm run build
firebase deploy --only hosting
```

### Backend (Render)
1. Connect your GitHub repo to Render
2. Set build command: `pip install -r requirements.txt`
3. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Add environment variables in Render dashboard

## 🔧 Configuration

### Firebase Setup
1. Create Firebase project
2. Enable Google Authentication
3. Add authorized domains
4. Update `frontend/src/contexts/AuthContext.tsx`

### Supabase Setup
1. Create Supabase project
2. Run database schema
3. Update environment variables

### OpenAI Setup
1. Get API key from OpenAI
2. Add to environment variables

## 📱 Features

### Authentication
- Google Sign-in
- Secure token management
- User session persistence

### Chat Interface
- Real-time messaging
- Message history
- Conversation management
- Code syntax highlighting
- Markdown support

### Database
- User profiles
- Conversation storage
- Message history
- Row Level Security

## 🔒 Security

- **Firebase Auth**: Secure authentication
- **Row Level Security**: Database security
- **CORS Protection**: API security
- **Environment Variables**: Secure configuration

## 🎨 UI/UX

- **Dark Mode**: Beautiful dark theme
- **Responsive Design**: Works on all devices
- **Smooth Animations**: Professional feel
- **Loading States**: User feedback
- **Error Handling**: Graceful error messages

## 🧪 Testing

### Frontend
```bash
cd frontend
npm run test
```

### Backend
```bash
cd backend
pytest
```

## 📈 Performance

- **Frontend**: Optimized with Vite
- **Backend**: FastAPI for high performance
- **Database**: Supabase with PostgreSQL
- **CDN**: Firebase Hosting global CDN

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- Firebase for hosting and auth
- Supabase for database
- Render for backend hosting
- Chakra UI for components

## 📞 Support

If you need help:
1. Check the documentation
2. Open an issue on GitHub
3. Contact the maintainers

---

**Made with ❤️ and AI** 