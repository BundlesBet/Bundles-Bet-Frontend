import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
  Button,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import Pagination from "@choc-ui/paginator";
import { useRouter } from "next/router";
import { forwardRef, useEffect, useState } from "react";

import CustomLoader from "../samples/CustomLoader";
import { uniqueID } from "utils";
import { getLeaderboard } from "utils/apiCalls";
import type { LeaderBoard } from "utils/interfaces";

const LeaderboardTable = () => {
  const header = ["User", "Position", "Accuracy", "Reward"];

  const router = useRouter();
  const poolId = parseInt(router.query.id as string);

  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(true);
  const [leaderboardData, setLeaderboardData] = useState<LeaderBoard | null>(
    null
  );

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

  const getLeaderboardData = async () => {
    const leaderboardDataRes = await getLeaderboard(poolId);
    setLeaderboardData(leaderboardDataRes.poolLeaderboard);
    setTimeout(() => setLoading(false), 2000);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (!poolId || (leaderboardData && Object.keys(leaderboardData!).length))
      return;

    getLeaderboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolId]);

  if (loading) return <CustomLoader />;

  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <TableContainer w="full">
        <Table w="full" bg="#1C1C26">
          <TableCaption>
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
                transform: "translateX(-50%)",
              }}
              focusRing="#00ffc2"
              baseStyles={{
                bg: "#00ffc2",
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
    </Flex>
  );
};

export default LeaderboardTable;
