import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

import "./globals.css";

export const metadata = {
  title: "Ghar Ghar Gas",
  description: "Safe gas delivery service",
};

export default function RootLayout({ children }) {
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
