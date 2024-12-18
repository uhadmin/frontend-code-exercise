import { SelectList, useSelectStore } from "@ariakit/react";
import { ResultSelectionButtons } from "./result-selection-buttons";

export type DocumentHitsSelectProps = {
  searching?: boolean;
  selectedIndex?: number;
  resultsCount?: number;
  children: React.ReactNode;
  onSelectIndex: (index: number) => void;
};

export function DocumentHitsSelect({
  searching,
  selectedIndex,
  resultsCount,
  children,
  onSelectIndex,
}: DocumentHitsSelectProps) {
  const select = useSelectStore({
    disclosure: null,
    popover: null,
    virtualFocus: true,
    value: selectedIndex?.toString(),
    setValue(value: string) {
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
    const item = select.item(id);
    select.move(id);
    select.setValue(item?.value ?? "");
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-10 min-h-10 items-center gap-2 border-b border-gray-200 px-4">
        <ResultSelectionButtons
          searching={searching}
          selectedIndex={selectedIndex ?? undefined}
          resultsCount={resultsCount}
          onMovePrevious={() => moveSelection(select.previous())}
          onMoveNext={() => moveSelection(select.next())}
        />
      </div>
      <SelectList
        store={select}
        role="list"
        render={<ul />}
        className="divide-y divide-gray-200 overflow-auto outline-none"
        alwaysVisible
      >
        {children}
      </SelectList>
    </div>
  );
}
