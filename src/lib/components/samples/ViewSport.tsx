import { Flex, Grid, Icon, Link, Tooltip } from "@chakra-ui/react";
import NextLink from "next/link";
import { useDispatch } from "react-redux";

import { SportsGrid } from "../common/CommonGrid";
import { setSportSelected } from "redux/slices/user";
import { sportsList, uniqueID } from "utils";

const ViewSport = () => {
  const dispatch = useDispatch();

  const updateSelectedNftState = (id: number) => {
    const sport = sportsList.filter((s) => s.id === id)[0];

    const value = {
      id: sport.id,
      sportName: sport.sportName,
      icon: JSON.stringify(sport.icon),
      value: sport.value,
    };

    dispatch(setSportSelected(value));

    localStorage.setItem("selectedSport", JSON.stringify(value));
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
              as={NextLink}
              // rel="noopener noreferrer"
              href={`/viewSportPools/${sport.id}`}
            >
              <Tooltip hasArrow label={sport.sportName}>
                <div onClick={() => updateSelectedNftState(sport.id)}>
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
