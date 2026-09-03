import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import HeaderLanding from "./components/landing/HeaderLanding";
import FooterLanding from "./components/landing/FooterLanding";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Evento | The Re-emagined Event Management Platform",
  description: "Welcome to the Evento, the re-emagined event management platform that empowers you to create, manage, and promote your events with ease. Our platform offers a seamless experience for event organizers and attendees alike, providing powerful tools to streamline the entire event lifecycle.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <HeaderLanding />
        {children}
        <FooterLanding />
        </body>
    </html>
  );
}
