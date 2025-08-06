#!/bin/bash

echo "🚀 Quick Setup for AI Chatbot - Firebase Project: releasedashboard-dccee"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Firebase CLI is installed
check_firebase_cli() {
    if ! command -v firebase &> /dev/null; then
        print_error "Firebase CLI is not installed. Installing now..."
        npm install -g firebase-tools
    fi
    print_success "Firebase CLI is ready"
}

# Check if user is logged in to Firebase
check_firebase_login() {
    if ! firebase projects:list &> /dev/null; then
        print_warning "Not logged in to Firebase. Please login:"
        echo "firebase login"
        echo "Then run this script again."
        exit 1
    fi
    print_success "Logged in to Firebase"
}

# Install frontend dependencies
setup_frontend() {
    print_status "Setting up frontend..."
    cd frontend
    
    print_status "Installing frontend dependencies..."
    npm install
    
    if [ $? -eq 0 ]; then
        print_success "Frontend dependencies installed"
    else
        print_error "Failed to install frontend dependencies"
        exit 1
    fi
    
    cd ..
}

# Install backend dependencies
setup_backend() {
    print_status "Setting up backend..."
    cd backend
    
    print_status "Installing backend dependencies..."
    pip3 install -r requirements.txt
    
    if [ $? -eq 0 ]; then
        print_success "Backend dependencies installed"
    else
        print_error "Failed to install backend dependencies"
        exit 1
    fi
    
    cd ..
}

# Create environment files
setup_env_files() {
    print_status "Setting up environment files..."
    
    # Frontend .env
    if [ ! -f "frontend/.env.local" ]; then
        cat > frontend/.env.local << EOF
# Supabase Configuration (you need to add these)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Backend URL (for development only)
VITE_BACKEND_URL=http://localhost:8000
EOF
        print_warning "Created frontend/.env.local - Please add your Supabase credentials"
    fi
    
    # Backend .env
    if [ ! -f "backend/.env" ]; then
        cat > backend/.env << EOF
# OpenAI Configuration (you need to add this)
OPENAI_API_KEY=your_openai_api_key

# Supabase Configuration (you need to add these)
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_key

# Firebase Configuration
FIREBASE_PROJECT_ID=releasedashboard-dccee
EOF
        print_warning "Created backend/.env - Please add your OpenAI and Supabase credentials"
    fi
}

# Main setup function
main() {
    print_status "Starting quick setup for releasedashboard-dccee..."
    
    # Check prerequisites
    check_firebase_cli
    check_firebase_login
    
    # Setup dependencies
    setup_frontend
    setup_backend
    setup_env_files
    
    print_success "Setup completed successfully!"
    echo ""
    print_status "Next steps:"
    echo "1. Add your OpenAI API key to backend/.env"
    echo "2. Add your Supabase credentials to both:"
    echo "   - frontend/.env.local"
    echo "   - backend/.env"
    echo "3. Set up Supabase database with the schema in backend/supabase_schema.sql"
    echo "4. Deploy to Firebase:"
    echo "   ./firebase-deploy.sh"
    echo ""
    print_status "For development:"
    echo "Frontend: cd frontend && npm run dev"
    echo "Backend:  cd backend && uvicorn main:app --reload --port 8000"
    echo ""
    print_success "Your app will be available at:"
    echo "https://releasedashboard-dccee.web.app"
    echo "https://releasedashboard-dccee.firebaseapp.com"
}

# Run main function
main 