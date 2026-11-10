import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Way-Wise Tech",
  description:
    "We design and develop high-performing websites, custom software, mobile apps, and AI-powered solutions that help businesses grow.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // scroll-pt keeps keyboard-focused links clear of the sticky navbar.
    <html lang="en" className={`${outfit.variable} h-full scroll-pt-[110px] antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
