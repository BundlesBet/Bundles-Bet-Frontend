import { Flex, Stack, VStack, Text } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";

import TotalBets from "lib/components/samples/TotalBets";
import TotalTokenTransferred from "lib/components/samples/TotalToken";
import ProfileTabs from "lib/components/tabs/ProfileTabs";
import type { RootState } from "redux/store";
import type { UserData } from "utils/interfaces";

const Dashboard = () => {
  const userData = useSelector((state: RootState) => state.user)
    .userData as UserData;

  const { address, isConnected } = useAccount();

  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      setRegistered(true);
    } else {
      setRegistered(false);
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, userData]);

  if (loading) {
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
        <Text> Loading Data </Text>
      </Flex>
    );
  }

  if (!isConnected) {
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
        <Text> Please connect your wallet </Text>
      </Flex>
    );
  }

  if (registered === false) {
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
        <Text> Please register before continuing </Text>
      </Flex>
    );
  }

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
      <NextSeo title="Dashboard" />
      <Stack
        direction={{ md: "row", base: "column" }}
        justifyContent="space-between"
        alignItems="flex-start"
        w="full"
        gap={2}
      >
        <VStack gap={8} w={{ md: "30%", sm: "full" }}>
          <TotalBets totalBets={userData.totalPoolsParticipated} />
          <TotalTokenTransferred totalToken={userData.totalRewardsEarned} />
        </VStack>

        <ProfileTabs />
      </Stack>
    </Flex>
  );
};

export default Dashboard;
