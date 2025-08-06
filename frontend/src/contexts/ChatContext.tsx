import React, { createContext, useContext, useState, useCallback } from 'react'
import { useAuth } from './AuthContext'
import axios from 'axios'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface Conversation {
  id: string
  title: string
  created_at: string
}

interface ChatContextType {
  messages: Message[]
  conversations: Conversation[]
  currentConversationId: string | null
  loading: boolean
  sendMessage: (content: string) => Promise<void>
  loadConversations: () => Promise<void>
  loadConversation: (conversationId: string) => Promise<void>
  createNewConversation: () => void
  deleteConversation: (conversationId: string) => Promise<void>
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export const useChat = () => {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { getAuthToken } = useAuth()

  // Use Render URL in production, localhost in development
  const API_BASE_URL = (import.meta as any).env?.PROD 
    ? 'https://ai-chatbot-backend.onrender.com'  // Replace with your actual Render URL
    : ((import.meta as any).env?.VITE_BACKEND_URL || 'http://localhost:8000')

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return

    const token = await getAuthToken()
    if (!token) throw new Error('Not authenticated')

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setLoading(true)

    try {
      const response = await axios.post(
        `${API_BASE_URL}/chat`,
        {
          message: content,
          conversation_id: currentConversationId,
          model: 'gpt-4'
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      const assistantMessage: Message = {
        id: response.data.message_id,
        role: 'assistant',
        content: response.data.response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
      
      if (!currentConversationId) {
        setCurrentConversationId(response.data.conversation_id)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [currentConversationId, getAuthToken, API_BASE_URL])

  const loadConversations = useCallback(async () => {
    const token = await getAuthToken()
    if (!token) return

    try {
      const response = await axios.get(`${API_BASE_URL}/conversations`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setConversations(response.data)
    } catch (error) {
      console.error('Error loading conversations:', error)
    }
  }, [getAuthToken, API_BASE_URL])

  const loadConversation = useCallback(async (conversationId: string) => {
    const token = await getAuthToken()
    if (!token) return

    try {
      const response = await axios.get(`${API_BASE_URL}/conversations/${conversationId}/messages`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      const conversationMessages: Message[] = response.data.map((msg: any) => ({
        id: msg.id,
        role: msg.role,
        content: msg.content,
        timestamp: new Date(msg.created_at)
      }))
      
      setMessages(conversationMessages)
      setCurrentConversationId(conversationId)
    } catch (error) {
      console.error('Error loading conversation:', error)
    }
  }, [getAuthToken, API_BASE_URL])

  const createNewConversation = useCallback(() => {
    setMessages([])
    setCurrentConversationId(null)
  }, [])

  const deleteConversation = useCallback(async (conversationId: string) => {
    const token = await getAuthToken()
    if (!token) return

    try {
      await axios.delete(`${API_BASE_URL}/conversations/${conversationId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      setConversations(prev => prev.filter(conv => conv.id !== conversationId))
      
      if (currentConversationId === conversationId) {
        createNewConversation()
      }
    } catch (error) {
      console.error('Error deleting conversation:', error)
    }
  }, [getAuthToken, API_BASE_URL, currentConversationId, createNewConversation])

  const value = {
    messages,
    conversations,
    currentConversationId,
    loading,
    sendMessage,
    loadConversations,
    loadConversation,
    createNewConversation,
    deleteConversation
  }

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  )
} 