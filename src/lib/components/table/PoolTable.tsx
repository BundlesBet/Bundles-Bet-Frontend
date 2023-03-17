import { InfoOutlineIcon } from "@chakra-ui/icons";
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
import { formatInTimeZone } from "date-fns-tz";
import { forwardRef, useState } from "react";
import { MdLeaderboard } from "react-icons/md";
import { TbReportMoney } from "react-icons/tb";

import CustomLink from "../common/CustomLink";
import { uniqueID, urls } from "utils";
import type { Pool } from "utils/interfaces";

interface TableProps {
  poolData: Pool[];
}
const PoolTable = (props: TableProps) => {
  const { poolData } = props;

  const header = [
    "Contest",
    "Entry Fee",
    "Reward Percentage",
    "No. of Entrants",
    "Bet End Time",
    "",
  ];

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
    return <h1 style={{ marginTop: "20px" }}>No Pools To Show</h1>;
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
                    {pool && pool.participants
                      ? pool?.participants?.length
                      : "N/A"}
                  </Td>

                  <Td color="#fff" fontSize="md" fontWeight="hairline">
                    {formatInTimeZone(
                      pool.betEndTime,
                      Intl.DateTimeFormat().resolvedOptions().timeZone,
                      "HH:mm aa, do MMM yyyy"
                    )}
                  </Td>

                  <Td color="#fff" gap={3} fontWeight="hairline" display="flex">
                    <Tooltip
                      hasArrow
                      aria-label="Place Bet"
                      label="Place Bet"
                      placement="right-end"
                    >
                      <div>
                        <CustomLink href={`${urls.viewPool}/${pool.id}`}>
                          <IconButton
                            background="transparent"
                            fontSize="x-large"
                            variant="outline"
                            icon={<TbReportMoney />}
                            aria-label="Pool Matches"
                          />
                        </CustomLink>
                      </div>
                    </Tooltip>

                    <Tooltip
                      hasArrow
                      aria-label="Matches"
                      label="Matches"
                      placement="right-end"
                    >
                      <div>
                        <CustomLink href={`${urls.viewPoolDetails}/${pool.id}`}>
                          <IconButton
                            background="transparent"
                            fontSize="large"
                            variant="outline"
                            icon={<InfoOutlineIcon />}
                            aria-label="Pool Matches"
                          />
                        </CustomLink>
                      </div>
                    </Tooltip>

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
                            fontSize="large"
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
