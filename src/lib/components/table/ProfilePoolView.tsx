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
import { useRouter } from "next/router";
import { forwardRef, useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// import type { RootState } from "redux/store";
// import { getMatchesOfPool, getUserBets } from "utils/apiCalls";
import type { ESPNMatch } from "utils/interfaces";

const ProfilePoolTable = () => {
  const header = ["Home Team", "Away Team", "Selected Team"];

  // const [matchData, setMatchData] = useState<ESPNMatch[]>([]);

  const data: ESPNMatch[] = [];
  const [current, setCurrent] = useState(1);
  const pageSize = 5;
  const offset = (current - 1) * pageSize;
  const posts = data.length > 0 ? data.slice(offset, offset + pageSize) : [];
  const router = useRouter();
  // const [loader, setLoader] = React.useState(true);

  // const userData = useSelector((state: RootState) => state.user)
  //   .userData as UserData;

  const poolId = parseInt(router.query?.id as string);

  const getUserData = async () => {
    // const userBetsRes = await getUserBets(userData.id);
    // const getMatchData = await getMatchesOfPool(poolId);
    // console.log(userBetsRes.userBets.bets)
    // userBetsRes.userBets.bets.forEach((match: ESPNMatch) => {
    //   const bet = userBetsRes?.userBets?.bets.teamSelections.find(
    //     (bet: Bet) => {
    //       console.log(bet.teamSelections.match, match.espnMatchId);
    //       return bet.teamSelections.match === match.espnMatchId;
    //     }
    //   );
    //   console.log(bet);
    //   if (bet) {
    //     data.push({
    //       homeTeam: match.teamA.abbreviation,
    //       awayTeam: match.teamB.abbreviation,
    //       selectedTeam:
    //         bet.teamSelections.selection === 0
    //           ? match.teamA.abbreviation
    //           : match.teamB.abbreviation,
    //     });
    //   }
    // setMatchData(data);
    // setLoader(false);
  };

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
    // if (!data || !data?.length) return;

    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolId]);

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
                    {item.home}
                  </Td>
                  <Td color="#fff" fontSize="md" fontWeight="hairline">
                    {item.away}
                  </Td>
                  <Td color="#fff" fontSize="md" fontWeight="hairline">
                    {item.selected}
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

export default ProfilePoolTable;
