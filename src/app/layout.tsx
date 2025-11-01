import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Wealth Shift | A Journey of Growth and Empowerment",
  description: "Join our exclusive community focused on personal growth, wealth building, and empowerment.",
  keywords: ["wealth", "personal growth", "empowerment", "community", "afrocentric"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${playfairDisplay.variable} antialiased text-cream`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
