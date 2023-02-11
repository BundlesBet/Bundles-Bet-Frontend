import { Flex } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

import ExploreSection from "lib/components/samples/ExploreSection";

const Home = () => {
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
      <NextSeo title="Explore" />
      <ExploreSection />
    </Flex>
  );
};

export default Home;
