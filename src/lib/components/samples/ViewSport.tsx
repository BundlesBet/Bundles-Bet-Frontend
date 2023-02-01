import { Flex, Grid, GridItem, Icon, Link, Tooltip } from "@chakra-ui/react";
import NextLink from "next/link";

import { sportsList } from "utils";

const ViewSport = () => {
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
            <GridItem w="100%">
              <Tooltip hasArrow label={sport.sportName}>
                <div>
                  <Link
                    as={NextLink}
                    rel="noopener noreferrer"
                    href={`/viewSportPools/${sport.id}`}
                  >
                    <Icon as={sport.icon} w={20} h={25} />
                  </Link>
                </div>
              </Tooltip>
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </Grid>
  );
};

export default ViewSport;
