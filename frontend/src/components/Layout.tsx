import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Button,
  IconButton,
  useColorMode,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider
} from '@chakra-ui/react'
import {
  Moon,
  Sun,
  Menu as MenuIcon,
  Plus,
  Trash2,
  LogOut,
  User,
  Bot
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useChat } from '../contexts/ChatContext'
import { useState, useEffect } from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { user, signOut } = useAuth()
  const { 
    conversations, 
    currentConversationId, 
    loadConversations, 
    loadConversation, 
    createNewConversation,
    deleteConversation 
  } = useChat()
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (user) {
      loadConversations()
    }
  }, [user, loadConversations])

  const handleNewChat = () => {
    createNewConversation()
    if (isMobile) onClose()
  }

  const handleConversationClick = (conversationId: string) => {
    loadConversation(conversationId)
    if (isMobile) onClose()
  }

  const handleDeleteConversation = async (conversationId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    await deleteConversation(conversationId)
  }

  const Sidebar = () => (
    <VStack
      h="100vh"
      w="280px"
      bg="gray.800"
      borderRight="1px"
      borderColor="gray.700"
      spacing={0}
      position="fixed"
      left={0}
      top={0}
      zIndex={10}
    >
      {/* Header */}
      <HStack
        w="full"
        p={4}
        borderBottom="1px"
        borderColor="gray.700"
        justify="space-between"
      >
        <HStack spacing={3}>
          <Bot size={24} color="#47A3F3" />
          <Text fontSize="lg" fontWeight="bold" color="white">
            AI Chatbot
          </Text>
        </HStack>
        
        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === 'dark' ? <Sun /> : <Moon />}
          onClick={toggleColorMode}
          variant="ghost"
          color="gray.300"
          _hover={{ bg: 'gray.700' }}
        />
      </HStack>

      {/* New Chat Button */}
      <Box w="full" p={4}>
        <Button
          w="full"
          leftIcon={<Plus size={16} />}
          onClick={handleNewChat}
          colorScheme="brand"
          size="sm"
        >
          New Chat
        </Button>
      </Box>

      <Divider borderColor="gray.700" />

      {/* Conversations */}
      <VStack
        flex={1}
        w="full"
        spacing={1}
        p={2}
        overflowY="auto"
        align="stretch"
      >
        {conversations.map((conversation) => (
          <Button
            key={conversation.id}
            variant="ghost"
            justifyContent="flex-start"
            h="auto"
            p={3}
            onClick={() => handleConversationClick(conversation.id)}
            bg={currentConversationId === conversation.id ? 'gray.700' : 'transparent'}
            _hover={{ bg: 'gray.700' }}
            position="relative"
          >
            <HStack w="full" justify="space-between">
              <VStack align="start" spacing={1} flex={1}>
                <Text
                  fontSize="sm"
                  color="gray.300"
                  noOfLines={1}
                  textAlign="left"
                >
                  {conversation.title}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {new Date(conversation.created_at).toLocaleDateString()}
                </Text>
              </VStack>
              
              <IconButton
                aria-label="Delete conversation"
                icon={<Trash2 size={14} />}
                size="xs"
                variant="ghost"
                color="gray.500"
                opacity={0}
                _groupHover={{ opacity: 1 }}
                onClick={(e) => handleDeleteConversation(conversation.id, e)}
                _hover={{ color: 'red.400' }}
              />
            </HStack>
          </Button>
        ))}
      </VStack>

      {/* User Profile */}
      <Box w="full" p={4} borderTop="1px" borderColor="gray.700">
        <Menu>
          <MenuButton
            as={Button}
            variant="ghost"
            w="full"
            h="auto"
            p={2}
            _hover={{ bg: 'gray.700' }}
          >
            <HStack spacing={3}>
              <Avatar
                size="sm"
                name={user?.displayName || user?.email || 'User'}
                src={user?.photoURL || undefined}
              />
              <VStack align="start" spacing={0} flex={1}>
                <Text fontSize="sm" color="white" fontWeight="medium">
                  {user?.displayName || 'User'}
                </Text>
                <Text fontSize="xs" color="gray.400" noOfLines={1}>
                  {user?.email}
                </Text>
              </VStack>
            </HStack>
          </MenuButton>
          <MenuList bg="gray.800" borderColor="gray.700">
            <MenuItem icon={<User size={16} />} color="gray.300">
              Profile
            </MenuItem>
            <MenuItem icon={<LogOut size={16} />} color="gray.300" onClick={signOut}>
              Sign Out
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </VStack>
  )

  return (
    <Flex h="100vh">
      {/* Desktop Sidebar */}
      {!isMobile && <Sidebar />}
      
      {/* Mobile Menu Button */}
      {isMobile && (
        <IconButton
          aria-label="Open menu"
          icon={<MenuIcon />}
          onClick={onOpen}
          position="fixed"
          top={4}
          left={4}
          zIndex={20}
          colorScheme="brand"
        />
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg="gray.800">
            <DrawerCloseButton color="white" />
            <DrawerHeader borderBottom="1px" borderColor="gray.700">
              <HStack spacing={3}>
                <Bot size={24} color="#47A3F3" />
                <Text color="white">AI Chatbot</Text>
              </HStack>
            </DrawerHeader>
            <DrawerBody p={0}>
              <Sidebar />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        flex={1}
        ml={!isMobile ? "280px" : 0}
        h="100vh"
        overflow="hidden"
      >
        {children}
      </Box>
    </Flex>
  )
}

export default Layout 