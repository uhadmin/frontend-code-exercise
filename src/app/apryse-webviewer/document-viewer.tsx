"use client";

import { useRef } from "react";
import { ApryseWebViewer } from "./apryse-webviewer";
import { DocumentViewerWrapper } from "./document-viewer-wrapper";

const TAILWIND_TABLET_WIDTH = 768;

export function DocumentViewer() {
  const apryseViewerMounted = useRef(true);

  let apryseViewer: React.ReactElement | undefined;

  if (apryseViewerMounted.current) {
    apryseViewer = <ApryseWebViewer />;
  }

  return <DocumentViewerWrapper>{apryseViewer}</DocumentViewerWrapper>;
}
