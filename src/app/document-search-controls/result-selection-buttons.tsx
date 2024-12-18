export type ResultSelectionButtonsProps = {
  searching?: boolean;
  selectedIndex?: number;
  resultsCount?: number;
  onMovePrevious: () => void;
  onMoveNext: () => void;
};

export function ResultSelectionButtons({
  searching,
  selectedIndex,
  resultsCount,
  onMovePrevious,
  onMoveNext,
}: ResultSelectionButtonsProps) {
  let currentPositionElement: React.ReactNode;
  let disableStepThroughButtons = true;

  if (searching) {
    currentPositionElement = "searching";
  } else if (resultsCount === undefined || resultsCount === 0) {
    currentPositionElement = "";
  } else {
    const selectedPosition =
      selectedIndex === undefined ? "-" : `${selectedIndex + 1}`;

    disableStepThroughButtons = false;
    currentPositionElement = `${selectedPosition}/${resultsCount}`;
  }

  return (
    <div className="flex w-full justify-between text-sm text-gray-500">
      <span>{currentPositionElement}</span>
      <span className="inline-flex gap-1">
        <button
          disabled={disableStepThroughButtons || selectedIndex === 0}
          className="rounded-full px-2 enabled:hover:bg-gray-100 disabled:text-gray-400"
          onClick={() => onMovePrevious()}
        >
          prev
        </button>
        <button
          disabled={
            disableStepThroughButtons ||
            (selectedIndex ?? 0) + 1 === resultsCount
          }
          className="rounded-full px-2 enabled:hover:bg-gray-100 disabled:text-gray-400"
          onClick={() => onMoveNext()}
        >
          next
        </button>
      </span>
    </div>
  );
}
