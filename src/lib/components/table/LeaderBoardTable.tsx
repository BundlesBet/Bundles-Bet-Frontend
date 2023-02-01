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
} from "@chakra-ui/react";
import Pagination from "@choc-ui/paginator";
import React, { forwardRef } from "react";

// interface TableProps {
//   //   poolData: any;
// }
const LeaderboardTable = () => {
  //   const { poolData } = props;

  const header = ["User", "Position", "Win Percentage", "Prize"];

  const data = [
    { name: "Sourabh", position: 1, winPercentage: 50, prize: "1000" },
    { name: "Jay", position: 2, winPercentage: 30, prize: "700" },
    { name: "Anshuman", position: 3, winPercentage: 20, prize: "500" },
    { name: "Shubham", position: 4, winPercentage: 10, prize: "400" },
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
            {posts.map((pool: any, index: any) => {
              return (
                <Tr key={index}>
                  <Td color="#fff" fontSize="md" fontWeight="hairline">
                    {pool.name}
                  </Td>
                  <Td color="#fff" fontSize="md" fontWeight="hairline">
                    {pool.position}
                  </Td>
                  <Td color="#fff" fontSize="md" fontWeight="hairline">
                    {pool.winPercentage}
                  </Td>

                  <Td color="#fff" fontSize="md" fontWeight="hairline">
                    {pool.prize}
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
