"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const FIGMA_EMBED_SRC =
  "https://embed.figma.com/proto/h17yP6Ig70kLq03uCcOX5T/AI-Factory" +
  "?node-id=558-875" +
  "&starting-point-node-id=558%3A875" +
  "&page-id=0%3A1" +
  "&scaling=contain" +
  "&content-scaling=fixed" +
  "&device-frame=false" +
  "&footer=false" +
  "&hotspot-hints=false" +
  "&disable-default-keyboard-nav=1" +
  "&hide-ui=1" +
  "&embed-host=cosmos-showroom";

const LOADER_MIN_MS = 5000;

function FullscreenIcon({ exit }: { exit?: boolean }) {
  const props = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className: "shrink-0",
  };

  if (exit) {
    return (
      <svg {...props}>
        <path d="M4 14h6v6" />
        <path d="M14 10h6V4" />
        <path d="M10 14H4v-6" />
        <path d="M20 10V4h-6" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path d="M15 3h6v6" />
      <path d="M9 21H3v-6" />
      <path d="M21 3l-7 7" />
      <path d="M3 21l7-7" />
    </svg>
  );
}

function EmbedLoader() {
  return (
    <div
      className="absolute inset-0 z-[5] flex flex-col items-center justify-center gap-3 bg-white"
      role="status"
      aria-live="polite"
      aria-label="Loading prototype"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-slate-200 border-t-[#4a4ae1]" />
      <p className="text-sm font-medium text-slate-500">Loading showroom…</p>
    </div>
  );
}

export function Showroom() {
  const embedRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isEmbedLoading, setIsEmbedLoading] = useState(true);

  useEffect(() => {
    const loaderTimer = setTimeout(() => setIsEmbedLoading(false), LOADER_MIN_MS);

    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === embedRef.current);
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => {
      clearTimeout(loaderTimer);
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
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
        <div className="flex items-center gap-3">
          <Image
            src="/spyrosoft-logo.png"
            alt="spyrosoft"
            width={1024}
            height={253}
            className="h-8 w-auto"
            priority
          />
          <span className="text-sm font-medium text-slate-500">
            Interactive Showroom
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleFullscreen}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md border border-[#4a4ae1] bg-[#4a4ae1] px-2.5 py-1.5 font-medium text-white transition-colors hover:border-[#3a3ac9] hover:bg-[#3a3ac9]"
            aria-label={isFullscreen ? "Exit full screen" : "Enter full screen"}
            title={isFullscreen ? "Exit full screen" : "Full screen"}
          >
            <FullscreenIcon exit={isFullscreen} />
            <span className="hidden text-base sm:inline">
              {isFullscreen ? "Exit" : "Full screen"}
            </span>
          </button>
        </div>
      </header>

      <div
        ref={embedRef}
        className="relative h-[calc(100dvh-3.5rem)] w-full overflow-hidden bg-white [&:fullscreen]:h-dvh [&:fullscreen]:w-screen"
      >
        {isEmbedLoading ? <EmbedLoader /> : null}

        <iframe
          key={FIGMA_EMBED_SRC}
          src={FIGMA_EMBED_SRC}
          title="AI Factory Figma Presentation"
          className={`h-full w-full border-0 bg-white transition-opacity duration-300 ${isEmbedLoading ? "opacity-0" : "opacity-100"}`}
          allowFullScreen
        />

        {isFullscreen ? (
          <button
            type="button"
            onClick={toggleFullscreen}
            className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-1.5 rounded-md bg-[#4a4ae1] px-3 py-2 text-xs font-medium text-white shadow-lg transition-colors hover:bg-[#3a3ac9]"
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
