import { Box, Heading, HStack, Text, VStack, Icon } from "@chakra-ui/react";
import { FaCoins } from "react-icons/fa";

const TotalTokenTransferred = () => {
  return (
    <Box
      px={{ base: "4", md: "6" }}
      py={{ base: "5", md: "6" }}
      bg="#1C1C26"
      borderRadius="4px"
      boxShadow="sm"
      w="full"
    >
      <HStack justifyContent="space-between">
        <Icon boxSize={15} as={FaCoins} color="white" />
        <VStack justifyContent="space-between" alignItems="center">
          <Text fontSize="sm" color="muted" textAlign="end">
            Total Token Transferred
          </Text>
          <Heading size={{ base: "2xl", md: "xl" }} textAlign="end">
            1424
          </Heading>
        </VStack>
      </HStack>
    </Box>
  );
};

export default TotalTokenTransferred;
