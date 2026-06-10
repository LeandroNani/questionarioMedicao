import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pesquisa - Engenharia de Software | PUC Minas",
  description:
    "Questionário acadêmico para alunos de Engenharia de Software da PUC Minas. Pesquisa anônima sobre disciplinas, ferramentas, carreira e expectativas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
