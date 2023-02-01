/* eslint-disable no-nested-ternary */
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
import React, { useEffect, useState, forwardRef } from "react";

interface TableProps {
  matchData: any;
}
const UnActiveTable = (props: TableProps) => {
  const { matchData } = props;

  const header = ["Match Name", "Home Team", "Away Team", "Selected Team"];
  const [selectTeams, setSelectTeams] = useState<
    Array<{ match: string; selection: number }>
  >([]);
  const [selectCount, setSelectCount] = useState(0);
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [loader, setLoader] = useState(true);
  const data = matchData.matches;
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

  useEffect(() => {
    if (!data || !data?.length) return;
    const newTeamArr: any = [];

    for (let i = 0; i < data.length; i += 1) {
      newTeamArr.push({ id: 0, selection: -2 });
    }

    setSelectTeams(newTeamArr);

    setLoader(false);
  }, [data]);

  const handleSelectTeam = (rowId: number, id: string, selection: number) => {
    if (selectTeams[rowId].selection === -2) {
      setSelectCount(selectCount + 1);
    }

    const updateState = selectTeams;
    updateState[rowId] = { match: id, selection };

    setSelectTeams([...updateState]);
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
            {posts.map(
              (
                match: {
                  name:
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
                  id: string;
                  teamA: {
                    abbreviation:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | React.ReactFragment
                      | null
                      | undefined;
                  };
                  teamB: {
                    abbreviation:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | React.ReactFragment
                      | null
                      | undefined;
                  };
                },
                index: any
              ) => {
                return (
                  <Tr key={index}>
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
                      {selectTeams[index].selection === -2
                        ? "Select A Team"
                        : selectTeams[index].selection === 0
                        ? match.teamA.abbreviation
                        : match.teamB.abbreviation}
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

export default UnActiveTable;
