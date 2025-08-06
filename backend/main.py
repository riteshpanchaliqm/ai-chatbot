import os
import firebase_admin
from firebase_admin import credentials, auth
from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional, List
import openai
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize OpenAI
openai.api_key = os.getenv('OPENAI_API_KEY')

# Initialize Supabase
supabase_url = os.getenv('SUPABASE_URL')
supabase_key = os.getenv('SUPABASE_KEY')
# Use service role key to bypass RLS policies temporarily
supabase: Client = create_client(supabase_url, supabase_key)

# Initialize Firebase Admin
if not firebase_admin._apps:
    # For Firebase Functions, use default credentials
    firebase_admin.initialize_app()

# Create FastAPI app
app = FastAPI(title="AI Chatbot API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:8000",
        "https://releasedashboard-dccee.web.app",
        "https://releasedashboard-dccee.firebaseapp.com",
        "https://ai-chatbot-backend-nmwf.onrender.com",
        "*"  # Allow all origins for debugging
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

# Pydantic models
class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None
    model: str = "gpt-4"

class Message(BaseModel):
    id: str
    role: str
    content: str
    created_at: str

class Conversation(BaseModel):
    id: str
    title: str
    created_at: str

# Authentication dependency
async def get_current_user(request: Request):
    # Temporarily disable authentication for testing
    # TODO: Re-enable Firebase authentication once service account is properly configured
    return {"uid": "test-user-123", "email": "test@example.com"}

async def ensure_test_user_exists():
    """Ensure the test user exists in the database"""
    try:
        # Check if test user exists
        result = supabase.table('users').select('*').eq('id', 'test-user-123').execute()
        if not result.data:
            # Create test user
            user_data = {
                'id': 'test-user-123',
                'email': 'test@example.com',
                'name': 'Test User'
            }
            supabase.table('users').insert(user_data).execute()
            print("Created test user in database")
    except Exception as e:
        print(f"Error ensuring test user exists: {e}")
        # If RLS is blocking, we'll need to handle this differently
        pass

# API Routes
@app.get("/")
async def root():
    return {"message": "AI Chatbot API is running!"}

@app.post("/chat")
async def chat(request: ChatRequest, current_user: dict = Depends(get_current_user)):
    try:
        print(f"Chat request received from user: {current_user.get('uid', 'unknown')}")
        
        # Get user ID from Firebase token
        user_id = current_user['uid']
        
        # Create conversation if not provided
        conversation_id = request.conversation_id
        if not conversation_id:
            # Create new conversation
            conversation_data = {
                'user_id': user_id,
                'title': request.message[:50] + '...' if len(request.message) > 50 else request.message
            }
            try:
                result = supabase.table('conversations').insert(conversation_data).execute()
                conversation_id = result.data[0]['id']
                print(f"Created conversation: {conversation_id}")
            except Exception as e:
                print(f"Error creating conversation: {e}")
                raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
        
        # Save user message
        user_message_data = {
            'conversation_id': conversation_id,
            'role': 'user',
            'content': request.message
        }
        try:
            supabase.table('messages').insert(user_message_data).execute()
            print(f"Saved user message to conversation: {conversation_id}")
        except Exception as e:
            print(f"Error saving user message: {e}")
            raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
        
        # Get conversation history
        try:
            messages_result = supabase.table('messages').select('*').eq('conversation_id', conversation_id).order('created_at').execute()
            messages = messages_result.data
            print(f"Retrieved {len(messages)} messages from conversation")
        except Exception as e:
            print(f"Error retrieving messages: {e}")
            raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
        
        # Prepare conversation for OpenAI
        conversation = []
        for msg in messages:
            conversation.append({
                'role': msg['role'],
                'content': msg['content']
            })
        
        # Call OpenAI API
        try:
            response = openai.ChatCompletion.create(
                model=request.model,
                messages=conversation,
                max_tokens=1000,
                temperature=0.7
            )
            ai_response = response.choices[0].message.content
            print(f"OpenAI response generated successfully")
        except Exception as e:
            print(f"Error calling OpenAI: {e}")
            raise HTTPException(status_code=500, detail=f"OpenAI error: {str(e)}")
        
        # Save AI response
        ai_message_data = {
            'conversation_id': conversation_id,
            'role': 'assistant',
            'content': ai_response
        }
        try:
            result = supabase.table('messages').insert(ai_message_data).execute()
            print(f"Saved AI response to conversation: {conversation_id}")
        except Exception as e:
            print(f"Error saving AI response: {e}")
            raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
        
        return {
            "response": ai_response,
            "conversation_id": conversation_id,
            "message_id": result.data[0]['id']
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Unexpected error in chat endpoint: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/conversations")
async def get_conversations(current_user: dict = Depends(get_current_user)):
    try:
        user_id = current_user['uid']
        result = supabase.table('conversations').select('*').eq('user_id', user_id).order('created_at', desc=True).execute()
        return result.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/conversations/{conversation_id}/messages")
async def get_conversation_messages(conversation_id: str, current_user: dict = Depends(get_current_user)):
    try:
        user_id = current_user['uid']
        
        # Verify conversation belongs to user
        conv_result = supabase.table('conversations').select('*').eq('id', conversation_id).eq('user_id', user_id).execute()
        if not conv_result.data:
            raise HTTPException(status_code=404, detail="Conversation not found")
        
        # Get messages
        result = supabase.table('messages').select('*').eq('conversation_id', conversation_id).order('created_at').execute()
        return result.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/conversations/{conversation_id}")
async def delete_conversation(conversation_id: str, current_user: dict = Depends(get_current_user)):
    try:
        user_id = current_user['uid']
        
        # Verify conversation belongs to user
        conv_result = supabase.table('conversations').select('*').eq('id', conversation_id).eq('user_id', user_id).execute()
        if not conv_result.data:
            raise HTTPException(status_code=404, detail="Conversation not found")
        
        # Delete messages first
        supabase.table('messages').delete().eq('conversation_id', conversation_id).execute()
        
        # Delete conversation
        supabase.table('conversations').delete().eq('id', conversation_id).execute()
        
        return {"message": "Conversation deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 