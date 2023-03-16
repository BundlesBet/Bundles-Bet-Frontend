import { Flex, Grid, Heading, Icon, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

import { SportsGrid } from "../common/CommonGrid";
import { setSportSelected } from "redux/slices/user";
import { sportsList, uniqueID } from "utils";
// import { getSports } from "utils/apiCalls";
// import type { SportsDataInterface } from "utils/interfaces";

import SearchBar from "./SportSearchBar";

const SportsSelection = () => {
  const dispatch = useDispatch();

  const selectedSportId = useRef<number>(0);

  const updateSelectedNftState = (id: number) => {
    selectedSportId.current = id;

    const sport = sportsList.filter((s) => s.id === id)[0];

    const value = {
      id: sport.id,
      sportName: sport.sportName,
      icon: sport.icon.toString(),
      value: sport.value,
    };

    dispatch(setSportSelected(value));

    localStorage.setItem("selectedSport", JSON.stringify(value));
  };

  const fetchSports = async () => {
    // const sports: SportsDataInterface = await getSports();
    // const sportsData = sports.sportsData.items;
  };

  useEffect(() => {
    fetchSports();
  }, []);

  return (
    <Grid textAlign="center">
      <Flex
        gap={20}
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Heading color="#0EB634" as="h1" size="2xl">
          Select Sport
        </Heading>
        <SearchBar />
        <SportsGrid>
          {sportsList.map((sport) => (
            <Link
              key={uniqueID()}
              as={NextLink}
              rel="noopener noreferrer"
              href={`/viewsportpools/${sport.id}`}
            >
              <div onClick={() => updateSelectedNftState(sport.id)}>
                <Icon as={sport.icon} w={20} h={25} />
                <Heading color="#0EB634" size="md" cursor="pointer">
                  {sport.sportName}
                </Heading>
              </div>
            </Link>
          ))}
        </SportsGrid>
      </Flex>
    </Grid>
  );
};

export default SportsSelection;
