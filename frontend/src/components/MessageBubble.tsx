import {
  Box,
  VStack,
  HStack,
  Text,
  Avatar,
  Badge,
  useColorModeValue
} from '@chakra-ui/react'
import { Bot, User } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface MessageBubbleProps {
  message: Message
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === 'user'
  const bgColor = useColorModeValue(
    isUser ? 'brand.500' : 'gray.700',
    isUser ? 'brand.600' : 'gray.700'
  )
  const textColor = useColorModeValue('white', 'white')

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <HStack
      spacing={3}
      align="start"
      justify={isUser ? 'flex-end' : 'flex-start'}
      w="full"
    >
      {!isUser && (
        <Avatar
          size="sm"
          bg="brand.500"
          icon={<Bot size={16} />}
          name="AI Assistant"
        />
      )}
      
      <VStack
        align={isUser ? 'flex-end' : 'flex-start'}
        maxW="70%"
        spacing={1}
      >
        <Box
          bg={bgColor}
          color={textColor}
          p={4}
          borderRadius="lg"
          borderTopLeftRadius={isUser ? 'lg' : 'sm'}
          borderTopRightRadius={isUser ? 'sm' : 'lg'}
          boxShadow="md"
          position="relative"
        >
          <ReactMarkdown
            components={{
              code({ className, children }) {
                const match = /language-(\w+)/.exec(className || '')
                return match ? (
                  <SyntaxHighlighter
                    style={tomorrow as any}
                    language={match[1]}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className}>
                    {children}
                  </code>
                )
              },
              p: ({ children }) => (
                <Text mb={2} lineHeight="1.6">
                  {children}
                </Text>
              ),
              h1: ({ children }) => (
                <Text as="h1" fontSize="xl" fontWeight="bold" mb={2}>
                  {children}
                </Text>
              ),
              h2: ({ children }) => (
                <Text as="h2" fontSize="lg" fontWeight="bold" mb={2}>
                  {children}
                </Text>
              ),
              h3: ({ children }) => (
                <Text as="h3" fontSize="md" fontWeight="bold" mb={2}>
                  {children}
                </Text>
              ),
              ul: ({ children }) => (
                <Box as="ul" pl={4} mb={2}>
                  {children}
                </Box>
              ),
              ol: ({ children }) => (
                <Box as="ol" pl={4} mb={2}>
                  {children}
                </Box>
              ),
              li: ({ children }) => (
                <Text as="li" mb={1}>
                  {children}
                </Text>
              ),
              blockquote: ({ children }) => (
                <Box
                  as="blockquote"
                  borderLeft="4px"
                  borderColor="brand.400"
                  pl={4}
                  my={3}
                  fontStyle="italic"
                  color="gray.300"
                >
                  {children}
                </Box>
              ),
              a: ({ children, href }) => (
                <Text
                  as="a"
                  color="brand.400"
                  textDecoration="underline"
                  _hover={{ color: 'brand.300' }}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </Text>
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        </Box>
        
        <HStack spacing={2} opacity={0.7}>
          <Text fontSize="xs" color="gray.400">
            {isUser ? 'You' : 'AI Assistant'}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {formatTime(message.timestamp)}
          </Text>
          {!isUser && (
            <Badge size="sm" colorScheme="brand" variant="subtle">
              GPT-4
            </Badge>
          )}
        </HStack>
      </VStack>
      
      {isUser && (
        <Avatar
          size="sm"
          bg="gray.500"
          icon={<User size={16} />}
          name="You"
        />
      )}
    </HStack>
  )
}

export default MessageBubble 