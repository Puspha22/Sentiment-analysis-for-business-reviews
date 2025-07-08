import {
  Box,
  Text,
  Input,
  Button,
  Select,
  Flex
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, Doughnut } from 'react-chartjs-2';
import { toast } from 'react-toastify';

import axios from "axios";

Chart.register(ArcElement, Tooltip, Legend);
const TextUpload = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState({
    "positive": 0,
    "negative": 0,
    "neutral": 0
  });
  const [showResult, setShowResult] = useState(false);
  const state = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: [
          '#2FDE00',
          '#B21F00',
          '#C9DE00'
        ],
        hoverBackgroundColor: [
          '#175000',
          '#501800',
          '#4B5000'
        ],
        data: [result.positive, result.negative, result.neutral]
      }
    ]
  }
  const handleTextUpload = () => {
    if (text.length > 0) {
      axios.post("http://localhost:4002/getText", {
        text: text
      }, {
        headers: {
          'Content-Type': 'application/json',
          'authToken': localStorage.getItem('userToken')
        }
      }).then(res => {
        setResult(res.data.data);
        setShowResult(true);
      }).catch(err => {
        console.log(err);
      })
    }
  }
  return (
    <Box
      w="100%"
      bg="white"
      boxShadow="lg"
      borderRadius="lg"
      p="2%"
      mt="2%"
    >
      <Text fontSize="lg" fontWeight="bold">
        Text Upload
      </Text>
      <Input
        placeholder="Enter Text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        mt="2%"
      />
      <Button
        colorScheme="teal"
        variant="outline"
        mt="2%"
        onClick={handleTextUpload}
      >
        Upload
      </Button>
      <Box
        w="50%"
        bg="white"
        boxShadow="lg"
        borderRadius="lg"
        p="2%"
        mt="2%"
      >
        <Pie
          data={state}
          options={{
            title: {
              display: true,
              text: 'Average Rainfall per month',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'right'
            }
          }}
        />
      </Box>
    </Box>
  );
};

const FileUpload = () => {
  const [upload, setUpload] = useState();
  const [blur, setBlur] = useState(true);

  const fileUpload = useRef();
  const handleFile = () => {
    fileUpload.current.click();
    setBlur(false);
  };
  const fileInputHandler = (e) => {
    if (e.target.files) {
      setUpload(e.target.files[0]);
      setBlur(false);
    }
  };
  const visualHandler = () => {
    console.log(upload);
    axios.post("http://localhost:4002/getFile", upload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'authToken': localStorage.getItem('userToken')
      }
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  };
  return (
    <Box
      w="100%"
      bg="white"
      boxShadow="lg"
      borderRadius="lg"
      p="2%"
      mt="2%"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      flexDir="column"
    >
      <Text fontSize="lg" fontWeight="bold" mb="2%"> File Upload </Text>
      <Box
        h="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={'1%'}
      >
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={handleFile}
        >
          Select File
        </Button>
      </Box>
      <Box
        h="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={'1%'}

      >
        <Input
          type="file"
          ref={fileUpload}
          onChange={fileInputHandler}
          display="none"
        />
        <Text>File Name: {upload?.name}</Text>
      </Box>
      <Button
        colorScheme="teal"
        variant="outline"
        onClick={visualHandler}
        my={'1%'}

      >
        Visualize
      </Button>
    </Box>
  );
};

const BusinessEndPoint = () => {
  const [endPoint, setEndPoint] = useState("");
  const [result, setResult] = useState({
    "positive": 0,
    "negative": 0,
    "neutral": 0
  });
  const [showResult, setShowResult] = useState(false);
  const state = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: [
          '#2FDE00',
          '#B21F00',
          '#C9DE00'
        ],
        hoverBackgroundColor: [
          '#175000',
          '#501800',
          '#4B5000'
        ],
        data: [result.positive, result.negative, result.neutral]
      }
    ]
  }

  const handleEndPoint = () => {
    if (endPoint.length > 0) {
      axios.post("http://localhost:4002/getApi", {
        endPoint: endPoint
      }, {
        headers: {
          'Content-Type': 'application/json',
          'authToken': localStorage.getItem('userToken')
        }
      }).then(res => {
        setResult(res.data.data);
        setShowResult(true);
      }).catch(err => {
        console.log(err);
        toast.error(err.response.data.error);
      })
    }
  }

  return (
    <Box
      w="100%"
      bg="white"
      boxShadow="lg"
      borderRadius="lg"
      p="2%"
      mt="2%"
    >
      <Text fontSize="lg" fontWeight="bold">
        Business End Point
      </Text>
      <Input
        placeholder="Enter business end point"
        value={endPoint}
        onChange={(e) => setEndPoint(e.target.value)}
        mt="2%"
      />
      <Button
        colorScheme="teal"
        variant="outline"
        mt="2%"
        onClick={handleEndPoint}
      >
        Upload
      </Button>
      <Box
        w="50%"
        bg="white"
        boxShadow="lg"
        borderRadius="lg"
        p="2%"
        mt="2%"
      >
        <Pie
          data={state}
          options={{
            title: {
              display: true,
              text: 'Average Rainfall per month',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'right'
            }
          }}
        />
      </Box>
    </Box>
  );
}

const Charts = () => {
  const [inputType, setInputType] = useState("text");
  return (
    <Box
      w="100%"
      minH="80vh"
    >
      <Box
        w="100%"
        bg="white"
        boxShadow="lg"
        borderRadius="lg"
        p="2%"
      >
        <Text>Select your data type:</Text>
        <Select
          onChange={(e) => setInputType(e.target.value)}
          mt="2%"
          value={inputType}
        >
          <option value="text">Text</option>
          <option value="file">File</option>
          <option value="business">Business End Point</option>
        </Select>
      </Box>
      {
        inputType === "text" ? <TextUpload /> : inputType === "file" ? <FileUpload /> : <BusinessEndPoint />
      }
    </Box>
  );
};

export default Charts;
