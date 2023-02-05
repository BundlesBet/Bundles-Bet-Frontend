/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-array-index-key */
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
import React, { forwardRef } from "react";
import { MdLeaderboard } from "react-icons/md";

import CustomLink from "../common/CustomLink";

interface TableProps {
  poolData: any;
}
const PoolTable = (props: TableProps) => {
  const { poolData } = props;

  const header = ["Contest", "Entry Fee", "Reward Percentage", ""];

  const data = poolData;
  const [current, setCurrent] = React.useState(1);
  const pageSize = 5;
  const offset = (current - 1) * pageSize;
  const posts = data.length > 0 ? data.slice(offset, offset + pageSize) : [];

  const Prev = forwardRef((props, ref: any) => {
    return (
      <Button ref={ref} {...props}>
        Prev
      </Button>
    );
  });
  const Next = forwardRef((props, ref: any) => {
    return (
      <Button ref={ref} {...props}>
        Next
      </Button>
    );
  });

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
      <TableContainer w="full">
        <Table w="full" bg="#1C1C26">
          <TableCaption>
            <Pagination
              current={current}
              onChange={(page: any) => {
                setCurrent(page);
              }}
              pageSize={pageSize}
              total={data.length}
              itemRender={itemRender}
              paginationProps={{
                display: "flex",
                pos: "absolute",
                left: "50%",
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
            {posts.map(
              (
                pool: {
                  id: any;
                  poolName:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | React.ReactFragment
                    | React.ReactPortal
                    | null
                    | undefined;
                  fee:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | React.ReactFragment
                    | React.ReactPortal
                    | null
                    | undefined;
                  rewardPercentage:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | React.ReactFragment
                    | React.ReactPortal
                    | null
                    | undefined;
                },
                index: React.Key | null | undefined
              ) => {
                return (
                  <Tr key={index}>
                    <Td color="#fff" fontSize="md" fontWeight="hairline">
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
              }
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default PoolTable;
