import { Stack, Text } from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setLeagueName } from "redux/slices/betting";
import type { RootState } from "redux/store";
import { uniqueID } from "utils";

export default function App() {
  const dispatch = useDispatch();

  const { sportName } = useSelector(
    (state: RootState) => state.user.sportSelected
  );

  const leagueName = useSelector(
    (state: RootState) => state.betting.leagueName
  );

  const leagueSportName = useSelector(
    (state: RootState) => state.betting.sportName
  );

  const leagues = useSelector((state: RootState) => state.betting.sportLeagues);

  const sportLeagues = useSelector(
    (state: RootState) => state.betting.sportLeagues
  );

  const [value, setValue] = useState("");

  const updateSelectedNftState = (slug: string) => {
    if (sportName !== leagueSportName) return;

    const baseValueLeague = leagues.find((league) => league.slug === slug);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    dispatch(setLeagueName(baseValueLeague ? baseValueLeague.slug : ""));
  };

  useEffect(() => {
    if (!sportName || !leagues || !leagueName) return;

    const baseValueLeague = leagues.find(
      (league) => league.slug === leagueName
    );

    setValue(baseValueLeague ? baseValueLeague.name : "");
  }, [sportName, leagues, leagueName]);

  return (
    <Stack width="100%">
      <Text fontWeight="bold" fontSize="large">
        Leagues
      </Text>
      <AutoComplete
        rollNavigation
        openOnFocus
        suggestWhenEmpty
        listAllValuesOnFocus
      >
        <AutoCompleteInput
          border="0.5px solid #fff"
          placeholder="Select League..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <AutoCompleteList>
          {sportLeagues &&
            sportLeagues.map((league: { name: string; slug: string }) => (
              <AutoCompleteItem
                key={uniqueID()}
                value={league.slug}
                textTransform="capitalize"
                align="center"
                onClick={() => updateSelectedNftState(league.slug)}
              >
                <Text color="#0EB634" ml="4">
                  {league.name}
                </Text>
              </AutoCompleteItem>
            ))}
        </AutoCompleteList>
      </AutoComplete>
    </Stack>
  );
}
