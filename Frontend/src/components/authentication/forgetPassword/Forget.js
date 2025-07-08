import React, { useState } from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Heading,
    Text,
    VStack,
    Link,
    useColorModeValue,
    FormErrorMessage
  } from '@chakra-ui/react';
import { useNavigate, Link as RouterLink } from "react-router-dom";
import axios from 'axios';
import { validateEmail } from "../../../utlis/validation";
import { toast } from "react-toastify";
import AuthCard from "../common/AuthCard";

  export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const headingColor = useColorModeValue('teal.600', 'teal.200');
  const textColor = useColorModeValue('gray.800', 'gray.100');

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!validateEmail(email)) {
        toast.dismiss();
        toast.error("Please enter a valid email address", {
          position: "top-right",
        });
      setError("Please enter a valid email address");
        return;
      }
      axios
      .post("http://localhost:4001/forgetpassword", { email })
      .then((res) => navigate(`/otp/${email}`))
      .catch((err) => toast.error("Failed to send reset email"));
    };

    return (
    <AuthCard>
      <VStack spacing={4} align="stretch">
        <Heading fontSize="2xl" textAlign="center" color={headingColor}>
            Forgot your password?
          </Heading>
        <Text fontSize="md" color={textColor} textAlign="center">
          Enter your email and we'll send you a one-time code to reset your password.
          </Text>
        <form onSubmit={onSubmit}>
          <VStack spacing={4} align="stretch" color={textColor}>
            <FormControl id="email" isRequired isInvalid={!!error}>
              <FormLabel>Email address</FormLabel>
            <Input
                type="email"
              placeholder="your-email@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
              <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
            <Button
              colorScheme="teal"
              size="lg"
              type="submit"
              borderRadius="full"
              fontWeight="bold"
              w="full"
            >
              Request Reset
            </Button>
            <Text textAlign="center" fontSize="sm">
              Remembered your password?{' '}
              <Link as={RouterLink} to="/login" color="teal.500" _hover={{ textDecoration: 'underline' }}>
                Login
              </Link>
            </Text>
          </VStack>
        </form>
      </VStack>
    </AuthCard>
    );
  }