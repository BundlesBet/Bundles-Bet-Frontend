import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SelectSportModal } from "../modals/SelectSportModal";
import CustomLoader from "../samples/CustomLoader";
import PoolTable from "../table/PoolTable";
import { setSportSelected } from "redux/slices/user";
import type { RootState } from "redux/store";
import { getPoolOfSport } from "utils/apiCalls";
import type { Pool } from "utils/interfaces";

const PoolTabs = () => {
  const prevTabIndex = useRef(0);
  const currentSportsName = useRef("");
  const [tabIndex, setTabIndex] = useState(0);
  const [poolData, setPoolData] = useState<Pool[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const sportName = useSelector(
    (state: RootState) => state.user.sportSelected
  ).value;
  const sportSelected = useSelector(
    (state: RootState) => state.user.sportSelected
  );

  const StatusValue = () => {
    if (tabIndex === 0) {
      return "active";
    }
    if (tabIndex === 1) {
      return "inactive";
    }
    if (tabIndex === 2) {
      return "upcoming";
    }
    return "";
  };

  const getPoolData = async () => {
    setLoading(true);

    if (sportName) {
      const fetchPoolData = await getPoolOfSport(sportName, StatusValue());
      setPoolData(fetchPoolData.pools);
      currentSportsName.current = sportName;
      onClose();
      setTimeout(() => setLoading(false), 2000);
      return;
    }
    const localStorageSport = localStorage.getItem("selectedSport");
    if (localStorageSport) {
      const sportData = JSON.parse(localStorageSport);
      dispatch(setSportSelected(sportData));
      const fetchPoolData = await getPoolOfSport(
        sportData.value,
        StatusValue()
      );
      setPoolData(fetchPoolData.pools);
      currentSportsName.current = sportData.value;
      onClose();
      setTimeout(() => setLoading(false), 2000);
      return;
    }
    onOpen();
  };

  useEffect(() => {
    if (
      !poolData ||
      !poolData.length ||
      (currentSportsName.current !== sportName && poolData.length) ||
      (prevTabIndex.current !== tabIndex && poolData.length)
    ) {
      getPoolData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sportSelected, tabIndex]);

  return (
    <Box textAlign="center" w="full">
      <Tabs
        variant="enclosed"
        onChange={(index) => {
          prevTabIndex.current = tabIndex;
          setTabIndex(index);
        }}
      >
        <TabList>
          <Tab _selected={{ color: "black", bg: "#0EB634" }}>Active</Tab>
          <Tab _selected={{ color: "black", bg: "#0EB634" }}>InActive</Tab>
          <Tab _selected={{ color: "black", bg: "#0EB634" }}>Upcoming</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p="0">
            {loading ? <CustomLoader /> : <PoolTable poolData={poolData} />}
          </TabPanel>
          <TabPanel p="0">
            {loading ? <CustomLoader /> : <PoolTable poolData={poolData} />}
          </TabPanel>
          <TabPanel p="0">
            {loading ? <CustomLoader /> : <PoolTable poolData={poolData} />}
          </TabPanel>
        </TabPanels>
      </Tabs>
      <SelectSportModal isOpen={isOpen} close={onClose} />
    </Box>
  );
};

export default PoolTabs;
