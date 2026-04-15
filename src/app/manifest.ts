import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "StarSoft",
    short_name: "StarSoft",
    description: "Azərbaycan biznesinin texnoloji tərəfdaşı",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAF7",
    theme_color: "#FAFAF7",
    lang: "az",
    icons: [
      {
        src: "/logo-mark.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
