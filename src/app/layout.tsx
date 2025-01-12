import type { Metadata } from "next";
import { Hahmlet } from "next/font/google";
import "./globals.scss";
import { NavBar } from "./shared/components";
import { PageTransition } from "./shared/components";

const hehmlet = Hahmlet({
  variable: "--font-hahmlet",
  subsets: ["latin"],
});

const notoSans = Hahmlet({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "kaya-lee.com",
  description: "Kaya Lee - Frontend Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${hehmlet.variable} ${notoSans.variable}`}>
        <NavBar />
        <PageTransition>
          <div>{children}</div>
        </PageTransition>
      </body>
    </html>
  );
}
