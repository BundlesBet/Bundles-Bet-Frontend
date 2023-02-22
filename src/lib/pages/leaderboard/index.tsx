import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";
import { readContract } from "wagmi/actions";

import { contractDetails } from "config";
import ClaimButton from "lib/components/samples/ClaimButon";
import CustomLoader from "lib/components/samples/CustomLoader";
import LeaderboardTable from "lib/components/table/LeaderBoardTable";
import type { RootState } from "redux/store";
import { getLeaderboard, getMatchesOfPool } from "utils/apiCalls";
import type { LeaderBoard, UserData } from "utils/interfaces";

const Leaderboard = () => {
  const router = useRouter();
  const { address } = useAccount();
  const poolId = parseInt(router.query.id as string);
  const { userData } = useSelector((state: RootState) => state.user);

  const [loading, setLoading] = useState(true);
  const [showClaimButton, setShowClaimButton] = useState<boolean>(false);
  const [leaderboardData, setLeaderboardData] = useState<LeaderBoard | null>(
    null
  );
  const [hasClaimedRewards, setHasClaimedRewards] = useState(false);

  const getLeaderboardData = async () => {
    const leaderboardDataRes = await getLeaderboard(poolId);
    setLeaderboardData(leaderboardDataRes.poolLeaderboard);
    const poolData = await getMatchesOfPool(poolId);
    setShowClaimButton(poolData.fetchedMatches.poolEnded);

    if (!address) {
      setHasClaimedRewards(false);

      setTimeout(() => setLoading(false), 2000);

      return;
    }

    const hasClaimed = (await readContract({
      address: contractDetails.betting.address,
      abi: contractDetails.betting.abi,
      chainId: contractDetails.betting.chainId,
      functionName: "hasClaimedRewards",
      args: [address, poolId],
    })) as boolean;
    setHasClaimedRewards(hasClaimed);

    setTimeout(() => setLoading(false), 2000);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (!poolId || (leaderboardData && Object.keys(leaderboardData!).length))
      return;

    getLeaderboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolId]);

  if (loading)
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
        <CustomLoader />
      </Flex>
    );

  return (
    <Flex
      direction="column"
      alignItems="flex-end"
      justifyContent="center"
      minHeight="60vh"
      gap={4}
      mb={8}
      w="full"
    >
      <NextSeo title="Leaderboard" />

      {leaderboardData?.rewards.some(
        (reward) => reward.user.id === (userData as UserData).id
      ) && (
        <ClaimButton
          userId={(userData as UserData).id}
          showClaimButton={showClaimButton}
          reward={
            leaderboardData?.rewards.find(
              (reward) => reward.user.id === (userData as UserData).id
            )?.reward || 0
          }
          containsReward={
            leaderboardData?.rewards.some(
              (reward) =>
                reward.user.id === (userData as UserData).id &&
                reward.reward > 0
            ) || false
          }
          hasClaimedRewards={hasClaimedRewards}
        />
      )}

      <Box bg="#1C1C26" w="100%" p={4} textAlign="center">
        <Heading color="white" size="2xl">
          {" "}
          Leaderboard
        </Heading>
      </Box>
      <Text fontSize="small" textAlign="center" w="100%">
        * Leaderboard table updates everytime a match in a pool ends. *
      </Text>
      <LeaderboardTable leaderboardData={leaderboardData} />
    </Flex>
  );
};

export default Leaderboard;
