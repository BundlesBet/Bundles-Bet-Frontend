import { Box, Flex, Heading } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

import LeaderboardTable from "lib/components/table/LeaderBoardTable";

const Leaderboard = () => {
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
      <Box bg="#1C1C26" w="100%" p={4} textAlign="center">
        <Heading color="white" size="2xl">
          {" "}
          Leaderboard
        </Heading>
      </Box>
      <LeaderboardTable />
    </Flex>
  );
};

export default Leaderboard;
