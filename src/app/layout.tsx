import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { RivenChat } from "@/components/riven-chat";
import { PageLoader } from "@/components/page-loader";
import { CustomCursor } from "@/components/custom-cursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ilakkiyan J | Full-Stack & AI Engineer",
  description: "Portfolio of Ilakkiyan J, a Full-Stack and AI Engineer building intelligent applications, AI systems, scalable backends, and interactive digital experiences.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PageLoader />
          <CustomCursor />
          {children}
          <RivenChat />
        </ThemeProvider>
      </body>
    </html>
  );
}

