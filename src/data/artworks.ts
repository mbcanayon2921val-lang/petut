import portraitAsset from "@/assets/precious-portrait.png.asset.json";
import paintedFamilyAsset from "@/assets/family-painted-portrait.png.asset.json";
import graphiteCloseupAsset from "@/assets/graphite-closeup.png.asset.json";
import graphiteFamilyAsset from "@/assets/family-graphite-portrait.png.asset.json";

export const artistPortrait = portraitAsset.url;

export type Artwork = {
  id: number;
  title: string;
  category: "Painted Portrait" | "Graphite";
  medium: string;
  image: string;
  alt: string;
  width: number;
  height: number;
};

export const artworks: Artwork[] = [
  {
    id: 1,
    title: "Family in Evergreen",
    category: "Painted Portrait",
    medium: "Commissioned group portrait",
    image: paintedFamilyAsset.url,
    alt: "A hand-painted family portrait by Precious Angel Lopez",
    width: 768,
    height: 1024,
  },
  {
    id: 2,
    title: "A Quiet Smile",
    category: "Graphite",
    medium: "Graphite portrait study",
    image: graphiteCloseupAsset.url,
    alt: "A detailed graphite close-up portrait drawn by Precious Angel Lopez",
    width: 768,
    height: 1024,
  },
  {
    id: 3,
    title: "Three of Us",
    category: "Graphite",
    medium: "Commissioned family portrait",
    image: graphiteFamilyAsset.url,
    alt: "A framed graphite family portrait by Precious Angel Lopez",
    width: 769,
    height: 1096,
  },
];