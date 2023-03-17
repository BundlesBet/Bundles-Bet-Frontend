import { Flex, Grid, Icon, Link, Tooltip } from "@chakra-ui/react";
import NextLink from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { SportsGrid } from "../common/CommonGrid";
import {
  setLeagueName,
  setSportLeagues,
  setSportName,
} from "redux/slices/betting";
import { setSportSelected } from "redux/slices/user";
import type { RootState } from "redux/store";
import { sportsList, uniqueID } from "utils";
import { fetchLeagues } from "utils/apiCalls";

const ViewSport = () => {
  const dispatch = useDispatch();

  const sportSelected = useSelector(
    (state: RootState) => state.user.sportSelected
  ).sportName;

  const updateSelectedNftState = async (id: number) => {
    const sport = sportsList.filter((s) => s.id === id)[0];

    const value = {
      id: sport.id,
      sportName: sport.sportName,
      icon: sport.icon.toString(),
      value: sport.value,
    };

    dispatch(setSportSelected(value));

    localStorage.setItem("selectedSport", JSON.stringify(value));

    const leagueData = await fetchLeagues(sport.value);

    dispatch(setSportName(leagueData.name));
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    dispatch(setLeagueName(leagueData?.leagues?.items?.[0]?.slug));
    dispatch(setSportLeagues(leagueData.leagues.items));
  };

  return (
    <Grid textAlign="center">
      <Flex
        gap={4}
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <SportsGrid key={uniqueID()}>
          {sportsList.map((sport) => (
            <Link
              key={uniqueID()}
              as={NextLink}
              // rel="noopener noreferrer"
              href={`/viewSportPools/${sport.id}`}
            >
              <Tooltip hasArrow label={sport.sportName}>
                <div
                  onClick={() => updateSelectedNftState(sport.id)}
                  style={{
                    borderBottom:
                      sportSelected === sport.sportName
                        ? "2px solid #0EB634"
                        : "none",
                  }}
                >
                  <Icon as={sport.icon} w={20} h={25} />
                </div>
              </Tooltip>
            </Link>
          ))}
        </SportsGrid>
      </Flex>
    </Grid>
  );
};

export default ViewSport;
