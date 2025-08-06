import React, { createContext, useContext, useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut, 
  User as FirebaseUser 
} from 'firebase/auth'

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkhzgmgi4JUGr__ujsqw9tITmaRX0Blp4",
  authDomain: "releasedashboard-dccee.firebaseapp.com",
  projectId: "releasedashboard-dccee",
  storageBucket: "releasedashboard-dccee.firebasestorage.app",
  messagingSenderId: "157350699905",
  appId: "1:157350699905:web:b479d9aa93c8fce5233e80"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

interface AuthContextType {
  user: FirebaseUser | null
  loading: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
  getAuthToken: () => Promise<string | null>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async () => {
    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error('Error signing in:', error)
      throw error
    }
  }

  const signOutUser = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  const getAuthToken = async (): Promise<string | null> => {
    if (!user) return null
    try {
      return await user.getIdToken()
    } catch (error) {
      console.error('Error getting auth token:', error)
      return null
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signOut: signOutUser,
    getAuthToken
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 