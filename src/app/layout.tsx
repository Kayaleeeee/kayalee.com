import type { Metadata } from "next";
import { Hahmlet } from "next/font/google";
import "./globals.scss";

const hehmlet = Hahmlet({
  variable: "--font-hahmlet",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "kaya-lee.com",
  description: "Welcome aboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${hehmlet.variable}`}>{children}</body>
    </html>
  );
}
