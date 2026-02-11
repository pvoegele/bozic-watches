import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "BOZIC Watches - Exklusive Luxusuhren",
  description: "Ihr vertrauensvoller Partner für exklusive Luxusuhren. Entdecken Sie unsere handverlesene Auswahl an Rolex, Patek Philippe, Omega und mehr.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased bg-luxury-cream">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
