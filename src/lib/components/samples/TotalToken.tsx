import { Box, Heading, HStack, Text, VStack, Icon } from "@chakra-ui/react";
import { FaCoins } from "react-icons/fa";

interface TotalTokenTransferredProps {
  totalToken: number;
}
const TotalTokenTransferred = (props: TotalTokenTransferredProps) => {
  const { totalToken } = props;
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
        <Icon boxSize={70} as={FaCoins} color="white" />
        <VStack justifyContent="space-between" alignItems="flex-end">
          <Text fontSize="sm" color="muted" textAlign="end">
            Total Token Transferred
          </Text>
          <Heading size={{ base: "2xl", md: "xl" }} textAlign="end">
            {totalToken}
          </Heading>
        </VStack>
      </HStack>
    </Box>
  );
};

export default TotalTokenTransferred;
