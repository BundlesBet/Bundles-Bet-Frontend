import { Icon, Text } from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";

import { sportsList, uniqueID } from "utils";

export default function App() {
  return (
    <AutoComplete rollNavigation>
      <AutoCompleteInput placeholder="Search..." autoFocus />
      <AutoCompleteList>
        {sportsList.map((sport) => (
          <AutoCompleteItem
            key={uniqueID()}
            value={sport.sportName}
            textTransform="capitalize"
            align="center"
          >
            <Icon as={sport.icon} w={20} h={25} />
            <Text color="#0EB634" ml="4">
              {sport.sportName}
            </Text>
          </AutoCompleteItem>
        ))}
      </AutoCompleteList>
    </AutoComplete>
  );
}
