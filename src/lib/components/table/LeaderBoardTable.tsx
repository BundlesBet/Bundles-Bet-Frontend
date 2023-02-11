import {
  Table,
  Text,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
  Button,
  TableCaption,
  TableContainer,
  VStack,
} from "@chakra-ui/react";
import Pagination from "@choc-ui/paginator";
import { forwardRef, useState } from "react";

import { uniqueID } from "utils";
import type { LeaderBoard } from "utils/interfaces";

interface Props {
  leaderboardData: LeaderBoard | null;
}

const LeaderboardTable = ({ leaderboardData }: Props) => {
  const header = ["User", "Position", "Accuracy", "Reward"];

  const [current, setCurrent] = useState(1);

  const pageSize = 5;
  const offset = (current - 1) * pageSize;
  const posts =
    leaderboardData?.predictionAccuracy.length === 0
      ? []
      : leaderboardData?.predictionAccuracy.slice(offset, offset + pageSize);

  // eslint-disable-next-line react/no-unstable-nested-components, @typescript-eslint/no-explicit-any
  const Prev = forwardRef((props, ref: any) => {
    return (
      <Button ref={ref} {...props}>
        Prev
      </Button>
    );
  });
  // eslint-disable-next-line react/no-unstable-nested-components, @typescript-eslint/no-explicit-any
  const Next = forwardRef((props, ref: any) => {
    return (
      <Button ref={ref} {...props}>
        Next
      </Button>
    );
  });

  // eslint-disable-next-line consistent-return, @typescript-eslint/no-explicit-any
  const itemRender: any = (_: any, type: string) => {
    if (type === "prev") {
      return Prev;
    }
    if (type === "next") {
      return Next;
    }
  };

  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      {posts && posts?.length ? (
        <TableContainer w="full">
          <Table w="full" bg="#1C1C26">
            <TableCaption>
              <VStack gap={4}>
                <Pagination
                  current={current}
                  onChange={(page: number | undefined) => setCurrent(page || 1)}
                  pageSize={pageSize}
                  total={leaderboardData?.predictionAccuracy.length}
                  itemRender={itemRender}
                  paginationProps={{
                    display: "flex",
                    pos: "absolute",
                    left: "50%",
                    marginTop: "20px",
                    transform: "translateX(-50%)",
                  }}
                  focusRing="#0EB634"
                  baseStyles={{
                    bg: "#0EB634",
                    color: "#000",
                  }}
                  activeStyles={{
                    bg: "#fff",
                    color: "#000",
                  }}
                  hoverStyles={{
                    bg: "green.300",
                  }}
                />
              </VStack>
            </TableCaption>
            <Thead>
              <Tr>
                {header.map((x) => (
                  <Th key={x}>{x}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {posts &&
                posts?.length &&
                posts.map((post, index: number) => {
                  return (
                    <Tr key={uniqueID()}>
                      <Td color="#fff" fontSize="md" fontWeight="hairline">
                        {post.user.name}
                      </Td>
                      <Td color="#fff" fontSize="md" fontWeight="hairline">
                        {leaderboardData?.positions[index].position}
                      </Td>
                      <Td color="#fff" fontSize="md" fontWeight="hairline">
                        {leaderboardData?.predictionAccuracy[index].accuracy}
                      </Td>

                      <Td color="#fff" fontSize="md" fontWeight="hairline">
                        {leaderboardData?.rewards[index].reward}
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Text fontSize="3xl" align="center">
          No Participants to show
        </Text>
      )}
    </Flex>
  );
};

export default LeaderboardTable;
