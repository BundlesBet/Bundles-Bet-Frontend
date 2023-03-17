import {
  // Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";

import SportSearchBar from "../samples/SportSearchBar";

interface ModalProps {
  isOpen: boolean;
  close: () => void;
}

export const SelectSportModal = (props: ModalProps) => {
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
            mx="auto"
            py={{ base: "12", md: "16" }}
            spacing={{ base: "6", md: "10" }}
          >
            <SportSearchBar />
            {/* <Stack
              gap="10"
              textAlign="center"
              alignItems="center"
              justifyContent="center"
            >
              <Heading size="2xl">Select Sport</Heading>
            </Stack> */}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
