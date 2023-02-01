/* eslint-disable react/no-array-index-key */
import { Icon, Text } from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";

import { sportsList } from "utils";

export default function App() {
  return (
    <AutoComplete rollNavigation>
      <AutoCompleteInput placeholder="Search..." autoFocus />
      <AutoCompleteList>
        {sportsList.map((sport, oid) => (
          <AutoCompleteItem
            key={`option-${oid}`}
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
