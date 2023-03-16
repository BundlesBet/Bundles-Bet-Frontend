import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAccount } from "wagmi";

import { explore, uniqueID } from "utils";

const HeaderMenu = () => {
  const router = useRouter();
  const { isConnected } = useAccount();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<GiHamburgerMenu />}
        variant="outline"
      />
      <MenuList>
        {explore.map(
          (link: { href: string; text: string; disable: boolean }) => (
            <MenuItem
              key={uniqueID()}
              onClick={() => {
                if (link.href === "#") return;
                router.push(link.href);
              }}
            >
              {link.text}{" "}
              <Text fontSize="smaller">
                {" "}
                {link.disable ? "(Coming Soon)" : ""}
              </Text>
            </MenuItem>
          )
        )}

        {isConnected && (
          <MenuItem
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            Profile
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default HeaderMenu;
