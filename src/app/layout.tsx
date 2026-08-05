import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { RivenChat } from "@/components/riven-chat";
import { PageLoader } from "@/components/page-loader";
import { CustomCursor } from "@/components/custom-cursor";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ilakkiyan J | Full-Stack & AI Engineer",
  description: "Portfolio of Ilakkiyan J — Full-Stack × AI Engineer & IBM SkillsBuild Intern. Building intelligent applications, AI systems, scalable backends, and digital experiences.",
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
      className={`${plusJakarta.variable} ${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
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

