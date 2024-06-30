import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/ui/Navbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Apólice Manager",
  description: "Gerenciamento de Apólices de Seguro",
};

type ComponentProps = {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: ComponentProps) {
  return (
    <html lang="en" className="min-h-full ">
      <body className={`${inter.className} min-h-full bg-white`}>
        <Navbar />
        {children}
        <ToastContainer newestOnTop  />
      </body>
    </html>
  );
}