import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CalProvider } from "@/components/providers/CalProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://www.tecdit.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TecDit: Websites That Grow Local Businesses",
    template: "%s | TecDit",
  },
  description:
    "TecDit builds premium, high-performing websites for local businesses. Book a free call and see what a better website could do for you.",
  keywords: [
    "local business website design",
    "small business web development",
    "local business web design",
    "web design agency for local business",
  ],
  authors: [{ name: "TecDit" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "TecDit",
    title: "TecDit: Websites That Grow Local Businesses",
    description:
      "Premium websites for local businesses, built to attract customers and drive bookings. Book a free call with TecDit.",
    images: ["/logo.jpeg"],
  },
  twitter: {
    card: "summary",
    title: "TecDit: Websites That Grow Local Businesses",
    description:
      "Premium websites for local businesses, built to attract customers and drive bookings.",
    images: ["/logo.jpeg"],
  },
};

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink-900">
        <CalProvider />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
