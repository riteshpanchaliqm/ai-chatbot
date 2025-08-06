import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  IconButton,
  Flex,
  Avatar,
  useToast,
  Spinner
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { Send, Bot, Sparkles } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useChat } from '../contexts/ChatContext'
import MessageBubble from './MessageBubble'

const typing = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
`

const Chat = () => {
  const { messages, sendMessage, loading } = useChat()
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const toast = useToast()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || loading) return

    try {
      await sendMessage(inputValue.trim())
      setInputValue('')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Flex direction="column" h="100vh" bg="gray.900">
      {/* Chat Header */}
      <Box
        p={4}
        borderBottom="1px"
        borderColor="gray.700"
        bg="gray.800"
      >
        <HStack spacing={3}>
          <Bot size={24} color="#47A3F3" />
          <Text fontSize="lg" fontWeight="semibold" color="white">
            AI Assistant
          </Text>
          {loading && (
            <HStack spacing={2}>
              <Spinner size="sm" color="brand.400" />
              <Text fontSize="sm" color="gray.400">
                AI is thinking...
              </Text>
            </HStack>
          )}
        </HStack>
      </Box>

      {/* Messages Container */}
      <VStack
        flex={1}
        spacing={4}
        p={4}
        overflowY="auto"
        align="stretch"
      >
        {messages.length === 0 ? (
          <Flex
            direction="column"
            align="center"
            justify="center"
            h="full"
          >
            <Box
              animation={`${typing} 2s ease-in-out infinite`}
              color="brand.400"
              mb={4}
            >
              <Bot size={64} />
            </Box>
            <Text
              fontSize="xl"
              fontWeight="bold"
              color="white"
              textAlign="center"
              mb={2}
            >
              Welcome to AI Chatbot!
            </Text>
            <Text
              fontSize="md"
              color="gray.400"
              textAlign="center"
              maxW="md"
            >
              I'm your AI assistant powered by OpenAI. Ask me anything and I'll help you with your questions, tasks, or just have a friendly conversation!
            </Text>
            
            <HStack spacing={6} mt={8} color="gray.500">
              <HStack spacing={2}>
                <Sparkles size={16} />
                <Text fontSize="sm">Powered by GPT-4</Text>
              </HStack>
              <HStack spacing={2}>
                <Bot size={16} />
                <Text fontSize="sm">Smart & Helpful</Text>
              </HStack>
            </HStack>
          </Flex>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}
        
        {/* Loading indicator */}
        {loading && (
          <HStack spacing={3} p={4}>
            <Avatar size="sm" bg="brand.500" icon={<Bot size={16} />} />
            <Box>
              <HStack spacing={2}>
                <Spinner size="sm" color="brand.400" />
                <Text fontSize="sm" color="gray.400">
                  AI is typing...
                </Text>
              </HStack>
            </Box>
          </HStack>
        )}
        
        <div ref={messagesEndRef} />
      </VStack>

      {/* Input Container */}
      <Box
        p={4}
        borderTop="1px"
        borderColor="gray.700"
        bg="gray.800"
      >
        <HStack spacing={3}>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            size="lg"
            bg="gray.700"
            borderColor="gray.600"
            color="white"
            _placeholder={{ color: 'gray.400' }}
            _focus={{
              borderColor: 'brand.400',
              boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)',
            }}
            disabled={loading}
          />
          <IconButton
            aria-label="Send message"
            icon={<Send size={20} />}
            onClick={handleSendMessage}
            colorScheme="brand"
            size="lg"
            disabled={!inputValue.trim() || loading}
            _disabled={{
              opacity: 0.5,
              cursor: 'not-allowed',
            }}
          />
        </HStack>
      </Box>
    </Flex>
  )
}

export default Chat 