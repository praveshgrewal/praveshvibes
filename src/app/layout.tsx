import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://praveshvibes.com"),
  title: {
    default: "PraveshVibes — I Teach Technology. I Build What's Next.",
    template: "%s | PraveshVibes"
  },
  description: "Official portfolio, technical blog, and student learning repository of Pravesh Grewal. Specializing in Data Analytics, Machine Learning, Generative AI, Cybersecurity, and Modern Web Applications.",
  keywords: [
    "Pravesh Grewal",
    "PraveshVibes",
    "Data Analytics",
    "Data Science",
    "Machine Learning",
    "Generative AI",
    "Cybersecurity",
    "Ethical Hacking",
    "Next.js Portfolio",
    "Student Notes",
    "Python Tutorials",
    "SQL Cheat Sheets"
  ],
  authors: [{ name: "Pravesh Grewal", url: "https://praveshvibes.com" }],
  creator: "Pravesh Grewal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://praveshvibes.com",
    siteName: "PraveshVibes",
    title: "PraveshVibes — I Teach Technology. I Build What's Next.",
    description: "Explore cutting-edge projects in Data Science, AI/ML, and Cybersecurity. Free student notes, cheat sheets, and technical deep-dives.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PraveshVibes — Tech Educator & Builder"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "PraveshVibes — I Teach Technology. I Build What's Next.",
    description: "Explore projects, free student notes, and technical articles across AI, Data, and Cybersecurity."
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F9FF" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1020" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Anti-FOUC script: runs synchronously before body render */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var shouldBeDark = stored === 'dark' || (stored !== 'light' && prefersDark);
                  if (shouldBeDark) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] antialiased transition-colors duration-300">
        <ThemeProvider>
          <Suspense fallback={<div className="h-20" />}>
            <Navbar />
          </Suspense>
          <main className="flex-1 pt-20">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
