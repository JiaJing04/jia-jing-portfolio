import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const serif = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
