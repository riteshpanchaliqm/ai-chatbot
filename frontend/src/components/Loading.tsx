import { Box, VStack, Spinner, Text } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { Bot } from 'lucide-react'

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`

const Loading = () => {
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.900"
    >
      <VStack spacing={6}>
        <Box
          animation={`${pulse} 2s ease-in-out infinite`}
          color="brand.400"
        >
          <Bot size={64} />
        </Box>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.600"
          color="brand.400"
          size="xl"
        />
        <Text
          fontSize="lg"
          color="gray.400"
          fontWeight="medium"
        >
          Initializing AI Chatbot...
        </Text>
      </VStack>
    </Box>
  )
}

export default Loading 