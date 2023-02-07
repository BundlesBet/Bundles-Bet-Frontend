import {
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";

import useWagmiLogin from "hooks/useWagmiLogin";
import { SignUpModal } from "lib/components/modals/SignUpModal";
import HelperImage from "lib/components/samples/HelperImage";
import type { RootState } from "redux/store";

const Header = () => {
  const { isConnected, address, isConnecting } = useAccount();
  const { login } = useWagmiLogin();
  const router = useRouter();
  const { userData } = useSelector((state: RootState) => state.user);

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
    <Flex as="header" width="full" align="center">
      <Flex
        marginRight="auto"
        justifyContent="space-between"
        alignItems="center"
      >
        <HelperImage size={20} src="/green_logo.png" label="Logo" />
        <Heading
          as="h1"
          size="lg"
          onClick={() => {
            router.push("/");
          }}
          cursor="pointer"
        >
          Bundles Bets
        </Heading>
      </Flex>
      <Flex marginLeft="auto" align="center" gap={2}>
        {isConnected ? (
          <>
            <ConnectButton showBalance chainStatus="none" />
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<GiHamburgerMenu />}
                variant="outline"
              />
              <MenuList>
                <MenuItem
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                >
                  User Name : {userData.name}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                >
                  Profile
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <ConnectButton />
        )}
      </Flex>
      {isOpen && <SignUpModal isOpen={isOpen} close={onClose} />}
    </Flex>
  );
};

export default Header;
