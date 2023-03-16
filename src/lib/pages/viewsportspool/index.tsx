import { Flex, Show } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

// import ExploreViewPool from "lib/components/samples/Explore";
import LeagueSearchBar from "lib/components/samples/LeagueSearchBar";
import SportSearchBar from "lib/components/samples/SportSearchBar";
// import ViewSport from "lib/components/samples/ViewSport";
import PoolTabs from "lib/components/tabs/PoolTabs";

const ViewSportPools = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="60vh"
      gap={10}
      mb={12}
      w="full"
    >
      <NextSeo title="View Pool" />

      <Show above="md">
        <Flex width="100%" gap={3} flexDirection="row">
          <SportSearchBar />
          <LeagueSearchBar />
        </Flex>
      </Show>

      <Show below="md">
        <Flex width="100%" gap={3} flexDirection="column">
          <SportSearchBar />
          <LeagueSearchBar />
        </Flex>
      </Show>

      {/* <Box bg="#1C1C26" w="100%" p={4}>
        <ViewSport />
      </Box> */}

      {/* <Box bg="#1C1C26" w="100%" p={4}>
        <ExploreViewPool />
      </Box> */}

      <PoolTabs />
    </Flex>
  );
};

export default ViewSportPools;
