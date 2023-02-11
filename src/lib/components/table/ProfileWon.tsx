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
  Heading,
} from "@chakra-ui/react";
import Pagination from "@choc-ui/paginator";
import { formatInTimeZone } from "date-fns-tz";
import React, { forwardRef } from "react";

import CustomLink from "../common/CustomLink";
import { uniqueID } from "utils";
import type { PoolWithBets } from "utils/interfaces";

interface TableProps {
  wonBetsData: PoolWithBets[];
}
const ProfileWon = (props: TableProps) => {
  const { wonBetsData } = props;

  const header = ["Pool Creation Date", "Pool Name", "Bet Amount", "Status"];

  const data = wonBetsData;

  const [current, setCurrent] = React.useState(1);
  const pageSize = 5;
  const offset = (current - 1) * pageSize;
  const posts =
    data && data.length > 0 ? data.slice(offset, offset + pageSize) : [];

  // eslint-disable-next-line react/no-unstable-nested-components, @typescript-eslint/no-explicit-any
  const Prev = forwardRef((forwardprops, ref: any) => {
    return (
      <Button ref={ref} {...props}>
        Prev
      </Button>
    );
  });
  // eslint-disable-next-line react/no-unstable-nested-components, @typescript-eslint/no-explicit-any
  const Next = forwardRef((forwardprops, ref: any) => {
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

  if (wonBetsData.length === 0) {
    return (
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap={4}
        mb={8}
        mt={8}
        w="full"
      >
        <Heading size="xl"> No Bets Found </Heading>
      </Flex>
    );
  }

  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <TableContainer w="full">
        <Table w="full" bg="#1C1C26">
          <TableCaption>
            <Pagination
              current={current}
              onChange={(page: number | undefined) => {
                setCurrent(page || 1);
              }}
              pageSize={pageSize}
              total={data && data.length}
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
            {posts &&
              posts.map((item) => {
                return (
                  <Tr key={uniqueID()}>
                    <Td color="#fff" fontSize="md" fontWeight="hairline">
                      {formatInTimeZone(
                        item.pool.startTime,
                        Intl.DateTimeFormat().resolvedOptions().timeZone,
                        "HH:mm aa, do MMM yyyy"
                      )}
                    </Td>
                    <Td color="#fff" fontSize="md" fontWeight="hairline">
                      <CustomLink href={`/dashboard/poolview/${item.id}`}>
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
