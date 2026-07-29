import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Instrument_Serif } from "next/font/google";
import { BackToTop } from "@/components/layout/back-to-top";
import { CustomCursor } from "@/components/layout/custom-cursor";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AppProviders } from "@/components/providers/app-providers";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";
import "./globals.css";

const instrument = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const siteTitle = `${siteConfig.name} — Backend & AI Engineer`;
const siteDescription =
  "Backend & AI engineer based in Rio de Janeiro. Retrieval-augmented generation, REST APIs, and full-stack product work with TypeScript, Node.js, Python, React, and Next.js. Open to Backend / AI Engineer roles.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteTitle,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteDescription,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],
  creator: siteConfig.name,
  keywords: [
    "Backend Engineer",
    "AI Engineer",
    "RAG",
    "Retrieval-Augmented Generation",
    "Node.js",
    "Python",
    "Full-stack",
    "React",
    "Next.js",
    "Rio de Janeiro",
    "Felipe Gomes",
    "Portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Backend & AI Engineer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.siteUrl,
  email: siteConfig.email,
  jobTitle: "Backend & AI Engineer",
  description: siteDescription,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.location,
    addressCountry: "BR",
  },
  sameAs: [
    siteConfig.linkedin,
    `https://github.com/${siteConfig.githubUsername}`,
  ],
};

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.siteUrl,
  description: siteDescription,
  inLanguage: "en",
  author: {
    "@type": "Person",
    name: siteConfig.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        GeistSans.variable,
        instrument.variable,
        "dark antialiased grain font-sans",
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([jsonLdPerson, jsonLdWebsite]),
          }}
        />
        <AppProviders>
          <LoadingScreen />
          <ScrollProgress />
          <CustomCursor />
          <SiteHeader />
          <main id="content" className="flex min-h-0 flex-1 flex-col">
            {children}
          </main>
          <SiteFooter />
          <BackToTop />
        </AppProviders>
      </body>
    </html>
  );
}
