import React from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

import "./globals.css";

export const metadata = {
  title: "Ghar Ghar Gas",
  description: "Safe gas delivery service",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header isScrolled={true} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
