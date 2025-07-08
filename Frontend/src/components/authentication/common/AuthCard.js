import React from 'react';
import { Box, VStack, useColorModeValue } from '@chakra-ui/react';

const AuthCard = ({ children }) => {
  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.800', 'gray.100');

  return (
    <Box
      minH="100vh"
      w="100vw"
      bgGradient={useColorModeValue(
        'linear(to-br, teal.50, blue.100, purple.50)',
        'linear(to-br, gray.900, teal.900, blue.900)'
      )}
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Box
        bg={bg}
        color={color}
        borderRadius="2xl"
        boxShadow="2xl"
        p={{ base: 6, md: 10 }}
        minW={{ base: '90vw', sm: '400px', md: '400px' }}
        maxW="400px"
        w="full"
      >
        <VStack spacing={6} align="stretch">
          {children}
        </VStack>
      </Box>
    </Box>
  );
};

export default AuthCard; 