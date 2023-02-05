import {
  Button,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  useColorModeValue,
  useClipboard,
  IconButton,
  ModalFooter,
  HStack,
  Text,
  StackDivider,
  ButtonGroup,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { BiCopy } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";

import type { RootState } from "redux/store";
import { createBet } from "utils/apiCalls";

interface ModalProps {
  isOpen: boolean;
  close: () => void;
  teamsSelected: { match: string; selection: number }[];
  handleConfirm: () => void;
}

export const ConfirmBetModal = (props: ModalProps) => {
  const { isOpen, close, handleConfirm } = props;
  const { onCopy, setValue } = useClipboard("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { address, isConnected }: any = useAccount();
  const trimmedAccount = isConnected
    ? `${address?.slice(0, 5)}...${address?.slice(-5)}`
    : "Account";
  useEffect(() => {
    setValue(address);
  }, [address, setValue]);

  const { userData } = useSelector((state: RootState) => state.user);

  const { poolData } = useSelector((state: RootState) => state.betting);

  const processTransaction = async () => {
    try {
      const body = {
        userId: userData.id,
        poolId: poolData.id,
        // eslint-disable-next-line react/destructuring-assignment
        teamSelections: props.teamsSelected,
        betAmount: parseInt(poolData.fee, 10),
      };

      await createBet(body);

      close();
      handleConfirm();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

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
              <Heading size="2xl">Checkout</Heading>

              {/* <Text fontSize="lg">
                    <Box as="span" whiteSpace="nowrap" fontWeight="bold">
                      Matches
                    </Box>{" "}
                    + exclusive access to new products
                  </Text> */}
              {/* <Box></Box> */}
            </Stack>
            <Stack
              as="form"
              spacing="6"
              onSubmit={(e) => {
                e.preventDefault();
                // manage form submission
              }}
            >
              <FormControl id="address">
                <InputGroup size="md">
                  <Input
                    type="text"
                    placeholder="Enter your Pool Name"
                    size="lg"
                    fontSize="md"
                    disabled
                    value={trimmedAccount}
                    focusBorderColor={useColorModeValue("blue.500", "blue.200")}
                  />
                  <InputRightElement width="4.5rem">
                    <IconButton
                      aria-label="Copy Address"
                      onClick={onCopy}
                      h="1.75rem"
                      size="sm"
                      icon={<BiCopy />}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Stack
                direction="column"
                divider={<StackDivider borderColor="#282835" />}
                w="100%"
                spacing="4"
              >
                <HStack justifyContent="space-between" alignItems="center">
                  <Text color="#7D7D8D"> Buy Price </Text>
                  <Text>25 $BUND</Text>
                </HStack>
                <HStack justifyContent="space-between" alignItems="center">
                  <Text color="#7D7D8D"> Total Price </Text>
                  <Text>25 $BUND</Text>
                </HStack>
              </Stack>
            </Stack>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup spacing="6">
            <Button
              fontSize="md"
              bg="#0EB634"
              color="#111"
              _hover={{
                color: "#111",
                bg: "#0EB634",
              }}
              onClick={processTransaction}
            >
              Accept
            </Button>
            <Button onClick={() => close()}>Decline</Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
