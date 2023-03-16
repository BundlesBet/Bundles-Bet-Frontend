import {
  Box,
  Flex,
  Heading,
  Show,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAccount } from "wagmi";

import useWagmiLogin from "hooks/useWagmiLogin";
import { SignUpModal } from "lib/components/modals/SignUpModal";
import HelperImage from "lib/components/samples/HelperImage";
import { setUserData } from "redux/slices/user";
import type { RootState } from "redux/store";
import { explore, uniqueID } from "utils";

import HeaderMenu from "./HeaderMenu";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { login } = useWagmiLogin();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isConnected, address, isConnecting } = useAccount();
  const { userData } = useSelector((state: RootState) => state.user);

  const currentAddress = useRef(address);

  const signUpChecker = async () => {
    const signUpCheck = await login();

    if (!signUpCheck) {
      onOpen();
    } else {
      onClose();
    }
  };

  useEffect(() => {
    if (currentAddress.current !== address) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch(setUserData({} as any));
      currentAddress.current = address;
    }

    if (
      !isConnected ||
      !address ||
      isConnecting ||
      (userData && Object.keys(userData).length)
    ) {
      return;
    }

    if (isConnected && address && userData && !Object.keys(userData).length) {
      signUpChecker();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isConnected, userData]);

  return (
    <Flex as="header" width="full" align="center">
      <Flex
        marginRight="auto"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display={{ base: "none", lg: "flex", md: "flex" }}>
          <HelperImage size={20} src="/green_logo.png" label="Logo" />
        </Box>

        <Heading
          as="h1"
          size={{ base: "sm", lg: "lg" }}
          color="#0EB634"
          onClick={() => {
            router.push("/");
          }}
          cursor="pointer"
        >
          BundlesBets
        </Heading>
      </Flex>

      <Flex marginLeft="auto" align="center" gap={6}>
        <Show above="lg">
          {explore.map(
            (link: { href: string; text: string; disable: boolean }) => (
              <Tooltip
                key={uniqueID()}
                hasArrow
                label={link.disable === true ? "Coming Soon" : ""}
                aria-label="A tooltip"
              >
                <Box
                  px={4}
                  as="button"
                  color="white"
                  disabled={link.disable}
                  background="transparent"
                  fontWeight="bold"
                  opacity={link.disable ? 0.6 : 1}
                  onClick={() => {
                    router.push(link.href);
                  }}
                >
                  {link.text}
                </Box>
              </Tooltip>
            )
          )}

          {isConnected && (
            <Box
              px={4}
              as="button"
              color="white"
              fontWeight="bold"
              background="transparent"
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              Profile
            </Box>
          )}
        </Show>

        {isConnected ? (
          <ConnectButton accountStatus="address" chainStatus="none" />
        ) : (
          <ConnectButton />
        )}

        <Show below="lg">
          <HeaderMenu />
        </Show>
      </Flex>
      {isOpen && <SignUpModal isOpen={isOpen} close={onClose} />}
    </Flex>
  );
};

export default Header;
