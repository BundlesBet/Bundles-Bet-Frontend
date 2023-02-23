import { Box, Flex, Grid, Heading, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { uniqueID, urls } from "utils";

import HelperImage from "./HelperImage";

const explore = [
  {
    href: urls.sportsSelection,
    text: "Prediction Pools",
    disable: false,
  },
  {
    href: "#",
    text: "Daily Fantasy Sports",
    disable: true,
  },

  {
    href: "#",
    text: "Sportsbook",
    disable: true,
  },
];

const ExploreSection = () => {
  const router = useRouter();
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
          <Heading as="h1" size="2xl" color="#0EB634">
            BundlesBets
          </Heading>
        </Flex>
        {explore.map(
          (link: { href: string; text: string; disable: boolean }) => (
            <Tooltip
              key={uniqueID()}
              hasArrow
              label={link.disable === true ? "Coming Soon" : ""}
              aria-label="A tooltip"
            >
              <Box
                as="button"
                borderRadius="md"
                bg="#282835"
                color="white"
                disabled={link.disable}
                px={4}
                h={14}
                w="full"
                onClick={() => {
                  router.push(link.href);
                }}
              >
                {link.text}
              </Box>
            </Tooltip>
          )
        )}
      </Flex>
    </Grid>
  );
};

export default ExploreSection;
