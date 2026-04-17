import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

import { UserProvider } from "@/context/UserContext";
import { OrderProvider } from "@/context/OrderContext";
import { ToastProvider } from "@/components/ui/toast-context";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SweetOps | Bakery Management System",
  description: "Advanced bakery management and ordering platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable} ${dmMono.variable} antialiased scroll-smooth`}>
      <body className="font-sans bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100 min-h-screen text-slate-800 antialiased selection:bg-purple-200">
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
