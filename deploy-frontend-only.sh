#!/bin/bash

echo "🚀 Deploying AI Chatbot Frontend to Firebase Hosting"

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

# Check if Firebase CLI is installed
check_firebase_cli() {
    if ! command -v firebase &> /dev/null; then
        print_error "Firebase CLI is not installed. Please install it first:"
        echo "npm install -g firebase-tools"
        exit 1
    fi
    print_success "Firebase CLI is installed"
}

# Check if user is logged in to Firebase
check_firebase_login() {
    if ! firebase projects:list &> /dev/null; then
        print_error "Not logged in to Firebase. Please login first:"
        echo "firebase login"
        exit 1
    fi
    print_success "Logged in to Firebase"
}

# Build frontend
build_frontend() {
    print_status "Building frontend..."
    cd frontend
    
    if [ ! -f "package.json" ]; then
        print_error "package.json not found in frontend directory"
        exit 1
    fi
    
    print_status "Installing frontend dependencies..."
    npm install
    
    print_status "Building frontend for production..."
    npm run build
    
    if [ $? -eq 0 ]; then
        print_success "Frontend built successfully"
    else
        print_error "Failed to build frontend"
        exit 1
    fi
    
    cd ..
}

# Deploy to Firebase
deploy_to_firebase() {
    print_status "Deploying to Firebase Hosting..."
    
    # Check if firebase.json exists
    if [ ! -f "firebase.json" ]; then
        print_error "firebase.json not found"
        exit 1
    fi
    
    # Deploy only hosting
    firebase deploy --only hosting
    
    if [ $? -eq 0 ]; then
        print_success "Deployed to Firebase Hosting successfully!"
        echo ""
        print_status "Your app is now live at:"
        echo "https://releasedashboard-dccee.web.app"
        echo "https://releasedashboard-dccee.firebaseapp.com"
        echo ""
        print_warning "Note: Backend functions are not deployed yet."
        echo "To enable full functionality, you need to:"
        echo "1. Upgrade to Firebase Blaze plan"
        echo "2. Deploy the backend functions"
        echo "3. Set up environment variables in Firebase Functions"
    else
        print_error "Failed to deploy to Firebase"
        exit 1
    fi
}

# Main deployment function
main() {
    print_status "Starting Firebase Hosting deployment..."
    
    # Check prerequisites
    check_firebase_cli
    check_firebase_login
    
    # Build frontend
    build_frontend
    
    # Deploy to Firebase
    deploy_to_firebase
    
    print_success "Frontend deployment completed successfully!"
    echo ""
    print_status "Next steps:"
    echo "1. Test your frontend at the URLs above"
    echo "2. To enable full functionality, upgrade to Blaze plan and deploy functions"
    echo "3. Set up Supabase database schema"
    echo ""
    print_success "Happy coding! 🤖"
}

# Run main function
main 