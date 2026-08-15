import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { VoiceAssistant } from "@/components/shared/VoiceAssistant";
import { ServiceWorkerRegistration } from "@/components/shared/ServiceWorkerRegistration";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SVH Nutrition Club | AI-Powered Smart Wellness Platform",
    template: "%s | SVH Nutrition Club",
  },
  description:
    "Transform your health with SVH Nutrition Club — a premium AI-powered wellness platform featuring smart body analytics, personalized meal plans, 3D visualization, and world-class Herbalife nutrition products.",
  keywords: [
    "nutrition club",
    "AI wellness",
    "health analytics",
    "body dashboard",
    "herbalife",
    "meal planning",
    "fitness tracking",
    "smart nutrition",
  ],
  authors: [{ name: "SVH Nutrition Club" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://svhnutritionclub.com",
    siteName: "SVH Nutrition Club",
    title: "SVH Nutrition Club | AI-Powered Smart Wellness Platform",
    description:
      "Transform your health journey with AI-powered nutrition insights, personalized wellness tracking, and premium Herbalife products.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SVH Nutrition Club",
    description: "AI-Powered Smart Wellness Platform",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f9fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
  width: "device-width",
  initialScale: 1,
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
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${poppins.variable}`}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          <ScrollProgress />
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ScrollToTop />
          <VoiceAssistant />
          <ServiceWorkerRegistration />
        </ThemeProvider>
      </body>
    </html>
  );
}
