import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Weldon Makori",
    template: "%s | Weldon Makori",
  },
  description:
    "Weldon Makori's official personal website. Discover Weldon's professional work, projects, education, blog posts, and gallery. Connect with Weldon Makori.",
  keywords: [
    "Weldon",
    "Weldon Makori",
    "Makori",
    "weldonmakori.com",
    "portfolio",
    "resume",
    "Minneapolis",
  ],
  authors: [{ name: "Weldon Makori" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://weldonmakori.com",
    siteName: "Weldon Makori",
    title: "Weldon Makori",
    description:
      "Weldon Makori's official personal website. Discover Weldon's professional work, projects, education, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weldon Makori",
    description:
      "Weldon Makori's official personal website.",
    creator: "@makori_weldon",
  },
  metadataBase: new URL("https://weldonmakori.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased grain`}
      >
        <Header />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
