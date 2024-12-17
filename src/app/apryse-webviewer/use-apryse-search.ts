import { Core, WebViewerInstance } from "@pdftron/webviewer";
import { useEffect, useState } from "react";
import { useApryseWebViewer } from "./apryse-instance-provider";

type SearchResult = Core.Search.SearchResult;

const emptySearchResults: SearchResult[] = [];

function isDocumentLoaded(instance?: WebViewerInstance | null): boolean {
  if (!instance) return false;

  try {
    instance.Core.documentViewer.getDocument();
    return true;
  } catch (_error) {
    return false;
  }
}

type ApryseSearchParams = {
  terms?: string[];
  fallbackTerm?: string;
};

type ApryseSearch = {
  isSearching: boolean;
  results: SearchResult[];
  selectedIndex: number | undefined;
  onSelectIndex: (index: number) => void;
};

const highlightTerm = (
  webViewerInstance: WebViewerInstance | null,
  results: Core.Search.SearchResult[],
  index: number
) => {
  const selectedSearchResult = results.at(index);

  if (!selectedSearchResult || !webViewerInstance) return;

  const { documentViewer, Search } = webViewerInstance.Core;

  const ambientTextSearchOptions = {
    onResult(ambientTextSearchResult: SearchResult) {
      documentViewer.setActiveSearchResult(selectedSearchResult);
      documentViewer.displayAdditionalSearchResults([
        ambientTextSearchResult,
        ...results,
      ]);
    },
  };

  documentViewer.textSearchInit(
    selectedSearchResult.ambientStr,
    Search.Mode.HIGHLIGHT,
    ambientTextSearchOptions
  );
};

export function useApryseSearch({
  terms,
  fallbackTerm,
}: ApryseSearchParams): ApryseSearch {
  const temp = [
    {
      ambientStr: "this year. Finance and Procurement teams are more",
      resultStr: "year",
    },
    {
      ambientStr: "next year. Noting that TEAM has lowered its growth",
      resultStr: "year",
    },
    {
      ambientStr: "three years, he remains cautious meaning 60%",
      resultStr: "year",
    },
    {
      ambientStr: "8 years, and his company is among the leading Atlassian",
      resultStr: "year",
    },
    {
      ambientStr: "this year. • Finance and Procurement obstacles are",
      resultStr: "year",
    },
    {
      ambientStr: "next year. • His projects are about 40%",
      resultStr: "year",
    },
    {
      ambientStr: "good year for sure.” Pricing • Atlassian just",
      resultStr: "year",
    },
    {
      ambientStr: "last year), and a 15% increase on JSM.",
      resultStr: "year",
    },
    {
      ambientStr: "three years, he feels that we’re “coming out",
      resultStr: "year",
    },
    {
      ambientStr: "next year, but there may be more significant growth in",
      resultStr: "year",
    },
  ];
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState(temp);
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>();

  const { webViewerInstance } = useApryseWebViewer();

  const [documentLoaded, setDocumentLoaded] = useState(() =>
    isDocumentLoaded(webViewerInstance)
  );

  // TODO likely useful to be done in the provider
  useEffect(() => {
    if (!webViewerInstance) return;

    const { documentViewer } = webViewerInstance.Core;
    const handleLoaded = () => setDocumentLoaded(true);
    const handleUnloaded = () => setDocumentLoaded(false);
    documentViewer.addEventListener("documentLoaded", handleLoaded);
    documentViewer.addEventListener("documentUnloaded", handleUnloaded);

    return () => {
      documentViewer.removeEventListener("documentLoaded", handleLoaded);
      documentViewer.removeEventListener("documentUnloaded", handleUnloaded);
    };
  }, [webViewerInstance]);

  useEffect(() => {
    if (!webViewerInstance) return;
    if (!documentLoaded) return;
    if (!terms) return;

    const { documentViewer, Search } = webViewerInstance.Core;
    const { Mode } = Search;

    let pattern: string | null = null;
    let mode: number;

    if (terms && terms.length > 0) {
      // The characters ?$() need to be escaped with a \\ prefix.
      const parsedTerms = terms.map((term) => term.replace(/[?$()]/g, "\\$&"));
      const termsRegex = parsedTerms.join(`\\b|\\b`);
      pattern = `(\\b${termsRegex}\\b)`;
      mode = Mode.HIGHLIGHT | Mode.AMBIENT_STRING | Mode.REGEX;
    } else if (fallbackTerm && fallbackTerm.length > 0) {
      pattern = fallbackTerm;
      mode = Mode.HIGHLIGHT | Mode.AMBIENT_STRING;
    } else {
      setResults(emptySearchResults);
      return;
    }

    setIsSearching(true);

    let results: SearchResult[] = [];

    const searchOptions = {
      fullSearch: true,
      onResult(result: SearchResult) {
        results.push(result);
      },
      onDocumentEnd() {
        if (results.length === 0) {
          setResults(emptySearchResults);
          setSelectedIndex(undefined);
        } else {
          setResults(results);
          highlightTerm(webViewerInstance, results, 0);
          setSelectedIndex(0);
        }

        documentViewer.displayAdditionalSearchResults(results);
        setIsSearching(false);
      },
    };

    documentViewer.textSearchInit(pattern, mode, searchOptions);

    return () => {
      documentViewer.clearSearchResults();
    };
  }, [webViewerInstance, documentLoaded, terms, fallbackTerm]);

  return {
    isSearching,
    results,
    selectedIndex,
    onSelectIndex: (index: number) => {
      console.log("TODO Something should happen on selection!!");
    },
  };
}
