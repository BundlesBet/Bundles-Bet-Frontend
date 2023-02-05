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
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import Pagination from "@choc-ui/paginator";
import { forwardRef, useState } from "react";
import { MdLeaderboard } from "react-icons/md";

import CustomLink from "../common/CustomLink";
import { uniqueID } from "utils";
import type { Pool } from "utils/interfaces";

interface TableProps {
  poolData: Pool[];
}
const PoolTable = (props: TableProps) => {
  const { poolData } = props;

  const header = ["Contest", "Entry Fee", "Reward Percentage", ""];

  const data = poolData || [];
  const [current, setCurrent] = useState(1);
  const pageSize = 5;
  const offset = (current - 1) * pageSize;
  const posts = data?.length === 0 ? [] : data.slice(offset, offset + pageSize);

  // eslint-disable-next-line react/no-unstable-nested-components, @typescript-eslint/no-explicit-any
  const Prev = forwardRef((forwardprops, ref: any) => {
    return (
      <Button ref={ref} {...forwardprops}>
        Prev
      </Button>
    );
  });
  // eslint-disable-next-line react/no-unstable-nested-components, @typescript-eslint/no-explicit-any
  const Next = forwardRef((forwardprops, ref: any) => {
    return (
      <Button ref={ref} {...forwardprops}>
        Next
      </Button>
    );
  });

  // eslint-disable-next-line consistent-return, @typescript-eslint/no-explicit-any
  const itemRender: any = (_: unknown, type: string) => {
    if (type === "prev") {
      return Prev;
    }
    if (type === "next") {
      return Next;
    }
  };

  if (!poolData || !poolData?.length) {
    return <h1>No pools to show</h1>;
  }

  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <TableContainer w="full">
        <Table w="full" bg="#1C1C26">
          <TableCaption>
            <Pagination
              current={current}
              onChange={(page: number | undefined) => setCurrent(page || 1)}
              pageSize={pageSize}
              total={data.length}
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
            {posts.map((pool) => {
              return (
                <Tr key={uniqueID()}>
                  <Td
                    color="#fff"
                    fontSize="md"
                    cursor="pointer"
                    fontWeight="hairline"
                  >
                    <CustomLink href={`/viewpool/${pool.id}`}>
                      {pool.poolName}
                    </CustomLink>
                  </Td>
                  <Td color="#fff" fontSize="md" fontWeight="hairline">
                    {pool.fee}
                  </Td>
                  <Td color="#fff" fontSize="md" fontWeight="hairline">
                    {pool.rewardPercentage} %
                  </Td>

                  <Td color="#fff" fontSize="md" fontWeight="hairline">
                    <Tooltip
                      hasArrow
                      aria-label="leaderboard"
                      label="Leaderboard"
                      placement="right-end"
                    >
                      <div>
                        <CustomLink href={`/leaderboard/${pool.id}`}>
                          <IconButton
                            colorScheme="red"
                            variant="outline"
                            icon={<MdLeaderboard />}
                            aria-label="Leaderboard"
                          />
                        </CustomLink>
                      </div>
                    </Tooltip>
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

export default PoolTable;
