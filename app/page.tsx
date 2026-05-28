export default function Home() {
  return (
    <main className="flex h-screen flex-col overflow-hidden bg-white">
      <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-slate-50 px-6">
        <div className="flex items-baseline gap-3">
          <span className="text-xl font-semibold tracking-tight text-blue-700">
            spyrosoft
          </span>
          <span className="text-sm font-medium text-slate-500">
            Interactive Showroom
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <span className="h-2 w-2 rounded-full bg-violet-500" />
          <span>Kliknij punkt, aby poznac szczegoly</span>
        </div>
      </header>

      <iframe
        className="h-full w-full border-0"
        src="https://embed.figma.com/proto/h17yP6Ig70kLq03uCcOX5T/AI-Factory?node-id=159-382&viewport=-335%2C619%2C0.03&scaling=contain&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=159%3A382&disable-default-keyboard-nav=1&hide-ui=1&embed-host=share"
        allowFullScreen
        title="AI Factory Figma Presentation"
        style={{ border: 0 }}
      />
    </main>
  );
}
