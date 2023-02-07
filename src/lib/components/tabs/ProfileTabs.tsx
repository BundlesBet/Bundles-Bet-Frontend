/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

import ProfileLost from "../table/ProfileLost";
import ProfileShowAll from "../table/ProfileShowAll";
import ProfileWon from "../table/ProfileWon";
import type { RootState } from "redux/store";
import { getUserBets } from "utils/apiCalls";
import type { PoolWithMatches, UserData } from "utils/interfaces";

const ProfileTabs = () => {
  const userData = useSelector((state: RootState) => state.user)
    .userData as UserData;
  // const toast = useToast();
  const [userBetsData, setUserBetsData] = useState<PoolWithMatches[]>([]);

  const getUserPoolData = useCallback(async () => {
    if (userData.id === 0) return;

    const res = await getUserBets(userData.id);

    setUserBetsData(res.userBets.bets);
  }, [userData.id]);

  useEffect(() => {
    getUserPoolData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (userBetsData?.length === 0)
    return (
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
        gap={4}
        mb={8}
        w="full"
      >
        <Heading size="2xl"> No Bets Found </Heading>
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
            <ProfileShowAll poolData={userBetsData} />
          </TabPanel>
          <TabPanel p="0">
            <ProfileWon poolData={userBetsData} />
          </TabPanel>
          <TabPanel p="0">
            <ProfileLost />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ProfileTabs;
