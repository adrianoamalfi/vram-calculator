import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { UmamiScript } from "@/components/umami-script"
import { PlausibleScript } from "@/components/plausible-script"
import { criticalCSS } from "@/lib/critical-css"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://llm.adrianoamalfi.com"),
  title: {
    default: "VRAM Calculator | Estimate Memory Requirements for Large Language Models",
    template: "%s | VRAM Calculator",
  },
  description:
    "Calculate the VRAM needed to run Large Language Models (LLMs) based on model size, precision, and context length. Find compatible GPUs for your AI projects.",
  keywords: [
    "LLM",
    "VRAM calculator",
    "GPU memory",
    "large language model",
    "AI memory requirements",
    "GPT memory",
    "LLaMA memory",
    "model inference",
    "GPU requirements",
  ],
  authors: [{ name: "Adriano Amalfi" }],
  creator: "Adriano Amalfi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://llm.adrianoamalfi.com",
    title: "VRAM Calculator | Memory Requirements for Large Language Models",
    description:
      "Calculate the VRAM needed to run Large Language Models (LLMs) based on model size, precision, and context length.",
    siteName: "VRAM Calculator",
    images: [
      {
        url: "https://llm.adrianoamalfi.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "VRAM Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VRAM Calculator | Memory Requirements for Large Language Models",
    description:
      "Calculate the VRAM needed to run Large Language Models (LLMs) based on model size, precision, and context length.",
    images: ["https://llm.adrianoamalfi.com/og-image.png"],
    creator: "@adrianoamalfi",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/favicon-16x16-9yH2XY3Kz6VnYRQejGyLEH3QFzi2IJ.png",
        sizes: "16x16",
        type: "image/png",
      },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [{ url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="icon"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/favicon-16x16-9yH2XY3Kz6VnYRQejGyLEH3QFzi2IJ.png"
          type="image/png"
          sizes="16x16"
        />
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
        <link rel="preload" href="/_next/static/css/8e2810bf02aa9a9a.css" as="style" />
        <noscript>
          <link rel="stylesheet" href="/_next/static/css/8e2810bf02aa9a9a.css" />
        </noscript>
        <Script id="load-css" strategy="afterInteractive">
          {`
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '/_next/static/css/8e2810bf02aa9a9a.css';
            document.head.appendChild(link);
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground"
            >
              Skip to main content
            </a>
            <SiteHeader />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
        <UmamiScript />
        <PlausibleScript />
      </body>
    </html>
  )
}



import './globals.css'