import { Box, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

import CustomLoader from "lib/components/samples/CustomLoader";
import ProfilePoolTable from "lib/components/table/ProfilePoolView";
import { getStringOutcome } from "utils";
import { fetchBetMatches } from "utils/apiCalls";
import type { BetMatches, BetMatchesTable } from "utils/interfaces";

const ProfilePoolView = () => {
  const router = useRouter();
  const { id: betId, poolId } = router.query;

  const [loading, setLoading] = useState(true);
  const [poolName, setPoolName] = useState("");
  const [betMatches, setBetMatches] = useState<BetMatchesTable[]>([]);

  const getUserData = async () => {
    const {
      error,
      betMatches: betMatchesData,
    }: { error: boolean; betMatches: BetMatches } = await fetchBetMatches({
      betId,
      poolId,
    });

    if (error) {
      setBetMatches([]);
      return;
    }

    setPoolName(betMatchesData.poolName);

    const finalBetMatches: BetMatchesTable[] = [];

    betMatchesData.matches.forEach((match) => {
      const teamSelection = betMatchesData.teamSelections.find(
        (sel) => sel.match === match.espnMatchId
      );
      const outcome = betMatchesData.outcomesForMatches.find(
        (out) => out.match === match.espnMatchId
      );

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const matchOutcome = getStringOutcome(outcome!.selection!);
      let finalOutcome = "";

      switch (matchOutcome) {
        case "TEAM_A":
          finalOutcome = match.teamA.name;
          break;
        case "TEAM_B":
          finalOutcome = match.teamB.name;
          break;
        case "NOT_STARTED":
          finalOutcome = "NOT STARTED";
          break;
        default:
          finalOutcome = matchOutcome;
          break;
      }

      finalBetMatches.push({
        teamAName: match.teamA.name,
        teamBName: match.teamB.name,
        selection:
          teamSelection?.selection === 0 ? match.teamA.name : match.teamB.name,
        outcome: finalOutcome,
      });
    });

    setBetMatches(finalBetMatches);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (poolId && betId) getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolId, betId]);

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
          {" "}
          Loading Data{" "}
        </Heading>
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      gap={4}
      mb={8}
      w="full"
    >
      <NextSeo title="Leaderboard" />
      <Heading as="h2" size="2xl" mb={8}>
        {" "}
        {poolName}
      </Heading>
      <Box bg="#1C1C26" w="100%" p={4} textAlign="center">
        <Heading color="white" size="lg">
          All Matches
        </Heading>
      </Box>
      <ProfilePoolTable betMatches={betMatches} />
    </Flex>
  );
};

export default ProfilePoolView;
