import { FigmaPrototypeEmbed } from "./figma-prototype-embed";

export default function Home() {
  return (
    <main className="min-h-dvh bg-white">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50 px-6">
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

      <FigmaPrototypeEmbed />
    </main>
  );
}
