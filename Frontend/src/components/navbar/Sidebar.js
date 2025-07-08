import { Link } from "react-router-dom";
import { Box, Divider, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import {
  AiOutlinePieChart,
  AiOutlineUser,
  AiOutlineMenu,
  AiOutlineSetting,
} from "react-icons/ai";
import { BiMapPin } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
const sidebarData = {
  title: "NCIT",
  items: [
    {
      name: "Add Data",
      icon: AiOutlinePieChart,
      path: "/",
    },
  ],
};

const Sidebar = () => {
  return (
    <Box py="6%">
      {sidebarData.items.map((item, index) => {
        return (

          <VStack spacing={4} key={index} display="flex" align={"flex-start"}>

            <HStack my="6%" spacing={4} cursor="pointer">
              <item.icon color="white" size={"30px"} />
              <Link to={item.path}>
                <Text color={"white"} fontSize="sm" fontWeight={"400"}>
                  {item.name}
                </Text>
              </Link>
            </HStack>
          </VStack>

        );
      })}
    </Box>
  );
};

export default Sidebar;
