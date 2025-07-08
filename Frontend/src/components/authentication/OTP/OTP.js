import React from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    VStack,
    Text,
    FormErrorMessage,
    useColorModeValue
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AuthCard from "../common/AuthCard";

const OTP = () => {
    const navigate = useNavigate();
    const parms = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const headingColor = useColorModeValue('teal.600', 'teal.200');
    const textColor = useColorModeValue('gray.800', 'gray.100');

    const onSubmit = (data) => {
        let otp = parseInt(data.otp);
        if (!data.otp || data.otp.length !== 6) {
            toast.error("Please enter a valid 6-digit OTP");
            return;
        }
        axios.post('http://localhost:4001/verifyuser', {
            "email": parms.email,
            "otp": otp
        }).then(res => {
            if (res.data.code === 200) {
                toast.success("User verified successfully");
                navigate(`/reset-password/${parms.email}/${otp}`);
            } else if (res.data.message && res.data.message.includes("already verified")) {
                toast.info("Your account is already verified. Please log in or reset your password if needed.");
            } else if (res.data.message && res.data.message.includes("Invalid OTP")) {
                toast.error("The OTP you entered is invalid. Please check your email and try again.");
            } else {
                toast.error("Something went wrong. Response code not 200");
            }
        }).catch(err => {
            if (err.response && err.response.data && err.response.data.message) {
                if (err.response.data.message.includes("already verified")) {
                    toast.info("Your account is already verified. Please log in or reset your password if needed.");
                } else if (err.response.data.message.includes("Invalid OTP")) {
                    toast.error("The OTP you entered is invalid. Please check your email and try again.");
                } else {
                    toast.error(err.response.data.message);
                }
            } else {
                toast.error("Something went wrong. Please try again");
            }
        });
    };

    return (
        <AuthCard>
            <VStack spacing={4} align="stretch">
                <Heading fontSize="2xl" textAlign="center" color={headingColor}>
                    Verify your account
                </Heading>
                <Text fontSize="md" color={textColor} textAlign="center">
                    Enter the 6-digit OTP sent to your email address.
                </Text>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack spacing={4} align="stretch" color={textColor}>
                        <FormControl id="otp" isRequired isInvalid={!!errors.otp}>
                            <FormLabel>OTP</FormLabel>
                            <Input type="text" maxLength={6} placeholder="Enter OTP" {...register("otp", { required: true })} />
                            <FormErrorMessage>OTP is required</FormErrorMessage>
                        </FormControl>
                        <Button
                            colorScheme="teal"
                            size="lg"
                            type="submit"
                            isLoading={isSubmitting}
                            borderRadius="full"
                            fontWeight="bold"
                            w="full"
                        >
                            Verify OTP
                        </Button>
                    </VStack>
                </form>
            </VStack>
        </AuthCard>
    );
};

export default OTP;
