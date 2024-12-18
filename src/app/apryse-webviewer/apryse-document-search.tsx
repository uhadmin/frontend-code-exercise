"use client";

import { useState } from "react";
import {
  DocumentSearchCombobox,
  DocumentSearchComboboxItem,
} from "../document-search-controls";
import { useApryseSearch } from "./use-apryse-search";

export function ApryseDocumentSearch() {
  const [searchValue, setSearchValue] = useState("");

  const apryseSearch = useApryseSearch({
    terms: [searchValue],
    fallbackTerm: searchValue,
  });

  return (
    <DocumentSearchCombobox
      searching={apryseSearch.isSearching}
      searchValue={searchValue}
      selectedIndex={apryseSearch.selectedIndex}
      resultsCount={
        searchValue.length > 0 ? apryseSearch.results.length : undefined
      }
      onSearch={setSearchValue}
      onSelectIndex={apryseSearch.onSelectIndex}
    >
      Not implemented: Put a list here!!
    </DocumentSearchCombobox>
  );
}
