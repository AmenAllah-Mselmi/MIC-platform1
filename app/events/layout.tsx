export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full mt-16">
      {/* <header className="w-full shadow-sm p-4 px-8">
        <h1 className="text-3xl font-bold">Mic Events</h1>
      </header> */}
      <div className="mx-auto prose max-w-4xl p-2 prose-neutral">
        {children}
      </div>
    </div>
  );
}
