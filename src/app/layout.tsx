import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apetitio | Online Trgovina",
  description: "Vaša online trgovina - najbolje cijene i kvalitet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
