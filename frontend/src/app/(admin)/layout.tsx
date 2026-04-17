"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useOrder } from "@/context/OrderContext";
import { useToast } from "@/components/ui/toast-context";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Search, LayoutDashboard, ShoppingBag, Users, CreditCard, Receipt, Cake, User } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { role } = useUser();
  const { orders } = useOrder();
  const { toast } = useToast();
  
  const [prevOrderCount, setPrevOrderCount] = useState(orders.length);
  const [unreadCount, setUnreadCount] = useState(0);

  const isAdmin = role === "super-admin" || role === "admin";
  const isSuperAdmin = role === "super-admin";

  useEffect(() => {
    if (orders.length > prevOrderCount) {
      const newOrders = orders.length - prevOrderCount;
      const latestOrder = orders[0];
      toast(`New order received from ${latestOrder.client}!`, "success");
      setUnreadCount(prev => prev + newOrders);
      setPrevOrderCount(orders.length);
    }
  }, [orders, prevOrderCount, toast]);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Cake Orders", href: "/orders", icon: ShoppingBag },
    { name: "Customers", href: "/customers", icon: Users },
    { name: "Payments", href: "/payments", icon: CreditCard },
    { name: "Expenses", href: "/expenses", icon: Receipt },
  ];

  if (!isAdmin) {
    return <div className="flex h-screen items-center justify-center p-4">Unauthorized. You do not have admin access.</div>;
  }

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-pink-900/10">
        <SidebarHeader className="p-4 border-b border-pink-900/10">
          <Link href="/dashboard" className="flex items-center gap-2 px-2 hover:scale-105 transition-transform">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-900 text-white shadow-sm">
              <Cake className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg font-heading text-purple-950 uppercase tracking-tight">SweetOps</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-purple-900/50 font-bold uppercase tracking-wider text-xs px-4 mt-4">
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
                            : "text-slate-600 hover:bg-pink-50 hover:text-purple-950"
                        }`}
                      >
                        <Link href={item.href} className="flex items-center gap-3">
                          <item.icon className={`h-5 w-5 ${isActive ? "text-white" : "text-purple-700/70"}`} />
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
        <SidebarFooter className="p-4 border-t border-pink-900/10">
          <Link href="/select-role" className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-pink-50 transition-colors">
            <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
               <User className="h-5 w-5 text-slate-500" />
            </div>
            <div className="flex flex-col min-w-0">
               <span className="text-sm font-bold text-purple-950 truncate">Bakery User</span>
               <span className="text-xs text-purple-900/60 font-medium capitalize truncate">{role.replace("-", " ")}</span>
            </div>
          </Link>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col flex-1 min-h-screen bg-transparent transition-all duration-300">
        <header className="sticky top-0 z-40 bg-white/40 backdrop-blur-md h-16 border-b border-pink-900/10 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0 shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <SidebarTrigger className="h-10 w-10 text-purple-950 hover:bg-purple-100 hover:text-purple-950 rounded-xl" />
            <div className="relative max-w-md w-full hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search orders, customers, or items..." 
                className="pl-10 rounded-full h-10 border-pink-900/20 bg-white shadow-sm focus-visible:ring-blue-500 font-medium placeholder:text-slate-400 text-sm w-full"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <DropdownMenu onOpenChange={(open) => { if(open) setUnreadCount(0) }}>
              <DropdownMenuTrigger className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:bg-white hover:text-purple-950 hover:shadow-sm border border-transparent hover:border-pink-900/10 transition-all outline-none">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 p-0 rounded-2xl border-pink-900/10 shadow-xl overflow-hidden bg-white/90 backdrop-blur-xl">
                <DropdownMenuLabel className="p-4 border-b border-pink-900/5 bg-pink-50/50 flex justify-between items-center">
                  <span className="font-bold text-purple-950">Notifications</span>
                  {unreadCount > 0 && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">{unreadCount} new</span>}
                </DropdownMenuLabel>
                <div className="max-h-[300px] overflow-y-auto">
                  {orders.slice(0, 5).map(order => (
                     <DropdownMenuItem key={order.id} className="p-4 border-b border-pink-900/5 cursor-pointer hover:bg-pink-50/50 focus:bg-pink-50/50 rounded-none last:border-0 items-start gap-3">
                       <div className="h-8 w-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                         <ShoppingBag className="h-4 w-4" />
                       </div>
                       <div className="flex flex-col gap-1">
                         <p className="text-sm font-semibold text-purple-950 decoration-slate-800">New order from {order.client}</p>
                         <p className="text-xs text-purple-900/60 font-medium">Order {order.id} • ${order.amount.toFixed(2)}</p>
                       </div>
                     </DropdownMenuItem>
                  ))}
                  {orders.length === 0 && (
                    <div className="p-8 text-center text-sm text-purple-900/50 font-medium">
                       No new notifications
                    </div>
                  )}
                </div>
                <div className="p-2 border-t border-pink-900/5 bg-pink-50/50 text-center">
                  <Link href="/orders" className="text-xs font-bold text-blue-600 hover:text-blue-700">View all orders</Link>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="h-6 w-[1px] bg-slate-300 hidden sm:block" />
            <div className="flex items-center gap-2">
               <div className="hidden sm:flex flex-col items-end text-sm">
                 <span className="font-bold text-purple-950">Active Session</span>
                 <span className="text-xs text-slate-500 bg-purple-100 px-2 rounded-full font-semibold capitalize text-purple-800">{role.replace("-", " ")}</span>
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
