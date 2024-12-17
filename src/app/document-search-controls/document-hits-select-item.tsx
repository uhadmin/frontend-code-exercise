import { SelectItem } from "@ariakit/react";
import {
  ResultFormattedText,
  ResultFormattedTextProps,
} from "./result-formatted-text";

type DocumentHitsItemProps = ResultFormattedTextProps & {
  /**
   * The value that represents and differentiates this item amongst a
   * collection of items.
   */
  value: string; // TODO rename to itemIndex and make type `number`?
};

export function DocumentHitsSelectItem({
  value,
  searchText,
  ambientText,
}: DocumentHitsItemProps) {
  return (
    <SelectItem
      value={value}
      className="select-none p-4 text-xs text-gray-500 outline-none aria-selected:bg-slate-100 data-[active-item]:bg-slate-50 data-[focus-visible]:bg-slate-50 hover:cursor-pointer hover:bg-slate-50"
      clickOnEnter
      clickOnSpace
    >
      <ResultFormattedText searchText={searchText} ambientText={ambientText} />
    </SelectItem>
  );
}
