import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

import LeaderboardTable from "lib/components/table/LeaderBoardTable";

const Leaderboard = () => {
  return (
    <Flex
      direction="column"
      alignItems="flex-end"
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
      <Text fontSize="small" textAlign="center" w="100%">
        * Leaderboard table updates everytime a match in a pool ends. *
      </Text>
      <Flex alignItems="center" justifyContent="center">
        <Button bg="#0EB634" color="#111">
          {" "}
          Claim
        </Button>
      </Flex>
      <LeaderboardTable />
    </Flex>
  );
};

export default Leaderboard;
