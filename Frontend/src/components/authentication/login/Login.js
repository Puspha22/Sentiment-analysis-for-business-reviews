import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Heading,
  Text,
  Link,
  IconButton,
  useColorModeValue,
  VStack,
  FormErrorMessage
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useForm } from "react-hook-form";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail } from "../../../utlis/validation";
import axios from "axios";
import AuthCard from "../common/AuthCard";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const headingColor = useColorModeValue('teal.600', 'teal.200');
  const textColor = useColorModeValue('gray.800', 'gray.100');

  const onSubmit = (data) => {
    if (!validateEmail(data.email)) {
      toast.dismiss();
      toast.error("Please enter a valid email address", {
        position: "top-right",
      });
      return;
    }
    axios
      .post("http://localhost:4001/login", {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        localStorage.setItem("userToken", res.data.data.authToken);
        navigate("/home");
        window.location.reload();
      })
      .catch((err) => toast.error("Your user name and password didn't match"));
  };

  return (
    <AuthCard>
      <VStack spacing={4} align="stretch">
        <Heading fontSize="2xl" textAlign="center" color={headingColor}>
          Log in to your account
        </Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4} align="stretch" color={textColor}>
            <FormControl id="email" isRequired isInvalid={!!errors.email}>
                <FormLabel>Email address</FormLabel>
              <Input type="email" placeholder="Enter your email" {...register("email", { required: true })} />
              <FormErrorMessage>Email is required</FormErrorMessage>
              </FormControl>
            <FormControl id="password" isRequired isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", { required: true })}
                />
                <InputRightElement>
                  <IconButton
                    variant="ghost"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={() => setShowPassword((show) => !show)}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>Password is required</FormErrorMessage>
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
                  Sign in
                </Button>
            <Text textAlign="right" fontSize="sm">
              <Link as={RouterLink} to="/forgot-password" color="blue.500" _hover={{ textDecoration: 'underline' }}>
                Forgot password?
              </Link>
            </Text>
            <Text textAlign="center" fontSize="sm">
              Not a User?{' '}
              <Link as={RouterLink} to="/signup" color="teal.500" _hover={{ textDecoration: 'underline' }}>
                    Register
                  </Link>
                </Text>
          </VStack>
          </form>
      </VStack>
    </AuthCard>
  );
}