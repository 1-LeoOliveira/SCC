import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SCC - Sistema de Cadastro de Clientes",
  description: "Sistema para cadastro de clientes via WhatsApp",
  icons: {
    icon: "/location.ico",        // Ícone padrão (16x16 ou 32x32)
    shortcut: "/location.ico",    // Ícone alternativo
    apple: "/logo.png",    // Ícone para dispositivos Apple (180x180)
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
