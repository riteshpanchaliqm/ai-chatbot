#!/bin/bash

echo "🚀 Setting up AI Chatbot with OpenAI"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
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

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    print_success "Node.js $(node --version) is installed"
}

# Check if Python is installed
check_python() {
    if ! command -v python3 &> /dev/null; then
        print_error "Python 3 is not installed. Please install Python 3.9+ first."
        exit 1
    fi
    print_success "Python $(python3 --version) is installed"
}

# Install frontend dependencies
setup_frontend() {
    print_status "Setting up frontend..."
    cd frontend
    
    if [ ! -f "package.json" ]; then
        print_error "package.json not found in frontend directory"
        exit 1
    fi
    
    print_status "Installing frontend dependencies..."
    npm install
    
    if [ $? -eq 0 ]; then
        print_success "Frontend dependencies installed successfully"
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
    
    if [ ! -f "requirements.txt" ]; then
        print_error "requirements.txt not found in backend directory"
        exit 1
    fi
    
    print_status "Installing backend dependencies..."
    pip3 install -r requirements.txt
    
    if [ $? -eq 0 ]; then
        print_success "Backend dependencies installed successfully"
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
        cp frontend/.env.example frontend/.env.local
        print_warning "Created frontend/.env.local - Please update with your configuration"
    else
        print_status "frontend/.env.local already exists"
    fi
    
    # Backend .env
    if [ ! -f "backend/.env" ]; then
        cp backend/.env.example backend/.env
        print_warning "Created backend/.env - Please update with your configuration"
    else
        print_status "backend/.env already exists"
    fi
    
    # Firebase service account
    if [ ! -f "backend/firebase-service-account.json" ]; then
        cp backend/firebase-service-account.example.json backend/firebase-service-account.json
        print_warning "Created backend/firebase-service-account.json - Please update with your Firebase service account"
    else
        print_status "backend/firebase-service-account.json already exists"
    fi
}

# Main setup function
main() {
    print_status "Starting AI Chatbot setup..."
    
    # Check prerequisites
    check_node
    check_python
    
    # Setup frontend
    setup_frontend
    
    # Setup backend
    setup_backend
    
    # Setup environment files
    setup_env_files
    
    print_success "Setup completed successfully!"
    echo ""
    print_status "Next steps:"
    echo "1. Configure your environment variables:"
    echo "   - frontend/.env.local"
    echo "   - backend/.env"
    echo "   - backend/firebase-service-account.json"
    echo ""
    echo "2. Set up your services:"
    echo "   - Firebase project with Google Auth enabled"
    echo "   - Supabase project with the provided schema"
    echo "   - OpenAI API key"
    echo ""
    echo "3. Run the application:"
    echo "   Backend: cd backend && uvicorn main:app --reload --port 8000"
    echo "   Frontend: cd frontend && npm run dev"
    echo ""
    print_success "Happy coding! 🤖"
}

# Run main function
main 