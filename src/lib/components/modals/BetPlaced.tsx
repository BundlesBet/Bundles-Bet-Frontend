import {
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Icon,
  Text,
} from "@chakra-ui/react";
import { AiFillCheckCircle } from "react-icons/ai";
import { useSelector } from "react-redux";

import useRedirectAfterSomeSeconds from "hooks/useRedirectAfterSeconds";
import type { RootState } from "redux/store";

interface ModalProps {
  isOpen: boolean;
  close: () => void;
}

export const BetPlaced = (props: ModalProps) => {
  const { isOpen, close } = props;
  const { poolData } = useSelector((state: RootState) => state.betting);

  const { secondsRemaining } = useRedirectAfterSomeSeconds(
    `/sportSelection`,
    5,
    isOpen
  );
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
            <Stack
              gap="8"
              textAlign="center"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={AiFillCheckCircle} color="green.500" boxSize="6rem" />
              <Heading size="2xl">Bet Placed</Heading>
              <Text fontSize="lg"> {poolData.fee} $BUND </Text>
              <Text as="i">
                {" "}
                Redirecting to sport selection page in {secondsRemaining}{" "}
                {secondsRemaining > 1 ? "seconds" : "second"}
              </Text>
            </Stack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
