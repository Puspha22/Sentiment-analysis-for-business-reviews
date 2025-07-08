import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Heading,
  Image,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import profilePicture from "../../assets/images/profilePicture.png";
import { useNavigate } from "react-router-dom";

const NavLink = () => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  ></Link>
);

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const isAuth = localStorage.getItem("userToken");

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={"20%"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          {/* <Image src={vandana} alt="vandana" height={"90%"} /> */}
          <Heading>Sentiment Analysis</Heading>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode} _hover={{ bg: "#671706", color: "white" }}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              {
                isAuth ? (
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={"full"}
                      variant={"link"}
                      cursor={"pointer"}
                      minW={0}
                    >
                      <Avatar size={"sm"} src={profilePicture} />
                    </MenuButton>
                    <MenuList alignItems={"center"}>
                      <MenuDivider />
                      <MenuItem
                        onClick={handleLogout}
                      >Logout</MenuItem>
                    </MenuList>
                  </Menu>) : (
                  <Button
                    bg={"#671706"}
                    color={"white"}
                    _hover={{
                      bg: "#671706",
                    }}
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login
                  </Button>
                )
              }
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
