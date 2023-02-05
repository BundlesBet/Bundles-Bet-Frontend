import { Box, Flex } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import CustomLoader from "lib/components/samples/CustomLoader";
import ExploreViewPool from "lib/components/samples/Explore";
import ViewSport from "lib/components/samples/ViewSport";
import PoolTable from "lib/components/table/PoolTable";
import { setSportSelected } from "redux/slices/user";
import type { RootState } from "redux/store";
import { getPoolOfSport } from "utils/apiCalls";
import type { Pool } from "utils/interfaces";

const ViewSportPools = () => {
  const [poolData, setPoolData] = useState<Pool[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const currentSportsName = useRef("");

  const dispatch = useDispatch();
  const sportName = useSelector(
    (state: RootState) => state.user.sportSelected
  ).value;
  const sportSelected = useSelector(
    (state: RootState) => state.user.sportSelected
  );

  const getPoolData = async () => {
    setLoading(true);

    if (sportName) {
      const fetchPoolData = await getPoolOfSport(sportName);
      setPoolData(fetchPoolData.pools);
      currentSportsName.current = sportName;
      setTimeout(() => setLoading(false), 2000);
      return;
    }
    const localStorageSport = localStorage.getItem("selectedSport");
    if (localStorageSport) {
      const sportData = JSON.parse(localStorageSport);
      dispatch(setSportSelected(sportData));
      const fetchPoolData = await getPoolOfSport(sportData.value);
      setPoolData(fetchPoolData.pools);
      currentSportsName.current = sportData.value;
    }

    setTimeout(() => setLoading(false), 2000);
  };

  useEffect(() => {
    if (
      !poolData ||
      !poolData.length ||
      (currentSportsName.current !== sportName && poolData.length)
    ) {
      getPoolData();
    }
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
