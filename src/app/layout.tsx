import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YT Downloader Pro | Téléchargez vos Playlists sans limites",
  description: "Récupérez vos vidéos YouTube en 4K, 1080p ou MP3 avec une expérience premium. Gratuit pour Windows, Mac et Linux.",
};

import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
