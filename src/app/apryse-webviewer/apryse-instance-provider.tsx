"use client";

import { WebViewerInstance, WebViewerOptions } from "@pdftron/webviewer";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type ApryseInstanceProviderContextType = {
  webViewerInstance: WebViewerInstance | null;
  mountWebViewerInstance: (element: HTMLElement) => void;
  unmountWebViewerInstance: () => void;
};

const noop = () => {};

const ApryseInstanceProviderContext =
  createContext<ApryseInstanceProviderContextType>({
    webViewerInstance: null,
    mountWebViewerInstance: noop,
    unmountWebViewerInstance: noop,
  });

async function createWebViewerInstance(
  apryseLicenseKey: string,
  element: HTMLElement
): Promise<WebViewerInstance> {
  const { default: WebViewer } = await import("@pdftron/webviewer");

  const options = {
    path: "/webviewer",
    css: "/assets/apryse.css",
    licenseKey: "apryseLicenseKey",
    ui: "beta",
    isReadOnly: true,
    disabledElements: ["searchPanel"],
    useDownloader: false,
  } satisfies WebViewerOptions;

  const temp = WebViewer(options, element);
  temp.then((instance) => {
    const { Feature } = instance.UI;
    instance.UI.enableFeatures([Feature.FilePicker]);
  });
  return await temp;
}

type ApryseInstanceProviderProps = {
  children: React.ReactNode;
};

/**
 * Manages the Apryse webviewer instance and exposes it via a context provider.
 *
 * Access the webviewer instance via the `useApryseWebViewer` hook.
 */
export function ApryseInstanceProvider({
  children,
}: ApryseInstanceProviderProps) {
  const [webViewerInstance, setWebViewerInstance] =
    useState<WebViewerInstance | null>(null);

  const mountWebViewerInstance = useCallback((element: HTMLElement) => {
    createWebViewerInstance("", element)
      .then(setWebViewerInstance)
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const unmountWebViewerInstance = useCallback(() => {
    setWebViewerInstance(null);
  }, []);

  const contextValue = useMemo<ApryseInstanceProviderContextType>(() => {
    return {
      webViewerInstance,
      mountWebViewerInstance,
      unmountWebViewerInstance,
    };
  }, [webViewerInstance, mountWebViewerInstance, unmountWebViewerInstance]);

  return (
    <ApryseInstanceProviderContext.Provider value={contextValue}>
      {children}
    </ApryseInstanceProviderContext.Provider>
  );
}

export function useApryseWebViewer(): ApryseInstanceProviderContextType {
  return useContext(ApryseInstanceProviderContext);
}
