/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
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
  Popover,
  PopoverArrow,
  Text,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  ButtonGroup,
  PopoverFooter,
} from "@chakra-ui/react";
import Pagination from "@choc-ui/paginator";
import { formatInTimeZone } from "date-fns-tz";
import React, { forwardRef } from "react";

import CustomLink from "../common/CustomLink";
import { uniqueID } from "utils";
import type { PoolWithMatches } from "utils/interfaces";

interface TableProps {
  poolData: PoolWithMatches[];
}
const ProfileShowAll = (props: TableProps) => {
  const { poolData } = props;

  const header = ["Pool Creation Date", "Pool Name", "Bet Amount", "Status"];

  const data = poolData;

  const [current, setCurrent] = React.useState(1);
  const pageSize = 5;
  const offset = (current - 1) * pageSize;
  const posts = data.length > 0 ? data.slice(offset, offset + pageSize) : [];

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
              onChange={(page: number | undefined) => {
                setCurrent(page || 1);
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
            {posts.map((item) => {
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
                      <Text cursor="pointer">{item.pool.poolName}</Text>
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
                      bg={
                        item.status === "WON"
                          ? "#0EB634"
                          : item.status === "LOST"
                          ? "#ff0000"
                          : "#0EB634"
                      }
                      color={
                        item.status === "WON"
                          ? "#000"
                          : item.status === "LOST"
                          ? "#111"
                          : "#111111"
                      }
                    >
                      {item.status === "WON" || item.status === "LOST" ? (
                        item.status
                      ) : (
                        <Popover>
                          <PopoverTrigger>
                            <Button>
                              {item.status === "NOT_STARTED" ? "Cancel" : ""}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            color="white"
                            bg="#1C1C26"
                            borderColor="blue.800"
                            borderRadius="2xl"
                          >
                            <PopoverHeader fontWeight="semibold">
                              Confirmation
                            </PopoverHeader>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody>
                              Are you sure you want to cancel ?
                            </PopoverBody>
                            <PopoverFooter
                              display="flex"
                              justifyContent="flex-end"
                            >
                              <ButtonGroup size="sm">
                                <Button variant="outline">Cancel</Button>
                                <Button bg="#0EB634" color="#111">
                                  Apply
                                </Button>
                              </ButtonGroup>
                            </PopoverFooter>
                          </PopoverContent>
                        </Popover>
                      )}
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

export default ProfileShowAll;
