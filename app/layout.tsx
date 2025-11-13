import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "UPMOS - Your Trusted Marketplace",
  description: "Your trusted online marketplace for electronics, fashion, home goods, and more. Quality products from verified vendors.",
  keywords: "marketplace, online shopping, electronics, fashion, home goods, vendors",
  openGraph: {
    title: "UPMOS - Your Trusted Marketplace",
    description: "Your trusted online marketplace for electronics, fashion, home goods, and more.",
    url: "https://upmos.com",
    siteName: "UPMOS",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
