"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Bell, Search, LayoutDashboard, ShoppingBag, Users, CreditCard, Receipt, Cake, User } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { role } = useUser();

  const isAdmin = role === "super-admin" || role === "admin";
  const isSuperAdmin = role === "super-admin";

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Cake Orders", href: "/orders", icon: ShoppingBag },
    { name: "Customers", href: "/customers", icon: Users },
    { name: "Payments", href: "/payments", icon: CreditCard },
    // Only super-admin or admin might see expenses, let's say both can see it per prompt "admin sees business-level data only"
    { name: "Expenses", href: "/expenses", icon: Receipt },
  ];

  if (!isAdmin) {
    return <div className="flex h-screen items-center justify-center p-4">Unauthorized. You do not have admin access.</div>;
  }

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-orange-900/10">
        <SidebarHeader className="p-4 border-b border-orange-900/10">
          <Link href="/dashboard" className="flex items-center gap-2 px-2 hover:scale-105 transition-transform">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-900 text-white shadow-sm">
              <Cake className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg font-heading text-amber-950 uppercase tracking-tight">SweetOps</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-amber-900/50 font-bold uppercase tracking-wider text-xs px-4 mt-4">
              Main Menu
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-2 mt-2 space-y-1">
              <SidebarMenu>
                {navigation.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton 
                        isActive={isActive} 
                        className={`h-11 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                          isActive 
                            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20" 
                            : "text-slate-600 hover:bg-amber-50 hover:text-amber-950"
                        }`}
                      >
                        <Link href={item.href} className="flex items-center gap-3">
                          <item.icon className={`h-5 w-5 ${isActive ? "text-white" : "text-amber-700/70"}`} />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4 border-t border-orange-900/10">
          <Link href="/select-role" className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-amber-50 transition-colors">
            <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
               <User className="h-5 w-5 text-slate-500" />
            </div>
            <div className="flex flex-col min-w-0">
               <span className="text-sm font-bold text-amber-950 truncate">Bakery User</span>
               <span className="text-xs text-amber-900/60 font-medium capitalize truncate">{role.replace("-", " ")}</span>
            </div>
          </Link>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col flex-1 min-h-screen bg-transparent transition-all duration-300">
        <header className="sticky top-0 z-40 bg-[#FFF8F2]/80 backdrop-blur-md h-16 border-b border-orange-900/10 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0 shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <SidebarTrigger className="h-10 w-10 text-amber-950 hover:bg-amber-100 hover:text-amber-950 rounded-xl" />
            <div className="relative max-w-md w-full hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search orders, customers, or items..." 
                className="pl-10 rounded-full h-10 border-orange-900/20 bg-white shadow-sm focus-visible:ring-blue-500 font-medium placeholder:text-slate-400 text-sm w-full"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <button className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:bg-white hover:text-amber-950 hover:shadow-sm border border-transparent hover:border-orange-900/10 transition-all">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-[#FFF8F2]"></span>
            </button>
            <div className="h-6 w-[1px] bg-slate-300 hidden sm:block" />
            <div className="flex items-center gap-2">
               <div className="hidden sm:flex flex-col items-end text-sm">
                 <span className="font-bold text-amber-950">Active Session</span>
                 <span className="text-xs text-slate-500 bg-amber-100 px-2 rounded-full font-semibold capitalize text-amber-800">{role.replace("-", " ")}</span>
               </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8 space-y-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
