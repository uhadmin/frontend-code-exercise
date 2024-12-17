"use client";

import { useEffect, useRef } from "react";
import { useApryseWebViewer } from "./apryse-instance-provider";

export function ApryseWebViewer() {
  const viewer = useRef(null);
  const initialized = useRef(false);
  const {
    webViewerInstance,
    mountWebViewerInstance,
    unmountWebViewerInstance,
  } = useApryseWebViewer();

  // For mounting apryse
  useEffect(() => {
    // Don't re-run effect in dev strict mode
    if (initialized.current) return;

    initialized.current = true;
    mountWebViewerInstance(viewer.current!);

    return unmountWebViewerInstance;
  }, [mountWebViewerInstance, unmountWebViewerInstance]);

  // For updating the document
  useEffect(() => {
    if (!webViewerInstance) return;

    const { loadDocument } = webViewerInstance.UI;

    //loadDocument("http://localhost:3000/Test.pdf");
  }, [webViewerInstance]);

  return <div ref={viewer} className="h-full w-full" />;
}
