import { ContextProvider } from "@/context/context";
import "./globals.css";
import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";

const noto_sans = Noto_Sans({
  weight: ["400", "600"],
  style: "normal",
  display: "swap",
  subsets: ["cyrillic", "latin"],
});

export const metadata: Metadata = {
  title: "Messenger",
  description: "We notice your message",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ContextProvider>
        <body className={noto_sans.className}>{children}</body>
      </ContextProvider>
    </html>
  );
}
