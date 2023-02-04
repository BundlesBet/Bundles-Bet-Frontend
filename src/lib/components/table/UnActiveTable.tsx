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
import React, { useEffect, useState, forwardRef } from "react";

import { uniqueID } from "utils";
import type { Pool } from "utils/interfaces";

interface TableProps {
  matchData: Pool;
}
const UnActiveTable = (props: TableProps) => {
  const { matchData } = props;

  const header = ["Match Name", "Home Team", "Away Team", "Selected Team"];
  const [selectTeams, setSelectTeams] = useState<
    Array<{ match: number; selection: number }>
  >([]);
  const [selectCount, setSelectCount] = useState(0);
  // const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [, setLoader] = useState(true);
  const data = matchData.matches;
  const [current, setCurrent] = React.useState(1);
  const pageSize = 5;
  const offset = (current - 1) * pageSize;
  const posts =
    data?.length === 0 ? [] : data?.slice(offset, offset + pageSize);

  // eslint-disable-next-line react/no-unstable-nested-components, @typescript-eslint/no-explicit-any
  const Prev = forwardRef((prevprops, ref: any) => {
    return (
      <Button ref={ref} {...prevprops}>
        Prev
      </Button>
    );
  });

  // eslint-disable-next-line react/no-unstable-nested-components, @typescript-eslint/no-explicit-any
  const Next = forwardRef((nextprops, ref: any) => {
    return (
      <Button ref={ref} {...nextprops}>
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

  useEffect(() => {
    if (!data || !data?.length) return;
    const newTeamArr = [];

    for (let i = 0; i < data.length; i += 1) {
      newTeamArr.push({ match: 0, selection: -2 });
    }

    setSelectTeams(newTeamArr);

    setLoader(false);
  }, [data]);

  const handleSelectTeam = (rowId: number, id: number, selection: number) => {
    if (selectTeams[rowId].selection === -2) {
      setSelectCount(selectCount + 1);
    }

    const updateState = selectTeams;
    updateState[rowId] = { match: id, selection };

    setSelectTeams([...updateState]);
  };

  const selectedTeamText = (index: number, teamA: string, teamB: string) => {
    if (selectTeams[index]?.selection === -2) {
      return "Select a Team";
    }
    if (selectTeams[index]?.selection === 0) {
      return teamA;
    }
    return teamB;
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
              total={data?.length}
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
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {posts?.map((match: any, index: number) => {
              return (
                <Tr key={uniqueID()}>
                  <Td color="#fff" fontSize="md" fontWeight="hairline">
                    {match.name}
                  </Td>
                  <Td color="#fff" fontSize="md" fontWeight="hairline">
                    <Button
                      onClick={() => handleSelectTeam(index, match.id, 0)}
                    >
                      {match.teamA.abbreviation}
                    </Button>
                  </Td>
                  <Td color="#fff" fontSize="md" fontWeight="hairline">
                    <Button
                      onClick={() => handleSelectTeam(index, match.id, 1)}
                    >
                      {match.teamB.abbreviation}
                    </Button>
                  </Td>

                  <Td color="#fff" fontSize="md" fontWeight="hairline">
                    {selectedTeamText(
                      index,
                      match.teamA.abbreviation,
                      match.teamB.abbreviation
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

export default UnActiveTable;
