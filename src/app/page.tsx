import { ApryseDocumentSearch } from "./apryse-webviewer/apryse-document-search";
import { ApryseInstanceProvider } from "./apryse-webviewer/apryse-instance-provider";
import { DocumentViewer } from "./apryse-webviewer/document-viewer";

export default function Home() {
  return (
    <ApryseInstanceProvider>
      <ApryseDocumentSearch />
      <article className="h-full w-1/2 grow">
        <DocumentViewer />
      </article>
    </ApryseInstanceProvider>
  );
}
