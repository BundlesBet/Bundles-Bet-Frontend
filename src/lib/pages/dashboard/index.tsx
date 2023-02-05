import { Flex, Stack, VStack } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

import TotalBets from "lib/components/samples/TotalBets";
import TotalTokenTransferred from "lib/components/samples/TotalToken";
import ProfileTabs from "lib/components/tabs/ProfileTabs";

const Dashboard = () => {
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
        direction={{ md: "row", sm: "column" }}
        justifyContent="space-between"
        alignItems="center"
        w="full"
        gap={2}
      >
        <VStack gap={8} w={{ md: "30%", sm: "full" }}>
          <TotalBets />
          <TotalTokenTransferred />
        </VStack>

        <ProfileTabs />
      </Stack>
    </Flex>
  );
};

export default Dashboard;
