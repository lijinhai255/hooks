import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PrivyProviderWrapper } from "@/provider/privy-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Privy Demo",
  description: "Demo app for PrivyProviderWrapper",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
    <PrivyProviderWrapper>
          {children}
    </PrivyProviderWrapper>

        </body>
      </html>
  );
}
