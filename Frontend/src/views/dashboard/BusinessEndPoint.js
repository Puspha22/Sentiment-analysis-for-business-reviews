import {
    Box,
    Text,
    Input,
    Button,
    Select,
    Flex,
    Textarea,
    Spinner,
    useColorModeValue
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, Doughnut } from 'react-chartjs-2';
import { toast } from 'react-toastify';

import axios from "axios";
import { useForm } from "react-hook-form";

Chart.register(ArcElement, Tooltip, Legend);

const BusinessEndPoint = ({ onResult }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit } = useForm();
    const bg = useColorModeValue('white', 'gray.800');
    const color = useColorModeValue('gray.800', 'gray.100');
    const inputBg = useColorModeValue('gray.50', 'gray.700');

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            let response = await axios({
                method: "post",
                url: "http://localhost:4002/getApi",
                data: data,
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
        >
            <Text fontSize="lg" fontWeight="bold">
                API Upload
            </Text>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Textarea 
                    placeholder='Enter your API endpoint' 
                    {...register("endPoint")}
                    bg={inputBg}
                    color={color}
                />
                <Button
                    colorScheme="teal"
                    variant="outline"
                    mt="2%"
                    type="submit"
                    isLoading={isLoading}
                >
                    Submit
                </Button>
                {isLoading && (
                    <Box align="center" mt={2}>
                        <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
                    </Box>
                )}
            </form>
        </Box>
    );
};

export default BusinessEndPoint;