import { Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import CustomLoader from "lib/components/samples/CustomLoader";
import PoolDetailsMatchesTabs from "lib/components/tabs/PoolDetailsMatchesTabs";
import { setPoolsData } from "redux/slices/betting";
import type { RootState } from "redux/store";
import { getMatchesOfPool } from "utils/apiCalls";
import type { ESPNMatch } from "utils/interfaces";

const ViewPoolMatches = () => {
  const { sportSelected } = useSelector((state: RootState) => state.user);

  const [showSport, setShowSport] = useState(sportSelected);
  const dispatch = useDispatch();
  const router = useRouter();
  const id = parseInt(router.query.id as string, 10);
  const finalMatchData = useRef<ESPNMatch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getMatchData = async () => {
    const fetchMatchData = await getMatchesOfPool(id);

    finalMatchData.current = fetchMatchData.fetchedMatches;

    dispatch(setPoolsData(fetchMatchData.fetchedMatches));

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (!id) return;

    getMatchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (!finalMatchData.current && !(finalMatchData.current as []).length) {
      return;
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalMatchData.current]);

  useEffect(() => {
    const localStorageSport = localStorage.getItem("selectedSport");

    if (Object.keys(sportSelected).length) {
      setShowSport(sportSelected);
    } else if (localStorageSport) {
      setShowSport(JSON.parse(localStorageSport));
    } else {
      setShowSport(sportSelected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="60vh"
      gap={10}
      mb={10}
      w="full"
    >
      <NextSeo title={showSport ? showSport.sportName : "Pool Details"} />
      <Heading as="h1" size="2xl">
        {" "}
        {showSport ? showSport.sportName : "Pool Details"}
      </Heading>
      {loading ? <CustomLoader /> : <PoolDetailsMatchesTabs />}
    </Flex>
  );
};

export default ViewPoolMatches;
