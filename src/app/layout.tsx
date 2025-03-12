import type { Metadata } from "next";
import { Hahmlet } from "next/font/google";
import "./globals.scss";
import { NavBar } from "./shared/components";
import { PageTransition } from "./shared/components";
import { AmplitudeProvider } from "./shared/components/Amplitude/AmplitudeProvider";

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
  authors: { name: "Kaya Lee", url: "https://www.kaya-lee.com" },
  keywords: ["frontend", "web", "developer", "react", "typescript", "nextjs"],
  openGraph: {
    title: "kaya-lee.com",
    description: "Kaya Lee - Frontend Developer",
    images: {
      url: "/image/og-image.png",
      type: "image/png",
      width: 300,
      height: 153,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${hehmlet.variable} ${notoSans.variable}`}>
        <AmplitudeProvider />
        <NavBar />
        <PageTransition>
          <div>{children}</div>
        </PageTransition>
      </body>
    </html>
  );
}
