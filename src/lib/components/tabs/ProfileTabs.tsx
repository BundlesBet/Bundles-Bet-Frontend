import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";

import ProfileLost from "../table/ProfileLost";
import ProfileShowAll from "../table/ProfileShowAll";
import ProfileWon from "../table/ProfileWon";
import type { RootState } from "redux/store";
import { getUserBets } from "utils/apiCalls";
import type { PoolWithBets, UserData } from "utils/interfaces";

const ProfileTabs = () => {
  const userData = useSelector((state: RootState) => state.user)
    .userData as UserData;

  const { address } = useAccount();

  const user = useRef(userData);
  const [loading, setLoading] = useState(true);
  const [wonBets, setWonBets] = useState<PoolWithBets[]>([]);
  const [lostBets, setLostBets] = useState<PoolWithBets[]>([]);
  const [userBetsData, setUserBetsData] = useState<PoolWithBets[]>([]);

  const getUserPoolData = useCallback(async () => {
    if (!user.current || !Object.keys(user.current).length) return;

    const res = await getUserBets(user.current.id);

    setUserBetsData(res?.userBets?.bets);
    if (res?.userBets?.bets.length > 0) {
      const wonArray: PoolWithBets[] = [];
      const lostArray: PoolWithBets[] = [];

      res?.userBets?.bets.forEach((bet: PoolWithBets) => {
        if (bet.status === "WON") {
          wonArray.push(bet);
        } else if (bet.status === "LOST") {
          lostArray.push(bet);
        }
      });

      setWonBets(wonArray);
      setLostBets(lostArray);
    }

    setLoading(false);
  }, [user]);

  useEffect(() => {
    user.current = userData;
    setTimeout(() => getUserPoolData(), 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  useEffect(() => {
    setLoading(true);
    user.current = userData;
    setTimeout(() => getUserPoolData(), 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  if (loading) {
    return (
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        w="full"
      >
        <Heading size="lg"> Loading Bets </Heading>
      </Flex>
    );
  }

  if (userBetsData?.length === 0)
    return (
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        w="full"
      >
        <Heading size="lg"> No Bets Found </Heading>
      </Flex>
    );

  return (
    <Box textAlign="center" w="full">
      <Tabs variant="enclosed">
        <TabList>
          <Tab _selected={{ color: "black", bg: "#0EB634" }}>Show All</Tab>
          <Tab _selected={{ color: "black", bg: "#0EB634" }}>Won</Tab>
          <Tab _selected={{ color: "black", bg: "#0EB634" }}>Lost</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p="0">
            <ProfileShowAll allBetsData={userBetsData} />
          </TabPanel>
          <TabPanel p="0">
            <ProfileWon wonBetsData={wonBets} />
          </TabPanel>
          <TabPanel p="0">
            <ProfileLost lostBetsData={lostBets} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ProfileTabs;
