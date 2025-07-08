import React, { useState } from "react";
import {
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    VStack,
    Text,
    FormErrorMessage,
    useColorModeValue,
    List,
    ListItem,
    ListIcon,
    Box
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon, CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AuthCard from "../common/AuthCard";

const passwordCriteria = [
    {
        label: "6-20 characters",
        test: (pw) => pw.length >= 6 && pw.length <= 20
    },
    {
        label: "At least one digit",
        test: (pw) => /\d/.test(pw)
    },
    {
        label: "At least one uppercase letter",
        test: (pw) => /[A-Z]/.test(pw)
    },
    {
        label: "At least one lowercase letter",
        test: (pw) => /[a-z]/.test(pw)
    },
    {
        label: "At least one letter",
        test: (pw) => /[a-zA-Z]/.test(pw)
    }
];

const ResetPassword = () => {
    const navigate = useNavigate();
    const { email, otp } = useParams();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const [password, setPassword] = useState("");

    const checkAllCriteria = (pw) => passwordCriteria.every(c => c.test(pw));

    const headingColor = useColorModeValue('teal.600', 'teal.200');
    const textColor = useColorModeValue('gray.800', 'gray.100');

    const onSubmit = (data) => {
        if (!checkAllCriteria(data.password)) {
            toast.error("Password does not meet all criteria.");
            return;
        }
        if (data.password !== data.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }
        axios.post('http://localhost:4001/resetpassword', {
            email,
            otp,
            password: data.password
        }).then(res => {
            if (res.data.code === 200) {
                toast.success("Password reset successful! Please log in.");
                navigate('/login');
            } else {
                toast.error(res.data.message || "Something went wrong. Please try again.");
            }
        }).catch(err => {
            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        });
    };

    return (
        <AuthCard>
            <VStack spacing={4} align="stretch">
                <Heading fontSize="2xl" textAlign="center" color={headingColor}>
                    Reset your password
                </Heading>
                <Text fontSize="md" color={textColor} textAlign="center">
                    Enter your new password below.
                </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack spacing={4} align="stretch" color={textColor}>
                        <FormControl id="password" isRequired isInvalid={!!errors.password}>
                            <FormLabel>New Password</FormLabel>
                            <InputGroup>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter new password"
                                    {...register("password", { required: true })}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <InputRightElement>
                                    <Button
                                        variant="ghost"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        onClick={() => setShowPassword((show) => !show)}
                                        h="1.75rem"
                                        size="sm"
                                    >
                                        {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>Password is required</FormErrorMessage>
                            <Box mt={2}>
                                <List spacing={1} fontSize="sm">
                                    {passwordCriteria.map((c, idx) => (
                                        <ListItem key={idx} color={c.test(password) ? "teal.500" : "gray.400"} display="flex" alignItems="center">
                                            <ListIcon as={c.test(password) ? CheckCircleIcon : WarningIcon} color={c.test(password) ? "teal.400" : "gray.300"} />
                                            {c.label}
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </FormControl>
                        <FormControl id="confirmPassword" isRequired isInvalid={!!errors.confirmPassword}>
                            <FormLabel>Confirm New Password</FormLabel>
                            <InputGroup>
                                <Input
                                    type={showCPassword ? "text" : "password"}
                                    placeholder="Confirm new password"
                                    {...register("confirmPassword", { required: true })}
                                />
                                <InputRightElement>
                                    <Button
                                        variant="ghost"
                                        aria-label={showCPassword ? "Hide password" : "Show password"}
                                        onClick={() => setShowCPassword((show) => !show)}
                                        h="1.75rem"
                                        size="sm"
                                    >
                                        {showCPassword ? <ViewOffIcon /> : <ViewIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>Confirm password is required</FormErrorMessage>
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
                    Reset Password
                </Button>
                    </VStack>
        </form>
            </VStack>
        </AuthCard>
    );
};

export default ResetPassword;