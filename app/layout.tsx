import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SITE_NAME, SITE_ORIGIN } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: `${SITE_NAME} · 记录与创造`,
    template: `%s · ${SITE_NAME}`,
  },
  description: "记录产品、设计与开发，也分享自己做的应用。",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfcfc" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
};

/** Shared document and theme for the entire site. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="min-h-screen bg-bg font-sans text-fg antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
