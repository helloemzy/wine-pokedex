import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wine Pokedex - Gotta Taste Them All!",
  description: "A Pokemon-inspired wine tasting journal that turns wine collection into a fun game",
  keywords: "wine, tasting, journal, pokedex, pokemon, WSET, wine collection",
  authors: [{ name: "Wine Pokedex Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-blue-700 via-blue-600 to-sky-400 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
