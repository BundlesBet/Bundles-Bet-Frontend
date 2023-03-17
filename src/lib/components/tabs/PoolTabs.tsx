/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Box,
  // Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  // useDisclosure,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { SelectSportModal } from "../modals/SelectSportModal";
import CustomLoader from "../samples/CustomLoader";
import PoolTable from "../table/PoolTable";
import {
  setLeagueName,
  setSportLeagues,
  setSportName,
} from "redux/slices/betting";
import { setSportSelected } from "redux/slices/user";
import type { RootState } from "redux/store";
import { sportsList } from "utils";
import {
  fetchLeagues,
  fetchSportLeagueData,
  getPoolOfSport,
} from "utils/apiCalls";
import type { Pool } from "utils/interfaces";

const PoolTabs = () => {
  const prevTabIndex = useRef(0);
  const currentSportsName = useRef("");
  const currentLeagueName = useRef("");
  const [tabIndex, setTabIndex] = useState(0);
  const [poolData, setPoolData] = useState<Pool[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const sportName = useSelector(
    (state: RootState) => state.user.sportSelected
  ).value;
  const leagueName = useSelector(
    (state: RootState) => state.betting.leagueName
  );
  const leagueSportName = useSelector(
    (state: RootState) => state.betting.sportName
  );
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

    if (sportName && leagueName) {
      const fetchPoolData = await getPoolOfSport(
        sportName,
        leagueName,
        StatusValue()
      );
      setPoolData(fetchPoolData.pools);
      currentSportsName.current = sportName;
      currentLeagueName.current = leagueName;
      // onClose();
      setTimeout(() => setLoading(false), 2000);
    }

    // const localStorageSport = localStorage.getItem("selectedSport");
    // if (localStorageSport) {
    //   const sportData = JSON.parse(localStorageSport);
    //   dispatch(setSportSelected(sportData));
    //   const fetchPoolData = await getPoolOfSport(
    //     sportData.value,
    //     StatusValue()
    //   );
    //   setPoolData(fetchPoolData.pools);
    //   currentSportsName.current = sportData.value;
    //   onClose();
    //   setTimeout(() => setLoading(false), 2000);
    //   return;
    // }
  };

  const getInitialValues = async () => {
    try {
      const response: {
        error: boolean;
        sport: string | null;
        league: string | null;
      } = await fetchSportLeagueData();

      if (response.error) {
        setLoading(false);
        return;
      }

      const sport = sportsList.find((list) => list.value === response.sport)!;

      const value = {
        id: sport.id,
        sportName: sport.sportName,
        icon: sport.icon.toString(),
        value: sport.value,
      };

      dispatch(setSportSelected(value));

      const leagueData = await fetchLeagues(response.sport!);

      dispatch(setSportName(leagueData.name));

      dispatch(setLeagueName(response.league!));
      dispatch(setSportLeagues(leagueData.leagues.items));

      localStorage.setItem("selectedSport", JSON.stringify(value));
      localStorage.setItem("selectedLeague", JSON.stringify(response.league));

      const fetchPoolData = await getPoolOfSport(
        response.sport!,
        response.league!,
        StatusValue()
      );

      setPoolData(fetchPoolData.pools);

      currentSportsName.current = response.sport!;
      currentLeagueName.current = response.league!;

      // onClose();
      setTimeout(() => setLoading(false), 2000);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const selectSportLeagueComp = () => {
    return (
      // <Stack display="flex" justifyContent="center" alignItems="center">
      //   Select Sport and league
      // </Stack>
      <h1 style={{ marginTop: "20px" }}> Select Sport and league</h1>
    );
  };

  const renderComp = () => {
    if (loading) return <CustomLoader />;
    if (!sportName && !leagueName) return selectSportLeagueComp();
    return <PoolTable poolData={poolData} />;
  };

  useEffect(() => {
    if (sportName && leagueName) return;
    getInitialValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      !poolData ||
      poolData.length === 0 ||
      (currentSportsName.current !== sportName && poolData.length) ||
      (currentLeagueName.current !== leagueName && poolData.length) ||
      (prevTabIndex.current !== tabIndex && poolData.length) ||
      sportName === leagueSportName
    ) {
      getPoolData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sportSelected, tabIndex, leagueName]);

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
          <Tab _selected={{ color: "black", bg: "#0EB634" }}>Inactive</Tab>
          <Tab _selected={{ color: "black", bg: "#0EB634" }}>Upcoming</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p="0">{renderComp()}</TabPanel>
          <TabPanel p="0">{renderComp()}</TabPanel>
          <TabPanel p="0">{renderComp()}</TabPanel>
        </TabPanels>
      </Tabs>
      {/* <SelectSportModal isOpen={isOpen} close={onClose} /> */}
    </Box>
  );
};

export default PoolTabs;
