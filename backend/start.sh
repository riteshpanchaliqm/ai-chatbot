#!/bin/bash
echo "Starting AI Chatbot Backend..."
echo "Python version: $(python --version)"
echo "Installing dependencies..."
pip install -r requirements.txt
echo "Starting uvicorn server..."
uvicorn main:app --host 0.0.0.0 --port $PORT 