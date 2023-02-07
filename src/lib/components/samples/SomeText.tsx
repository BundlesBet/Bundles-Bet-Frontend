import {
  Flex,
  Grid,
  Heading,
  Highlight,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import NextLink from "next/link";
import { useEffect } from "react";
import { useAccount } from "wagmi";

import { SignUpModal } from "../modals/SignUpModal";
import useWagmiLogin from "hooks/useWagmiLogin";
import { urls } from "utils";

import HelperImage from "./HelperImage";

const SomeText = () => {
  const { isConnected, address, isConnecting } = useAccount();
  const { login } = useWagmiLogin();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const signUpChecker = async () => {
    const signUpCheck = await login();

    if (!signUpCheck) {
      onOpen();
    } else {
      onClose();
    }
  };

  useEffect(() => {
    if (!isConnected || !address || isConnecting) return;
    if (isConnected && address) {
      signUpChecker();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);
  return (
    <Grid textAlign="center">
      <Flex
        gap={4}
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Flex gap={2} justifyContent="center" alignItems="center">
          <HelperImage size={20} src="/green_logo.png" label="Logo" />
          <Heading as="h1" size="2xl">
            <Highlight query="Bundles" styles={{ color: "#0EB634" }}>
              Bundles Bets
            </Highlight>
          </Heading>
        </Flex>
        <ConnectButton showBalance={false} chainStatus="none" />
        <Link as={NextLink} href={urls.explore}>
          Skip for now
        </Link>
      </Flex>
      {isOpen && <SignUpModal isOpen={isOpen} close={onClose} />}
    </Grid>
  );
};

export default SomeText;
