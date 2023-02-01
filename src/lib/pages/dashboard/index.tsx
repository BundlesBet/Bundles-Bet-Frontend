import { Flex } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

import TotalBets from "lib/components/samples/TotalBets";

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
      <TotalBets />
    </Flex>
  );
};

export default Dashboard;
