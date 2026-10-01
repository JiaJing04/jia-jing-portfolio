import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/Nav";

const serif = localFont({
  src: [
    { path: "./fonts/Fraunces-normal-400.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Fraunces-normal-500.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Fraunces-normal-600.ttf", weight: "600", style: "normal" },
    { path: "./fonts/Fraunces-italic-400.ttf", weight: "400", style: "italic" },
    { path: "./fonts/Fraunces-italic-500.ttf", weight: "500", style: "italic" },
    { path: "./fonts/Fraunces-italic-600.ttf", weight: "600", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
});

const sans = localFont({
  src: [
    { path: "./fonts/Inter-normal-400.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Inter-normal-500.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Inter-normal-600.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hew Jia Jing — Portfolio",
  description:
    "Computer Science Fresh Graduate from Monash University",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans bg-paper text-ink">
        <Nav />
        {children}
        <footer className="border-t border-line mt-20">
          <div className="max-w-[1200px] mx-auto px-6 sm:px-8 py-8 text-[12px] text-ink-soft flex justify-center">
            <span>© 2026 Hew Jia Jing. All rights reserved.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
