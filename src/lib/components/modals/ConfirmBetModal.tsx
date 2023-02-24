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
  useToast,
} from "@chakra-ui/react";
import type BN from "bn.js";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { BiCopy } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  useAccount,
  useBalance,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import {
  prepareWriteContract,
  readContract,
  writeContract,
} from "wagmi/actions";

import { contractDetails } from "config";
import { setUserData } from "redux/slices/user";
import type { RootState } from "redux/store";
import { approvalAmt } from "utils";
import { createBet } from "utils/apiCalls";
import type { UserData } from "utils/interfaces";

interface ModalProps {
  isOpen: boolean;
  close: () => void;
  teamsSelected: { match: number; selection: number }[];
  handleConfirm: () => void;
}

export const ConfirmBetModal = (props: ModalProps) => {
  const { isOpen, close, handleConfirm, teamsSelected } = props;

  const dispatch = useDispatch();
  const { onCopy, setValue } = useClipboard("");
  const { address, isConnected } = useAccount();
  const [loader, setLoader] = useState(false);
  const { poolData } = useSelector((state: RootState) => state.betting);
  const userData = useSelector((state: RootState) => state.user)
    .userData as UserData;

  const trimmedAccount = isConnected
    ? `${address?.slice(0, 5)}...${address?.slice(-5)}`
    : "Account";
  const matchIds = teamsSelected.map((teamSel) => teamSel.match.toString());
  const matchesSelections = teamsSelected.map((teamSel) => teamSel.selection);

  const { config } = usePrepareContractWrite({
    address: contractDetails.betting.address,
    abi: contractDetails.betting.abi,
    chainId: contractDetails.betting.chainId,
    functionName: "placeBets(uint256,string[],uint256[])",
    args: [poolData.id, matchIds, matchesSelections],
    enabled: Boolean(poolData.id && matchIds && matchesSelections),
    overrides: {
      value: ethers.utils.parseUnits(poolData.protocolFee.toString(), "ether"),
    },
  });

  const { writeAsync } = useContractWrite(config);

  const toast = useToast();
  const { data } = useBalance({
    address,
  });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setValue(address!);
  }, [address, setValue]);

  const processTransaction = async () => {
    setLoader(true);
    try {
      const allowance = await readContract({
        address: contractDetails.bundToken.address,
        abi: contractDetails.bundToken.abi,
        chainId: contractDetails.bundToken.chainId,
        functionName: "allowance",
        args: [address, contractDetails.betting.address],
      });

      // eslint-disable-next-line no-console
      console.log(`allowance-`, allowance);
      // eslint-disable-next-line no-console
      console.log(`protocolFee`, poolData.protocolFee);

      // eslint-disable-next-line no-console
      console.log(`poolData.fee`, poolData.fee);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const poolFee = ethers.utils.parseUnits(poolData.fee);

      // eslint-disable-next-line no-console
      console.log(`contractFee`, poolFee);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (poolFee.gte(allowance as BN)) {
        const approveConfig = await prepareWriteContract({
          address: contractDetails.bundToken.address,
          abi: contractDetails.bundToken.abi,
          functionName: "approve",
          args: [contractDetails.betting.address, approvalAmt],
        });

        const approveData = await (await writeContract(approveConfig)).wait(1);

        if (!approveData) {
          toast({
            position: "top-right",
            title: "Token Approval Problem",
            description: "Approval for token was not provided.",
            status: "error",
            duration: 4000,
            isClosable: true,
          });

          return;
        }
      }

      // eslint-disable-next-line no-console
      console.log(`data`, data);
      // eslint-disable-next-line no-console
      console.log(`poolData.protocolFee`, poolData.protocolFee);

      if (
        data?.formatted &&
        parseFloat(data?.formatted) <
          parseFloat(poolData.protocolFee.toString())
      ) {
        toast({
          position: "top-right",
          title: "Matic Balance is less",
          description: "Matic balance is less than the protocol fee.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        setLoader(false);
        close();
        return;
      }

      toast({
        position: "top-right",
        title: "Processing transaction",
        description: "We are processing your transaction, please wait...",
        status: "info",
        duration: 4000,
        isClosable: true,
      });

      (await writeAsync?.())
        ?.wait(1)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .then(async (value) => {
          const body = {
            userId: (userData as UserData).id,
            poolId: poolData.id,
            teamSelections: teamsSelected,
            betAmount: poolData.fee,
          };

          await createBet(body);

          dispatch(
            setUserData({
              ...userData,
              totalPoolsParticipated: userData.totalPoolsParticipated + 1,
            })
          );

          toast({
            position: "top-right",
            title: "Bet created",
            description: "Bet successfully created.",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
          setLoader(false);
          close();
          handleConfirm();
        })
        .catch((error) => {
          throw new Error(error);
        });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      setLoader(false);
      toast({
        position: "top-right",
        title: "Problem Encountered",
        description: "Problem in bet creation, please try again later!",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
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
            </Stack>

            <Stack
              as="form"
              spacing="6"
              onSubmit={(e) => {
                e.preventDefault();
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
                  <Text>{poolData.fee} $BUND</Text>
                </HStack>
                <HStack justifyContent="space-between" alignItems="center">
                  <Text color="#7D7D8D"> Protocol Price </Text>
                  <Text>{poolData.protocolFee} MATIC</Text>
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
              isLoading={loader}
            >
              Accept
            </Button>

            <Button onClick={() => close()} isLoading={loader}>
              Decline
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
