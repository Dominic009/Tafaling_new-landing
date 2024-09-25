import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Blinker } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext/AuthProvider";
import { Toaster } from "react-hot-toast";
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ["latin"] });
const blinker = Blinker({
  weight: ["100", "200", "300", "400", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tafaling",
  description: "Share the madness",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <AuthProvider>
        <body
          className={`${inter.className} ${blinker.className} bg-[#f4f7f8]`}
        >
          <div className="sticky top-0 z-50 w-full">
            <Navbar></Navbar>
          </div>
          <NextTopLoader showSpinner={false}/>
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
