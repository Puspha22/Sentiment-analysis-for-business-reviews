import {
  Box,
  Text,
  Select,
  SimpleGrid,
  useBreakpointValue,
  Heading,
  useColorModeValue
} from "@chakra-ui/react";
import React, { useState } from "react";
import TextUpload from './TextUpload';
import FileUpload from './FileUpload';
import BusinessEndPoint from './BusinessEndPoint';
import SentimentCharts from './SentimentCharts';

const Dashboard = () => {
  const [inputType, setInputType] = useState("text");
  const [sentimentResult, setSentimentResult] = useState(null);
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Dynamic card style for light/dark mode
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardText = useColorModeValue('gray.800', 'gray.100');

  const cardStyle = {
    bg: cardBg,
    borderRadius: '2xl',
    boxShadow: '2xl',
    p: { base: 6, md: 10 },
    color: cardText,
  };

  // Handler to pass to upload components
  const handleResult = (result) => {
    setSentimentResult(result);
  };

  return (
    <Box minH="100vh" py={8} px={{ base: 2, md: 8 }}
      bgGradient={useColorModeValue(
        'linear(to-br, teal.50, blue.100, purple.50)',
        'linear(to-br, gray.900, teal.900, blue.900)'
      )}
    >
      <Heading as="h2" size="lg" mb={8} textAlign="center" color={useColorModeValue('teal.700', 'teal.200')} letterSpacing="tight">
        Sentiment Analysis Dashboard
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} maxW="1100px" mx="auto">
        <Box>
          <Box {...cardStyle} mb={4}>
            <Text fontSize="lg" fontWeight="bold" mb={2} color={cardText}>Select your data type:</Text>
                  <Select
                    onChange={(e) => setInputType(e.target.value)}
              mt={2}
                    value={inputType}
                    variant="filled"
              border="1px solid #e2e8f0"
              mb={4}
              color={cardText}
              bg={useColorModeValue('gray.50', 'gray.700')}
                  >
                    <option value="text" >Text</option>
                    <option value="file">File</option>
                    <option value="business">Api End Point</option>
                  </Select>
            {inputType === "text" ? (
              <TextUpload onResult={handleResult} />
            ) : inputType === "file" ? (
              <FileUpload onResult={handleResult} />
            ) : (
              <BusinessEndPoint onResult={handleResult} />
            )}
                </Box>
              </Box>
        <Box display="flex" alignItems="center" justifyContent="center">
          {sentimentResult && (
            <Box w="100%" maxW="420px" mx="auto" {...cardStyle}>
              <SentimentCharts
                positive={sentimentResult.positive}
                negative={sentimentResult.negative}
                neutral={sentimentResult.neutral}
              />
            </Box>
          )}
        </Box>
      </SimpleGrid>
      </Box>
  );
};

export default Dashboard;

