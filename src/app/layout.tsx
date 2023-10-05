import type { Metadata } from "next";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import { Providers } from "./providers";
import BaseLayout from "@/components/layout/base-layout";

import "./globals.css";

export const metadata: Metadata = {
  title: "Cairo Loto - Proof of Concept prototype",
  description:
    "On-chain decentralized 'zero-loss lottery' app, deployed on Starknet testnet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <BaseLayout>{children}</BaseLayout>
        </Providers>
      </body>
    </html>
  );
}
