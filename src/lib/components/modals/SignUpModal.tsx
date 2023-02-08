import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useAccount } from "wagmi";

import { signUpValidation } from "helpers/validation";
import { setUserData } from "redux/slices/user";
import { saveUserData } from "utils/apiCalls";

interface ModalProps {
  isOpen: boolean;
  close: () => void;
}

export const SignUpModal = (props: ModalProps) => {
  const { isOpen, close } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const { address } = useAccount();

  const formik = useFormik({
    initialValues: {
      email: "",
      userName: "",
    },
    onSubmit: async () => {
      if (!formik.errors.userName || !formik.values.userName.length) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        signUp();
      }
    },
    validationSchema: signUpValidation,
  });

  async function signUp() {
    // api call to save the info passed

    const userData: {
      balance: number;
      walletAddress: `0x${string}` | undefined;
      name: string;
      emailAddress?: string;
    } = {
      balance: 0,
      walletAddress: address,
      name: formik.values.userName,
      emailAddress: formik.values.email,
    };

    if (formik.values.email === "") {
      delete userData.emailAddress;
    }

    // backend api call
    // currently we are only saving in local storage but
    // later on we will use api calls
    // localStorage.setItem('userData', JSON.stringify(userData))
    const response = await saveUserData(userData);
    // eslint-disable-next-line no-console
    console.log(response);

    // saving in redux state
    dispatch(setUserData(response.user));

    close();

    if (router.pathname === "/") {
      router.push("/explore");
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => close()}
      size="xl"
      // `trapFocus` and `blockScrollOnMount` are only switched off so that the preview works properly.
      blockScrollOnMount={false}
      trapFocus={false}
    >
      <ModalOverlay />
      <ModalContent borderRadius="2xl" mx="4" bg="#1C1C26">
        <ModalBody>
          <Stack
            maxW="xs"
            mx="auto"
            py={{ base: "12", md: "16" }}
            spacing={{ base: "6", md: "10" }}
          >
            <Stack spacing="3" textAlign="center">
              <Heading size="2xl">User Onboarding</Heading>
            </Stack>
            <Stack
              as="form"
              spacing="6"
              onSubmit={() => {
                formik.handleSubmit();
              }}
            >
              <FormControl id="userName">
                <FormLabel srOnly>Enter User Name</FormLabel>
                <Input
                  type="text"
                  size="lg"
                  placeholder="Input User Name"
                  fontSize="md"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  focusBorderColor={useColorModeValue("blue.500", "blue.200")}
                />
                {formik.touched.userName && Boolean(formik.errors.userName) ? (
                  <FormHelperText>Enter Your User Name</FormHelperText>
                ) : (
                  <FormErrorMessage>User Name is required.</FormErrorMessage>
                )}
              </FormControl>
              <FormControl id="email">
                <FormLabel srOnly>Enter Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Input Email"
                  size="lg"
                  fontSize="md"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  focusBorderColor={useColorModeValue("blue.500", "blue.200")}
                />
                {formik.touched.email && Boolean(formik.errors.email) ? (
                  <FormHelperText>Enter Your Email </FormHelperText>
                ) : (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
              </FormControl>

              <Button
                type="submit"
                fontWeight="bold"
                textTransform="uppercase"
                fontSize="md"
                bg="#00ffc2"
                color="#111"
                _hover={{
                  color: "#111",
                  bg: "#00ffc2",
                }}
                size="lg"
              >
                Confirm
              </Button>
            </Stack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
