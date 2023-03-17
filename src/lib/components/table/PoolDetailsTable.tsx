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
import { forwardRef, useState } from "react";

import { getMatchOutcomes, uniqueID } from "utils";
import type { ESPNMatch } from "utils/interfaces";

interface Props {
  betMatches: ESPNMatch[];
}

const PoolDetailsTable = ({ betMatches }: Props) => {
  const header = ["Home Team", "Away Team", "Match Outcome"];

  const [current, setCurrent] = useState(1);

  const pageSize = 5;
  const offset = (current - 1) * pageSize;
  const posts =
    betMatches && betMatches.length === 0
      ? []
      : betMatches.slice(offset, offset + pageSize);

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
      <TableContainer w="full">
        <Table w="full" bg="#1C1C26">
          <TableCaption>
            <Pagination
              current={current}
              onChange={(page: number | undefined) => setCurrent(page || 1)}
              pageSize={pageSize}
              total={betMatches.length}
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
            {posts.map((item: ESPNMatch) => {
              return (
                <Tr key={uniqueID()}>
                  <Td color="#fff" fontSize="md" fontWeight="hairline">
                    {item.teamA.name}
                  </Td>
                  <Td color="#fff" fontSize="md" fontWeight="hairline">
                    {item.teamB.name}
                  </Td>
                  <Td color="#fff" fontSize="md" fontWeight="hairline">
                    {getMatchOutcomes(
                      item.outcome,
                      item.teamA.name,
                      item.teamB.name
                    )}
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

export default PoolDetailsTable;
