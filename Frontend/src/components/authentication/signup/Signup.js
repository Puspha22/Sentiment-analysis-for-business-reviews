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
  VStack,
  useColorModeValue,
  FormErrorMessage,
  Spinner,
  List,
  ListItem,
  ListIcon,
  Box
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import { useForm } from "react-hook-form";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { validateEmail } from "../../../utlis/validation";
import { toast } from "react-toastify";
import axios from "axios";
import AuthCard from "../common/AuthCard";
import OTP from '../OTP/OTP'

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

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const checkAllCriteria = (pw) => passwordCriteria.every(c => c.test(pw));

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
    if (!checkAllCriteria(data.password)) {
      toast.dismiss();
      toast.error("Password does not meet all criteria.");
      return;
    }
    if (data.password !== data.cpassword) {
      toast.dismiss();
      toast.error("Password and Confirm Password do not match");
      return;
    }
    setIsLoading(true);
    axios
      .post("http://localhost:4001/signup", { email: data.email, password: data.password })
      .then(res => {
        setIsLoading(false);
        if (res.data.code === 200) {
          navigate('/otp/' + data.email);
        }
      })
      .catch(err => {
        setIsLoading(false);
        toast.error(err.response?.data?.error || "Signup failed");
      });
  };

  return (
    <AuthCard>
      <VStack spacing={4} align="stretch">
        <Heading fontSize="2xl" textAlign="center" color={headingColor}>
          Register your account
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
                  value={password}
                  onChange={e => setPassword(e.target.value)}
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
            <FormControl id="cpassword" isRequired isInvalid={!!errors.cpassword}>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  type={showCPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  {...register("cpassword", { required: true })}
                />
                <InputRightElement>
                  <IconButton
                    variant="ghost"
                    aria-label={showCPassword ? "Hide password" : "Show password"}
                    icon={showCPassword ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={() => setShowCPassword((show) => !show)}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>Confirm password is required</FormErrorMessage>
            </FormControl>
              <Button
              colorScheme="teal"
              size="lg"
                type="submit"
              isLoading={isSubmitting || isLoading}
              borderRadius="full"
              fontWeight="bold"
              w="full"
            >
              Sign up
            </Button>
            <Text textAlign="center" fontSize="sm">
              Already a user?{' '}
              <Link as={RouterLink} to="/login" color="teal.500" _hover={{ textDecoration: 'underline' }}>
                Login
              </Link>
              </Text>
          </VStack>
    </form>
      </VStack>
    </AuthCard>
  );
};

export default Signup;
