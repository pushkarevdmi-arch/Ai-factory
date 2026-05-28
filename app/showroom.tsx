"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const FIGMA_EMBED_SRC =
  "https://embed.figma.com/proto/h17yP6Ig70kLq03uCcOX5T/AI-Factory" +
  "?node-id=159-382" +
  "&starting-point-node-id=159%3A382" +
  "&page-id=0%3A1" +
  "&scaling=scale-down-width" +
  "&content-scaling=fixed" +
  "&device-frame=false" +
  "&footer=false" +
  "&hotspot-hints=false" +
  "&disable-default-keyboard-nav=1" +
  "&hide-ui=1" +
  "&embed-host=cosmos-showroom";

function FullscreenIcon({ exit }: { exit?: boolean }) {
  if (exit) {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <path
          d="M4.5 2h3v1.5H3V2h1.5zm7 0H16v1.5h-4.5V2zM2 11.5h1.5V16H2v-4.5zm11.5 0V16H11.5v-1.5H16v-3z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M2 5.5V2h3.5V3.5H3.5v2H2zm12 0V3.5h-2.5V2H14v3.5h-1.5zM2 10.5h1.5v2H5.5V14H2v-3.5zm12 0V14h-3.5v-1.5h2v-2H14z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Showroom() {
  const embedRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === embedRef.current);
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const node = embedRef.current;
    if (!node) return;

    try {
      if (document.fullscreenElement === node) {
        await document.exitFullscreen();
      } else {
        await node.requestFullscreen();
      }
    } catch {
      // Fullscreen may be blocked by browser policy.
    }
  }, []);

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

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 text-xs font-medium text-slate-500 sm:flex">
            <span className="h-2 w-2 rounded-full bg-violet-500" />
            <span>Kliknij punkt, aby poznac szczegoly</span>
          </div>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="inline-flex items-center gap-1.5 rounded-md border border-violet-600 bg-violet-600 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:border-violet-700 hover:bg-violet-700"
            aria-label={isFullscreen ? "Exit full screen" : "Enter full screen"}
            title={isFullscreen ? "Exit full screen" : "Full screen"}
          >
            <FullscreenIcon exit={isFullscreen} />
            <span className="hidden sm:inline">
              {isFullscreen ? "Exit" : "Full screen"}
            </span>
          </button>
        </div>
      </header>

      <div
        ref={embedRef}
        className="relative h-[calc(100dvh-3.5rem)] w-full overflow-hidden bg-white [&:fullscreen]:h-dvh [&:fullscreen]:w-screen"
      >
        <iframe
          key={FIGMA_EMBED_SRC}
          src={FIGMA_EMBED_SRC}
          title="AI Factory Figma Presentation"
          className="h-full w-full border-0 bg-white"
          allowFullScreen
        />

        {isFullscreen ? (
          <button
            type="button"
            onClick={toggleFullscreen}
            className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-1.5 rounded-md bg-violet-600 px-3 py-2 text-xs font-medium text-white shadow-lg transition-colors hover:bg-violet-700"
            aria-label="Exit full screen"
          >
            <FullscreenIcon exit />
            Exit full screen
          </button>
        ) : null}
      </div>
    </main>
  );
}
