import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import ProfileLost from "../table/ProfileLost";
import ProfileShowAll from "../table/ProfileShowAll";
import ProfileWon from "../table/ProfileWon";

const ProfileTabs = () => {
  return (
    <Box textAlign="center" w="full">
      <Tabs variant="unstyled">
        <TabList>
          <Tab _selected={{ color: "black", bg: "#0EB634" }}>Show All</Tab>
          <Tab _selected={{ color: "black", bg: "#0EB634" }}>Won</Tab>
          <Tab _selected={{ color: "black", bg: "#0EB634" }}>Lost</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ProfileShowAll />
          </TabPanel>
          <TabPanel>
            <ProfileWon />
          </TabPanel>
          <TabPanel>
            <ProfileLost />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ProfileTabs;
