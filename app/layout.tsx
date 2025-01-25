import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/context/Providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online Code Compiler",
  description: "Online Code Compiler",
  icons: [{ rel: "icon", url: "/logo.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <script
        async
        src="https://cdn.seline.so/seline.js"
        data-token="c5c679c7591e8b5"
      ></script>
      <body className={cn("min-h-screen bg-background", inter.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
