import { Routes, Route, Navigate } from 'react-router-dom'
import { Box, useColorMode } from '@chakra-ui/react'
import { useAuth } from './contexts/AuthContext'
import Layout from './components/Layout'
import Chat from './components/Chat'
import Login from './components/Login'
import Loading from './components/Loading'

function App() {
  const { user, loading } = useAuth()
  const { colorMode } = useColorMode()

  if (loading) {
    return <Loading />
  }

  if (!user) {
    return <Login />
  }

  return (
    <Box minH="100vh" bg={colorMode === 'dark' ? 'gray.900' : 'gray.50'}>
      <Layout>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Box>
  )
}

export default App 