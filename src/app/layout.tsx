import "./globals.css";
import type { Metadata } from "next";
// import { Inter } from "next/font/google";

import { Providers } from "./providers";

// const inter = Inter({ subsets: ["latin"] });

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
      {/* <body className={inter.className}> */}
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
