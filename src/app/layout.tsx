import type { Metadata } from "next";
import { Inter, Bebas_Neue, Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const bebasNeue = Bebas_Neue({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-bebas'
});
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair'
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat'
});

export const metadata: Metadata = {
  title: "Tepoztlán Directory - Discover the Magic",
  description: "Your comprehensive guide to Tepoztlán's restaurants, hotels, attractions, and services. Discover the magic of this mystical Mexican town.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.className} ${bebasNeue.variable} ${playfairDisplay.variable} ${montserrat.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
