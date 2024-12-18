"use client";

export type DocumentViewerWrapperProps = {
  children: React.ReactNode;
};

/**
 * Renders the UI that wraps a document viewer to provide a consistent view.
 *
 * This renders the title bar as well as the bar for adding tags, companies, etc.
 */
export function DocumentViewerWrapper({
  children,
}: DocumentViewerWrapperProps) {
  return <div className="flex h-full w-full flex-col">{children}</div>;
}
