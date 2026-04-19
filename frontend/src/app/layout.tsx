import type { Metadata } from "next";
import { Outfit, Playfair_Display, DM_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

import { UserProvider } from "@/context/UserContext";
import { OrderProvider } from "@/context/OrderContext";
import { ToastProvider } from "@/components/ui/toast-context";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "L'Élégance | Patisserie",
  description: "Advanced bakery management and ordering platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable} ${dmMono.variable} antialiased scroll-smooth`}>
      <body className="font-sans min-h-screen antialiased">
        <UserProvider>
          <OrderProvider>
            <ToastProvider>
              <TooltipProvider>
                {children}
              </TooltipProvider>
            </ToastProvider>
          </OrderProvider>
        </UserProvider>
      </body>
    </html>
  );
}
