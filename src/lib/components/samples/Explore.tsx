import { Button, Flex, Grid, Tooltip } from "@chakra-ui/react";

import { uniqueID, urls } from "utils";

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
  {
    href: "#",
    text: "Casino Games",
    disable: true,
  },
];

const ExploreViewPool = () => {
  return (
    <Grid textAlign="center">
      <Flex
        gap={4}
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Flex justifyContent="center" alignItems="center" gap={2}>
          {explore.map(
            (link: { href: string; text: string; disable: boolean }) => (
              <Tooltip
                key={uniqueID()}
                hasArrow
                label={link.disable === true ? "Coming Soon" : ""}
              >
                <Button
                  as="a"
                  isDisabled={link.disable}
                  target="_blank"
                  size="sm"
                >
                  {link.text}
                </Button>
              </Tooltip>
            )
          )}
        </Flex>
      </Flex>
    </Grid>
  );
};

export default ExploreViewPool;
