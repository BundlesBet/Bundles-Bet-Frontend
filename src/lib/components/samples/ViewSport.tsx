import { Flex, Grid, GridItem, Icon, Link, Tooltip } from "@chakra-ui/react";
import NextLink from "next/link";
import { useDispatch } from "react-redux";

import { setSportSelected } from "redux/slices/user";
import { sportsList, uniqueID } from "utils";

const ViewSport = () => {
  const dispatch = useDispatch();

  const updateSelectedNftState = (id: number) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const sport = sportsList.filter((sport) => sport.id === id)[0];

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
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          {sportsList.map((sport) => (
            <GridItem w="100%" key={uniqueID()}>
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
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </Grid>
  );
};

export default ViewSport;
