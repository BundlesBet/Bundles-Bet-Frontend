import {
  Box,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { AiFillTrophy } from "react-icons/ai";

const TotalBets = () => {
  return (
    <Box
      px={{ base: "4", md: "6" }}
      py={{ base: "5", md: "6" }}
      bg="#1C1C26"
      borderRadius="4px"
      boxShadow="sm"
    >
      <HStack justifyContent="space-between">
        <Icon boxSize={15} as={AiFillTrophy} color="white" />
        <VStack justifyContent="space-between" alignItems="center">
          <Text fontSize="sm" color="muted" textAlign="end">
            Total Bets Participation
          </Text>
          <Heading size={{ base: "2xl", md: "xl" }} textAlign="end">
            12
          </Heading>
        </VStack>
      </HStack>
    </Box>
  );
};

export default TotalBets;
