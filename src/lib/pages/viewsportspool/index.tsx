/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { Box, Flex } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import CustomLoader from "lib/components/samples/CustomLoader";
import ExploreViewPool from "lib/components/samples/Explore";
import ViewSport from "lib/components/samples/ViewSport";
import PoolTable from "lib/components/table/PoolTable";
import type { RootState } from "redux/store";
import { getPoolOfSport } from "utils/apiCalls";

const ViewSportPools = () => {
  const [poolData, setPoolData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const sportName = useSelector(
    (state: RootState) => state.user.sportSelected
  ).value;
  const sportSelected = useSelector(
    (state: RootState) => state.user.sportSelected
  );

  const getPoolData = async () => {
    const fetchPoolData = await getPoolOfSport(sportName);

    setPoolData(fetchPoolData.pools);

    setTimeout(() => setLoading(false), 2000);
  };

  useEffect(() => {
    getPoolData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sportSelected]);

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

      {loading ? <CustomLoader /> : <PoolTable poolData={poolData} />}
    </Flex>
  );
};

export default ViewSportPools;
