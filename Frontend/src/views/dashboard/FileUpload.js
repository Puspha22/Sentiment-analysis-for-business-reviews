import {
    Box,
    Text,
    Input,
    Button,
    Spinner,
    useColorModeValue
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import axios from "axios";

const FileUpload = ({ onResult }) => {
    const [upload, setUpload] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const fileUpload = useRef();
    const bg = useColorModeValue('white', 'gray.800');
    const color = useColorModeValue('gray.800', 'gray.100');
    const inputBg = useColorModeValue('gray.50', 'gray.700');

    const handleFile = () => {
        fileUpload.current.click();
    };
    const fileInputHandler = (e) => {
        if (e.target.files) {
            setUpload(e.target.files[0]);
        }
    };
    const visualHandler = async () => {
        if (!upload) return;
        setIsLoading(true);
        let formData = new FormData();
        formData.append("file", upload);
        try {
            let response = await axios({
                method: "post",
                url: "http://localhost:4002/getFile",
                data: formData,
                headers: {
                    "authToken": localStorage.getItem('userToken')
                }
            });
            if (onResult && response.data.data) {
                onResult(response.data.data);
            }
        } catch (e) {
            // Optionally handle error
        }
        setIsLoading(false);
    };
    return (
        <Box
            w="100%"
            bg={bg}
            color={color}
            boxShadow="lg"
            borderRadius="lg"
            p="2%"
            mt="2%"
            display="flex"
            flexDir="column"
        >
            <Text fontSize="lg" fontWeight="bold" mb="2%"> File Upload </Text>
            <Box
                h="100%"
                display="flex"
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
                <Input
                    type="file"
                    ref={fileUpload}
                    onChange={fileInputHandler}
                    display="none"
                    bg={inputBg}
                    color={color}
                />
                <Text color={color} ml={4}>File Name: {upload?.name}</Text>
            </Box>
            <Button
                colorScheme="teal"
                variant="outline"
                onClick={visualHandler}
                my={'1%'}
                isLoading={isLoading}
            >
                Analyze
            </Button>
            {isLoading && (
                <Box align="center" mt={2}>
                    <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
                </Box>
            )}
        </Box>
    );
}

export default FileUpload;