import { Icon, Stack, Text } from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setLeagueName,
  setSportLeagues,
  setSportName,
} from "redux/slices/betting";
import { setSportSelected } from "redux/slices/user";
import type { RootState } from "redux/store";
import { sportsList, uniqueID } from "utils";
import { fetchLeagues } from "utils/apiCalls";

export default function App() {
  const dispatch = useDispatch();

  const sportSelected = useSelector(
    (state: RootState) => state.user.sportSelected
  );

  const [value, setValue] = useState(sportSelected.sportName);

  const updateSelectedNftState = async (id: number) => {
    const sport = sportsList.filter((s) => s.id === id)[0];

    const val = {
      id: sport.id,
      sportName: sport.sportName,
      icon: sport.icon.toString(),
      value: sport.value,
    };

    dispatch(setSportSelected(val));

    localStorage.setItem("selectedSport", JSON.stringify(value));

    const leagueData = await fetchLeagues(sport.value);

    dispatch(setSportName(leagueData.name));
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    dispatch(setLeagueName(leagueData?.leagues?.items?.[0]?.slug));
    dispatch(setSportLeagues(leagueData.leagues.items));
  };

  useEffect(() => {
    if (!sportSelected) return;
    setValue(sportSelected.sportName);
  }, [sportSelected]);

  return (
    <Stack width="100%">
      <Text fontWeight="bold" fontSize="large">
        Sports
      </Text>
      <AutoComplete
        rollNavigation
        openOnFocus
        suggestWhenEmpty
        listAllValuesOnFocus
      >
        <AutoCompleteInput
          border="0.5px solid #fff"
          placeholder="Select Sport..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <AutoCompleteList>
          {sportsList.map((sport) => (
            <AutoCompleteItem
              key={uniqueID()}
              value={sport.sportName}
              textTransform="capitalize"
              align="center"
              onClick={() => updateSelectedNftState(sport.id)}
            >
              <Icon as={sport.icon} w={20} h={25} />
              <Text color="#0EB634" ml="4">
                {sport.sportName}
              </Text>
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      </AutoComplete>
    </Stack>
  );
}
