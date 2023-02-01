import { Flex, Grid, Heading, Icon, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

import { SportsGrid } from "../common/CommonGrid";
import { setSportSelected } from "redux/slices/user";
import { sportsList } from "utils";
import { getSports } from "utils/apiCalls";
import type { SportsDataInterface } from "utils/interfaces";

import SearchBar from "./SearchBar";

const SportsSelection = () => {
  const selectedSportId = useRef<number>(0);
  const dispatch = useDispatch();

  const updateSelectedNftState = (id: number) => {
    selectedSportId.current = id;

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const sport = sportsList.filter((sport) => sport.id === id)[0];

    const value = {
      id: sport.id,
      sportName: sport.sportName,
      icon: JSON.stringify(sport.icon),
      value: sport.value,
    };

    localStorage.setItem("selectedSport", JSON.stringify(value));
  };

  const fetchSports = async () => {
    const sports: SportsDataInterface = await getSports();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const sportsData = sports.sportsData.items;
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
              as={NextLink}
              rel="noopener noreferrer"
              href={`/viewsportpools/${sport.id}`}
              onClick={() => {
                updateSelectedNftState(sport.id);
                dispatch(
                  setSportSelected({
                    id: sport.id,
                    sportName: sport.sportName,
                    icon: JSON.stringify(sport.icon),
                    value: sport.value,
                  })
                );
              }}
            >
              <div>
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
