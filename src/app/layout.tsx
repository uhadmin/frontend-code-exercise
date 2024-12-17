import "./globals.css";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function ViewerLayout({ children }: LayoutProps) {
  return (
    <html
      lang="en"
      className={`h-full scroll-smooth bg-white antialiased [font-feature-settings:'ss01']`}
    >
      <body className="h-full font-sans">
        <div className="h-full md:pb-4 md:pr-4">
          <main className="flex h-full flex-auto flex-col rounded-xl bg-white">
            <div className="mx-auto flex h-full w-full divide-x divide-gray-200 overflow-hidden">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
