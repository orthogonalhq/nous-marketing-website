import type { Metadata } from "next";
import { Fira_Code, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter"
});

const firaCode = Fira_Code({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-fira-code"
});

const ibmPlexMono = IBM_Plex_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  title: {
    default: "Nue — Your personal agent, from chat to operating system",
    template: "%s | Nue"
  },
  description:
    "Nue turns everyday requests into private routines that remember, use your tools, and ask before important actions — an open-source, privacy-first personal agent OS."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${firaCode.variable} ${ibmPlexMono.variable}`}>{children}</body>
    </html>
  );
}
