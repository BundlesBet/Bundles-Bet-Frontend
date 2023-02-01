import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import ActiveTable from "../table/ActiveTable";
import type { RootState } from "redux/store";

const MatchesTabs = () => {
  const matchData = useSelector((state: RootState) => state.betting).poolData;
  return (
    <Box textAlign="center" w="full">
      <Tabs variant="unstyled">
        <TabList>
          <Tab _selected={{ color: "black", bg: "#00ffc2" }}>Active</Tab>
          {/* <Tab _selected={{ color: "black", bg: "#00ffc2" }}>UnActive</Tab> */}
        </TabList>
        <TabPanels>
          <TabPanel>
            <ActiveTable matchData={matchData} />
          </TabPanel>
          {/* <TabPanel>
            <ActiveTable matchData={matchData} />
          </TabPanel> */}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default MatchesTabs;
