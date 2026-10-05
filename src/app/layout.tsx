import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Poolux Lighting | IP68 SS316L Commercial Underwater LED Systems",
    template: "%s | Poolux Lighting",
  },
  description:
    "Certified IP68 SS316L underwater lighting manufacturer. Commercial pool lights, fountain lights, and marine-grade LED systems. 100% factory air-tightness tested. DMX512 RGBW. Wholesale factory-direct.",
  keywords: [
    "IP68 pool light",
    "SS316L underwater light",
    "commercial pool lighting",
    "DMX512 fountain light",
    "marine grade LED",
    "underwater light manufacturer",
    "RGBW pool light",
    "12V pool light",
    "pool light wholesale",
  ],
  metadataBase: new URL("https://poolux-lighting.com"),
  openGraph: {
    type: "website",
    siteName: "Poolux Lighting",
    title: "Poolux Lighting | IP68 SS316L Commercial Underwater LED Systems",
    description:
      "Certified IP68 SS316L underwater lighting manufacturer. Commercial pool lights, fountain lights, and marine-grade LED systems.",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Poolux Lighting | IP68 SS316L Commercial Underwater LED Systems",
    description:
      "Certified IP68 SS316L underwater lighting manufacturer. 100% factory air-tightness tested.",
    images: ["/images/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="flex min-h-full flex-col bg-[#040D18] text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
