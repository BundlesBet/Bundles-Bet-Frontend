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
import React, { forwardRef } from "react";

import CustomLink from "../common/CustomLink";

// interface TableProps {
//   //   poolData: any;
// }
const ProfileShowAll = () => {
  //   const { poolData } = props;

  const header = ["Pool Creation Date", "Pool Name", "Bet Amount", "Status"];

  const data = [
    { date: "3/1/2023", name: "NFL 1", betAmount: 18, status: "Won" },
    { date: "1/2/2023", name: "NFL 2", betAmount: 54, status: "Lost" },
    { date: "5/1/2023", name: "NFL 3", betAmount: 28, status: "Won" },
    { date: "24/1/2023", name: "NFL 4", betAmount: 80, status: "Won" },
  ];

  //   const data = poolData;
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
            {posts.map((item: any, index: any) => {
              return (
                <Tr key={index}>
                  <Td color="#fff" fontSize="md" fontWeight="hairline">
                    {item.date}
                  </Td>
                  <Td color="#fff" fontSize="md" fontWeight="hairline">
                    <CustomLink href={`/dashboard/poolview/${index}`}>
                      {item.name}
                    </CustomLink>
                  </Td>
                  <Td color="#fff" fontSize="md" fontWeight="hairline">
                    {item.betAmount}
                  </Td>

                  <Td color="#fff" fontSize="md" fontWeight="hairline">
                    <Tag
                      size="lg"
                      key="lg"
                      variant="solid"
                      bg={item.status === "Won" ? "#0EB634" : "#ff0000"}
                      color={item.status === "Won" ? "#000" : "#fff"}
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

export default ProfileShowAll;
