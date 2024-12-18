import { ComboboxItem } from "@ariakit/react";
import {
  ResultFormattedText,
  ResultFormattedTextProps,
} from "./result-formatted-text";

export type DocumentSearchComboboxItemProps = ResultFormattedTextProps & {
  value: string;
};

export function DocumentSearchComboboxItem({
  value,
  searchText,
  ambientText,
}: DocumentSearchComboboxItemProps) {
  return (
    <ComboboxItem
      value={value}
      className="select-none p-4 text-xs text-gray-500 data-[active-item]:bg-slate-100 data-[focus-visible]:bg-slate-50 hover:cursor-pointer hover:bg-slate-50"
      setValueOnClick={false}
      selectValueOnClick
    >
      <ResultFormattedText searchText={searchText} ambientText={ambientText} />
    </ComboboxItem>
  );
}
