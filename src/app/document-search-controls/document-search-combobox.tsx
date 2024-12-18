"use client";

import { startTransition } from "react";
import { ResultSelectionButtons } from "./result-selection-buttons";
import {
  Combobox,
  ComboboxList,
  ComboboxProvider,
  useComboboxStore,
} from "@ariakit/react";

export type DocumentSearchComboboxProps = {
  searching?: boolean;
  searchValue: string;
  selectedIndex?: number;
  resultsCount?: number;
  children: React.ReactNode;
  onSearch: (searchValue: string) => void;
  onSelectIndex: (index: number) => void;
};

export function DocumentSearchCombobox({
  searching,
  searchValue,
  selectedIndex,
  resultsCount,
  children,
  onSearch,
  onSelectIndex,
}: DocumentSearchComboboxProps) {
  const combobox = useComboboxStore({
    disclosure: null,
    popover: null,
    virtualFocus: true,
    includesBaseElement: false,
    value: searchValue,
    setValue(value) {
      startTransition(() => {
        onSearch(value);
      });
    },
    setSelectedValue(value) {
      // multi-select not used here
      if (Array.isArray(value)) return;

      let nextSelectedIndex;

      try {
        nextSelectedIndex = parseInt(value, 10);
      } catch {
        console.warn("Received non-integer value:", value);
        return;
      }

      onSelectIndex(nextSelectedIndex);
    },
  });

  const moveSelection = (id: string | null | undefined) => {
    const item = combobox.item(id);
    combobox.move(id);
    combobox.setSelectedValue(item?.value ?? "");
  };

  return (
    <ComboboxProvider store={combobox}>
      <div className="flex h-full flex-col">
        <div className="flex flex-col gap-2 border-b border-gray-200 px-4 pb-2 pt-4">
          <div className="relative h-8">
            <Combobox
              placeholder="Search document content"
              className="h-8 w-full rounded-xl border-gray-300 pl-10 text-sm leading-none"
            />
          </div>
          // Not implemented: We need some buttons to navigate the list!!
        </div>
        <ComboboxList
          alwaysVisible
          className="divide-y divide-gray-200 overflow-auto"
        >
          {children}
        </ComboboxList>
      </div>
    </ComboboxProvider>
  );
}
