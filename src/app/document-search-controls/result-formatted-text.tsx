export type ResultFormattedTextProps = {
  /**
   * The text that was actually searched for.
   */
  searchText: string;
  /**
   * The text that surrounds the searched text that provides additional context
   * for where the searched text lives in the document.
   */
  ambientText: string;
};

export function ResultFormattedText({
  searchText,
  ambientText,
}: ResultFormattedTextProps) {
  const ambientParts = ambientText.split(searchText);

  const itemText = ambientParts.reduce((accum, ambientPart, i, list) => {
    accum.push(ambientPart);

    if (i < list.length - 1) {
      accum.push(<mark key={i}>{searchText}</mark>);
    }

    return accum;
  }, [] as React.ReactNode[]);

  return <>{itemText}</>;
}
