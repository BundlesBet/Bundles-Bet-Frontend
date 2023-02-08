/* eslint-disable import/no-extraneous-dependencies */
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
  Tag,
} from "@chakra-ui/react";
import Pagination from "@choc-ui/paginator";
import { formatInTimeZone } from "date-fns-tz";
import React, { forwardRef } from "react";

import CustomLink from "../common/CustomLink";

interface TableProps {
  poolData: any;
}
const ProfileWon = (props: TableProps) => {
  const { poolData } = props;

  const header = ["Pool Creation Date", "Pool Name", "Bet Amount", "Status"];

  const data = poolData;

  //   const data = poolData;
  const [current, setCurrent] = React.useState(1);
  const pageSize = 5;
  const offset = (current - 1) * pageSize;
  const posts =
    data && data.length > 0 ? data.slice(offset, offset + pageSize) : [];

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
              total={data && data.length}
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
            {posts.map((item: any, index: any) => {
              return (
                <Tr key={index}>
                  <Td color="#fff" fontSize="md" fontWeight="hairline">
                    {formatInTimeZone(
                      item.pool.startTime,
                      Intl.DateTimeFormat().resolvedOptions().timeZone,
                      "HH:mm aa, do MMM yyyy"
                    )}
                  </Td>
                  <Td color="#fff" fontSize="md" fontWeight="hairline">
                    <CustomLink href={`/dashboard/poolview/${index}`}>
                      {item.pool.poolName}
                    </CustomLink>
                  </Td>
                  <Td color="#fff" fontSize="md" fontWeight="hairline">
                    {item.pool.totalPoolAmount}
                  </Td>

                  <Td color="#fff" fontSize="md" fontWeight="hairline">
                    <Tag
                      size="lg"
                      key="lg"
                      variant="solid"
                      bg={item.status === "WON" ? "#0EB634" : "#ff0000"}
                      color={item.status === "WON" ? "#000" : "#fff"}
                    >
                      {item.status}
                    </Tag>
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

export default ProfileWon;
