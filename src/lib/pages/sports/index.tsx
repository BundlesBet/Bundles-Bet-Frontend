import { Flex } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

import SportsSelection from "lib/components/samples/SportsSelection";

const Sports = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="60vh"
      gap={4}
      mb={8}
      w="full"
    >
      <NextSeo title="Sports Selection" />
      <SportsSelection />
    </Flex>
  );
};

export default Sports;
