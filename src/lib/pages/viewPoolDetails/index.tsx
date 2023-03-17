import { Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import CustomLoader from "lib/components/samples/CustomLoader";
import PoolDetailsTable from "lib/components/table/PoolDetailsTable";
import { setPoolsData } from "redux/slices/betting";
import { getMatchesOfPool } from "utils/apiCalls";
import type { BetMatches, ESPNMatch } from "utils/interfaces";

const ViewPoolMatches = () => {
  const router = useRouter();
  const id = parseInt(router.query.id as string, 10);

  const dispatch = useDispatch();

  const [poolName, setPoolName] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [poolMatches, setPoolMatches] = useState<ESPNMatch[]>([]);

  const getMatchData = async () => {
    const {
      error,
      fetchedMatches,
    }: { error: boolean; fetchedMatches: BetMatches } = await getMatchesOfPool(
      id
    );

    if (error) {
      setPoolMatches([]);
      return;
    }

    setPoolName(fetchedMatches.poolName);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setPoolMatches(fetchedMatches.matches);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(setPoolsData(fetchedMatches as any));

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
    if (!poolMatches && !(poolMatches as []).length) {
      return;
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolMatches]);

  if (loading) {
    return (
      <Flex
        direction="row"
        alignItems="center"
        justifyContent="center"
        w="full"
        minHeight="70vh"
        gap={4}
      >
        <CustomLoader />
        <Heading size="md" mt="1rem">
          Loading Data
        </Heading>
      </Flex>
    );
  }

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
      <NextSeo title={poolName} />
      <Heading as="h1" size="2xl">
        {" "}
        {poolName}
      </Heading>
      <PoolDetailsTable betMatches={poolMatches} />
    </Flex>
  );
};

export default ViewPoolMatches;
