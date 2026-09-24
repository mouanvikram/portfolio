import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Clock } from "@/components/clock";
import { Footer } from "@/components/footer";
import { ThemeToggle, themeScript } from "@/components/theme-toggle";
import { site } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
  description: site.description,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#111110" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div className="shell">
          <header className="header">
            <span className="wordmark" aria-label={site.name}>
              {site.name.split("").map((ch, i) => (
                <span key={i} aria-hidden style={{ "--i": i } as React.CSSProperties}>
                  {ch}
                </span>
              ))}
            </span>
            <span className="header-right">
              <Clock />
              <ThemeToggle />
            </span>
          </header>
          <main className="main">{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
