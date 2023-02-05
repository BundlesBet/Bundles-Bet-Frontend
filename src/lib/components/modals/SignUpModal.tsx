import {
  Button,
  FormControl,
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
// import { useDispatch } from "react-redux";
// import { useAccount } from "wagmi";

// import { signUpValidation } from "helpers/validation";
// import { setUserData } from "redux/slices/user";
// import { saveUserData } from "utils/apiCalls";

interface ModalProps {
  isOpen: boolean;
  close: () => void;
}

export const SignUpModal = (props: ModalProps) => {
  const { isOpen, close } = props;
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
              <Heading size="2xl">Edit Pool</Heading>
            </Stack>
            <Stack
              as="form"
              spacing="6"
              onSubmit={(e) => {
                e.preventDefault();
                // manage form submission
              }}
            >
              <FormControl id="poolName">
                <FormLabel srOnly>Pool Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Edit your Pool Name"
                  size="lg"
                  fontSize="md"
                  focusBorderColor={useColorModeValue("blue.500", "blue.200")}
                />
              </FormControl>
              <FormControl id="startTime">
                <FormLabel srOnly>Start Time</FormLabel>
                <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="datetime-local"
                />
              </FormControl>
              <FormControl id="fee">
                <FormLabel srOnly>Fee</FormLabel>
                <Input
                  type="text"
                  placeholder="Edit Fee"
                  size="lg"
                  fontSize="md"
                  focusBorderColor={useColorModeValue("blue.500", "blue.200")}
                />
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
                Edit Pool
              </Button>
            </Stack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
