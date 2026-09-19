import { createFileRoute } from "@tanstack/react-router";
import { ArtistPortfolio } from "@/components/ArtistPortfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Precious Angel Lopez — Artist & Illustrator" },
      { name: "description", content: "Original portraiture, graphite art, and custom commissions by Precious Angel Lopez." },
      { property: "og:title", content: "Precious Angel Lopez — Artist & Illustrator" },
      { property: "og:description", content: "A curated portfolio of original portraits and custom artwork by Precious Angel Lopez." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <ArtistPortfolio />;
}
