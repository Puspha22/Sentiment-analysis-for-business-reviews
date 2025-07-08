import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  FormLabel,
  Box,
  Input,
  InputGroup,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { adeyeltaUser } from "../../../services/apiServices";

const QuestionSet = ({ datas }) => {

    // usestate for storingsignup datas that is passes from signup.js

  const [adeyeltauser, setAdeyeltauser] = useState({
    "email": datas.email,
    "password": datas.password,
    "designation":'',
    "experience":'',
    "organization":'',
    "data_set_category":'',
    "description":''


  });
  // usestate for storing question set datas
  const[queset,setQueset]=useState()
  // console.log(datas, "hello dataa how are you")
  const [questiondata,setQuestiondata]=useState({})

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();
  const signupdata = () => {
     console.log(adeyeltauser,'signupdata');
    // console.log(setQueset);

   
    adeyeltaUser(adeyeltauser) .then((res) => {
        if(res.status===200){
        console.log(res, "adeyelta");

          setQueset(res.data.data)
           toast.success(res.data.message);

        }
      })
      .catch((err) => {
        toast.error(err.response.data.detail[0].msg);
      });
  }
  const onSubmit = (data) => {
    console.log(data);
    setAdeyeltauser(
      adeyeltauser.Input_file=data.Input_file,
      adeyeltauser.organization=data.organization,
      adeyeltauser.description=data.description,
      );
   
    //  console.log({...adeyeltauser,queset},"combine");

    // console.log(data,"que sets");
    signupdata();
    // console.log(data, datas, "hwllo data how are you");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="24px">
          <Box>
            <FormLabel htmlFor="username">Your Organization ?</FormLabel>
            <Input
              {...register("organization")}
              placeholder="Please enter your organization name"
            />
          </Box>

          <Box>
            <FormLabel htmlFor="owner">How would you like to connect with?</FormLabel>
            <Select
              id="owner"
              defaultValue="text_file"
              {...register("Input_file")}
            >
              <option value="raw_text">Raw Text</option>
              <option value="file_format">File(csv,json,excle)</option>
              <option value="end_points">Your Business end-points</option>

            </Select>
          </Box>
  

          <Box>
            <FormLabel htmlFor="desc"> Description</FormLabel>
            <Textarea
              id="desc"
              placeholder="Write short information about you..."
              {...register("description")}
            />
          </Box>

          <Button
            bg={isSubmitting ? "gray.300" : "black"}
            color={isSubmitting ? "gray.800" : "white"}
            isLoading={isSubmitting}
            type="submit"
            _hover={isSubmitting ? "gray.300" : "black"}
            size="lg"
          >
            Confirm
          </Button>
        </Stack>
      </form>
    </>
  );
};
export default QuestionSet;
