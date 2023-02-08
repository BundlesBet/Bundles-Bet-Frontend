import { Box, Flex } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

import ExploreViewPool from "lib/components/samples/Explore";
import ViewSport from "lib/components/samples/ViewSport";
import PoolTabs from "lib/components/tabs/PoolTabs";

const ViewSportPools = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      gap={10}
      mb={8}
      w="full"
    >
      <NextSeo title="View Pool" />
      <Box bg="#1C1C26" w="100%" p={4}>
        <ViewSport />
      </Box>
      <Box bg="#1C1C26" w="100%" p={4}>
        <ExploreViewPool />
      </Box>

      <PoolTabs />
    </Flex>
  );
};

export default ViewSportPools;
