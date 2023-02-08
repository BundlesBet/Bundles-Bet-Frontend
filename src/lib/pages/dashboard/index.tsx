import { Flex, Stack, VStack, Text } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
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

  const { isConnected } = useAccount();

  if (!isConnected) {
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
        <Text> Please connect your wallet </Text>
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
