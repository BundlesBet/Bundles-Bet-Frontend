import { Box, Heading, HStack, Text, VStack, Icon } from "@chakra-ui/react";
import { AiFillTrophy } from "react-icons/ai";

interface TotalBetsProps {
  totalBets: number;
}

const TotalBets = (props: TotalBetsProps) => {
  const { totalBets } = props;

  return (
    <Box
      px={{ base: "4", md: "6" }}
      py={{ base: "5", md: "6" }}
      bg="#1C1C26"
      borderRadius="4px"
      boxShadow="md"
      w="full"
    >
      <HStack justifyContent="space-between">
        <Icon boxSize={70} as={AiFillTrophy} color="white" />
        <VStack justifyContent="space-between" alignItems="flex-end">
          <Text fontSize="sm" color="muted" textAlign="end">
            Total Bets Participation
          </Text>
          <Heading size={{ base: "2xl", md: "xl" }} textAlign="end">
            {totalBets}
          </Heading>
        </VStack>
      </HStack>
    </Box>
  );
};

export default TotalBets;
