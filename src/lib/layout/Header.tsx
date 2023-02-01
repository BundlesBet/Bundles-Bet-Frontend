import {
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { GiHamburgerMenu } from "react-icons/gi";

import HelperImage from "lib/components/samples/HelperImage";

const Header = () => {
  const { isConnected } = useAccount();
  const router = useRouter();
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
                  Profile
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <ConnectButton />
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
