import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Container,
  Heading,
  useToast,
  Icon
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { Bot, Sparkles, MessageCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`

const glow = keyframes`
  0% { box-shadow: 0 0 5px #47A3F3; }
  50% { box-shadow: 0 0 20px #47A3F3, 0 0 30px #47A3F3; }
  100% { box-shadow: 0 0 5px #47A3F3; }
`

const Login = () => {
  const { signIn } = useAuth()
  const toast = useToast()

  const handleSignIn = async () => {
    try {
      await signIn()
      toast({
        title: 'Welcome!',
        description: 'Successfully signed in with Google',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Sign in failed',
        description: 'Please try again',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Box
      minH="100vh"
      bg="gray.900"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
    >
      {/* Background effects */}
      <Box
        position="absolute"
        top="10%"
        left="10%"
        animation={`${float} 6s ease-in-out infinite`}
        opacity={0.1}
      >
        <Sparkles size={48} color="#47A3F3" />
      </Box>
      
      <Box
        position="absolute"
        top="20%"
        right="15%"
        animation={`${float} 8s ease-in-out infinite`}
        opacity={0.1}
      >
        <MessageCircle size={64} color="#47A3F3" />
      </Box>

      <Container maxW="md">
        <VStack spacing={8} textAlign="center">
          {/* Logo and Title */}
          <VStack spacing={4}>
            <Box
              animation={`${glow} 2s ease-in-out infinite`}
              p={4}
              borderRadius="full"
              bg="brand.500"
              color="white"
            >
              <Bot size={48} />
            </Box>
            
            <Heading
              size="2xl"
              bgGradient="linear(to-r, brand.400, brand.600)"
              bgClip="text"
              fontWeight="bold"
            >
              AI Chatbot
            </Heading>
            
            <Text
              fontSize="lg"
              color="gray.400"
              maxW="sm"
            >
              Experience the future of conversation with our advanced AI assistant powered by OpenAI
            </Text>
          </VStack>

          {/* Features */}
          <VStack spacing={4} w="full">
            <HStack spacing={3} color="gray.300">
              <Icon as={Sparkles} />
              <Text fontSize="sm">Powered by GPT-4</Text>
            </HStack>
            
            <HStack spacing={3} color="gray.300">
              <Icon as={MessageCircle} />
              <Text fontSize="sm">Real-time conversations</Text>
            </HStack>
            
            <HStack spacing={3} color="gray.300">
              <Icon as={Bot} />
              <Text fontSize="sm">Smart context awareness</Text>
            </HStack>
          </VStack>

          {/* Sign In Button */}
          <Button
            size="lg"
            colorScheme="brand"
            onClick={handleSignIn}
            w="full"
            h="60px"
            fontSize="lg"
            fontWeight="semibold"
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
            transition="all 0.2s"
          >
            Continue with Google
          </Button>

          <Text fontSize="sm" color="gray.500">
            Secure authentication powered by Firebase
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}

export default Login 