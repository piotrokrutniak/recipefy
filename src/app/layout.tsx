import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./components/navbar/navbar";
import Footbar from "./components/footbar/footbar";
import { UserProvider } from "./utilities/contexts/user/UserContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recipefy",
  description: "Recipefy is a web application that allows you to store and manage your recipes."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <html lang="pl" className="scroll-smooth">
        <body className={`${inter.className} bg-black text-white`}>
          <main className="flex flex-col min-h-screen min-w-mobile pb-4 gap-4 overflow-x-clip bg-slate-800/25">
            <NavBar />
            <div className="flex flex-col gap-4 flex-1 relative">
              {children}
            </div>
            <Footbar />
          </main>
        </body>
      </html>
    </UserProvider>
  );
}