"use client";

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

export function FigmaPrototypeEmbed() {
  return (
    <div className="h-[calc(100dvh-3.5rem)] w-full overflow-hidden bg-white">
      <iframe
        key={FIGMA_EMBED_SRC}
        src={FIGMA_EMBED_SRC}
        title="AI Factory Figma Presentation"
        className="h-full w-full border-0 bg-white"
        allowFullScreen
      />
    </div>
  );
}
