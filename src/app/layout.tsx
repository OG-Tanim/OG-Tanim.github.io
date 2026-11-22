import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono, Michroma, Syne } from "next/font/google";
import { Preloader } from "@/components/Preloader";
import { IntroDone, SmoothScroll } from "@/components/ClientEffects";
import "./globals.css";

const michroma = Michroma({ variable: "--font-michroma", weight: "400", subsets: ["latin"] });
const syne = Syne({ variable: "--font-syne", weight: ["500", "600", "700"], subsets: ["latin"] });
const interTight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tanim Ahmed — Backend & AI Engineer",
  description:
    "Tanim Ahmed builds production backends, retrieval pipelines and detection models from first principles. Dhaka, Bangladesh.",
  openGraph: {
    title: "Tanim Ahmed — Backend & AI Engineer",
    description: "Backends, RAG pipelines, multi-agent systems and computer vision.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-intro=""
      className={`${michroma.variable} ${syne.variable} ${interTight.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      {/* Extensions (e.g. ColorZilla's cz-shortcut-listen) add attributes to <body> before hydration. */}
      <body suppressHydrationWarning>
        <Preloader />
        <IntroDone />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
