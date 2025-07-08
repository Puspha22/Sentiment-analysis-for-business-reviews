import React from 'react';
import { Box, Button, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const bgGradient = useColorModeValue(
    'linear(to-br, teal.50, blue.100, purple.50)',
    'linear(to-br, gray.800, teal.900, blue.900)'
  );

  return (
    <Box
      minH="100vh"
      w="100vw"
      bgGradient={bgGradient}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      px={4}
    >
      {/* Hero Section */}
      <VStack spacing={6} mt={{ base: 24, md: 32 }}>
        <Heading as="h1" size="2xl" fontWeight="bold" letterSpacing="tight">
          Sentiment Analysis App
        </Heading>
        <Text fontSize="xl" color="gray.600" textAlign="center" maxW="lg">
          Effortless Sentiment Analysis for Text, Files, and APIs
        </Text>
        <Text fontSize="md" color="gray.500" textAlign="center" maxW="2xl">
          Instantly analyze the sentiment of your data using state-of-the-art AI. Upload text, files, or connect your API for fast, accurate, and secure sentiment insights. Powered by RoBERTa and modern web technologies.
        </Text>
        <Button
          colorScheme="teal"
          size="lg"
          px={10}
          py={6}
          borderRadius="full"
          fontWeight="bold"
          boxShadow="md"
          onClick={() => navigate('/login')}
        >
          Get Started
        </Button>
      </VStack>

      {/* Info Section */}
      <VStack spacing={4} mt={16} mb={8}>
        <Heading as="h2" size="md" color="teal.600">
          About This Project
        </Heading>
        <Text fontSize="md" color="gray.600" maxW="2xl" textAlign="center">
          This open-source project leverages advanced natural language processing to help you understand the sentiment behind your data. Whether you want to analyze a single sentence, a batch of reviews, or integrate with your business API, our tool makes it simple and intuitive.
        </Text>
        <Box as="ul" color="gray.700" fontSize="md" pl={4}>
          <li>• Analyze plain text instantly</li>
          <li>• Upload files for batch sentiment analysis</li>
          <li>• Integrate with your APIs for automated insights</li>
          <li>• Secure, fast, and easy to use</li>
        </Box>
      </VStack>

      {/* Footer */}
      <Box as="footer" w="full" py={4} textAlign="center" color="gray.400" fontSize="sm">
        © {new Date().getFullYear()} Sentiment Analysis App. Built with ❤️ using Chakra UI & React.
      </Box>
    </Box>
  );
};

export default LandingPage; 