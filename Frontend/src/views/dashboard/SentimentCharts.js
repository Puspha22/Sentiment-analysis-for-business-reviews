import React from 'react';
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, useColorModeValue } from '@chakra-ui/react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const chartColors = {
  positive: '#4CAF50', // muted green
  negative: '#D32F2F', // muted red
  neutral: '#9E9E9E'   // muted gray
};

const SentimentCharts = ({ positive = 0, negative = 0, neutral = 0 }) => {
  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.800', 'gray.100');
  const labelColor = useColorModeValue('#222', '#eee');
  const gridColor = useColorModeValue('#eee', '#444');

  const data = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        label: 'Sentiment',
        data: [positive, negative, neutral],
        backgroundColor: [chartColors.positive, chartColors.negative, chartColors.neutral],
        borderColor: [chartColors.positive, chartColors.negative, chartColors.neutral],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        label: 'Count',
        data: [positive, negative, neutral],
        backgroundColor: [chartColors.positive, chartColors.negative, chartColors.neutral],
        borderRadius: 8,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: labelColor,
          font: { size: 14 },
        },
      },
    },
  };

  const barOptions = {
    plugins: {
      legend: { display: false },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: labelColor },
      },
      y: {
        beginAtZero: true,
        grid: { color: gridColor },
        ticks: { color: labelColor },
      },
    },
  };

  return (
    <Box bg={bg} color={color} borderRadius="xl" boxShadow="md" p={6} w="full">
      <Tabs variant="soft-rounded" colorScheme="teal" isFitted>
        <TabList mb={4}>
          <Tab>Doughnut</Tab>
          <Tab>Bar</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Doughnut data={data} options={options} />
          </TabPanel>
          <TabPanel>
            <Bar data={barData} options={barOptions} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default SentimentCharts; 