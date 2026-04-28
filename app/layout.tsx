import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({ 
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mend House | Don't Toss It, Fix It",
  description: "A cozy neighborhood spot where broken small appliances get a second life through guided repair workshops.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lora.variable} font-body bg-brand-neutral text-brand-secondary antialiased`}>
        {children}
      </body>
    </html>
  );
}
