import { Flex, Grid, Heading, Highlight, Link } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import NextLink from "next/link";

import { urls } from "utils";

import HelperImage from "./HelperImage";

const SomeText = () => {
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
    </Grid>
  );
};

export default SomeText;
