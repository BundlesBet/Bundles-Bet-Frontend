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
  Stack,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import Pagination from "@choc-ui/paginator";
import { useRouter } from "next/router";
import { useEffect, useState, forwardRef } from "react";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";

import { BetPlaced } from "../modals/BetPlaced";
import { ConfirmBetModal } from "../modals/ConfirmBetModal";
import CustomLoader from "../samples/CustomLoader";
import type { RootState } from "redux/store";
import { uniqueID } from "utils";
import { getUserBets } from "utils/apiCalls";
import type { Bet, ESPNMatch, UserData } from "utils/interfaces";

interface TableProps {
  matchData: ESPNMatch[];
}
const ActiveTable = (props: TableProps) => {
  const { matchData: data } = props;

  const router = useRouter();
  const { isConnected } = useAccount();

  const poolId = parseInt(router.query?.id as string);

  const [current, setCurrent] = useState(1);
  const [loader, setLoader] = useState(true);
  const [selectCount, setSelectCount] = useState(0);
  const [allowedToBet, setAllowedToBet] = useState(true);
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [selectTeams, setSelectTeams] = useState<
    Array<{ match: number; selection: number }>
  >([]);

  const userData = useSelector((state: RootState) => state.user)
    .userData as UserData;

  const pageSize = 20;
  const offset = (current - 1) * pageSize;
  const posts = data.length > 0 ? data.slice(offset, offset + pageSize) : [];

  const header = ["Match Name", "Home Team", "Away Team", "Selected Team"];

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

  const getUserData = async () => {
    const userBetsRes = await getUserBets(userData.id);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bettingData = (userBetsRes?.userBets?.bets as [])?.find(
      (bet: Bet) => {
        return bet.poolId === poolId && bet.status !== "CANCELLED";
      }
    );

    if (bettingData && Object.keys(bettingData).length) {
      setAllowedToBet(false);
    }

    setLoader(false);
  };

  useEffect(() => {
    if (!data || !data?.length) return;

    const newTeamArr = [];

    for (let i = 0; i < data.length; i += 1) {
      newTeamArr.push({ match: 0, selection: -2 });
    }

    setSelectTeams(newTeamArr);

    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleConfirmTransaction = () => {
    setTransactionSuccess(true);
  };

  const handleSelectTeam = (rowId: number, id: number, selection: number) => {
    if (selectTeams[rowId].selection === -2) {
      setSelectCount(selectCount + 1);
    }

    const updateState = selectTeams;
    updateState[rowId] = { match: id, selection };

    setSelectTeams([...updateState]);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  const tooltipLabel = () => {
    if (!allowedToBet) {
      return "Bet already placed";
    }
    if (!isConnected) {
      return "Connect Wallet";
    }
    if (selectCount !== data.length) {
      return "Please Select Teams";
    }
    return "";
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

  if (loader) return <CustomLoader />;

  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <TableContainer w="full">
        <Table w="full" bg="#1C1C26">
          <TableCaption>
            <Stack direction="column" alignItems=" center" spacing="20">
              <Tooltip hasArrow label={tooltipLabel()}>
                <Button
                  isDisabled={
                    // eslint-disable-next-line no-unneeded-ternary
                    !isConnected || selectCount !== data.length || !allowedToBet
                      ? true
                      : false
                  }
                  size="lg"
                  bg="#0EB634"
                  color="#111"
                  onClick={onOpen}
                >
                  Bet Now
                </Button>
              </Tooltip>
              <Pagination
                current={current}
                onChange={(page: number | undefined) => setCurrent(page || 1)}
                pageSize={pageSize}
                total={data.length}
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
            </Stack>
          </TableCaption>
          <Thead>
            <Tr>
              {header.map((x) => (
                <Th key={x}>{x}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {posts.map((match, index: number) => {
              return (
                <Tr key={uniqueID()}>
                  <Td color="#fff" fontSize="md" fontWeight="hairline">
                    {match.name}
                  </Td>
                  <Td color="#fff" fontSize="md" fontWeight="hairline">
                    <Button
                      onClick={() =>
                        handleSelectTeam(index, match.espnMatchId, 0)
                      }
                      border={
                        selectTeams[index]?.selection === 0
                          ? "2px solid #00FFC2"
                          : ""
                      }
                    >
                      {match.teamA.abbreviation}
                    </Button>
                  </Td>
                  <Td color="#fff" fontSize="md" fontWeight="hairline">
                    <Button
                      border={
                        selectTeams[index]?.selection === 1
                          ? "2px solid #00FFC2"
                          : ""
                      }
                      onClick={() =>
                        handleSelectTeam(index, match.espnMatchId, 1)
                      }
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
      <ConfirmBetModal
        teamsSelected={selectTeams}
        isOpen={isOpen}
        close={onClose}
        handleConfirm={handleConfirmTransaction}
      />
      <BetPlaced
        isOpen={transactionSuccess}
        close={() => setTransactionSuccess(false)}
      />
    </Flex>
  );
};

export default ActiveTable;
