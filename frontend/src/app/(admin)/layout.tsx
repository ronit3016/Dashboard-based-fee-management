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

  const isAdmin = role === "admin";

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
      <Sidebar className="border-r border-border/40">
        <SidebarHeader className="p-6 border-b border-border/40">
          <Link href="/dashboard" className="flex items-center gap-3 px-2 hover:scale-105 transition-transform">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Cake className="h-6 w-6 text-current" />
            </div>
            <span className="font-extrabold text-2xl font-heading text-foreground tracking-tight">L'Élégance</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-foreground/40 font-bold uppercase tracking-[0.2em] text-[10px] px-6 mt-4">
              Main Menu
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-4 mt-2 space-y-1">
              <SidebarMenu>
                {navigation.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton 
                        render={<Link href={item.href} className="flex items-center gap-3 w-full" />}
                        isActive={isActive} 
                        className={`h-12 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                          isActive 
                            ? "bg-foreground text-background hover:bg-foreground/90 shadow-[0_8px_30px_rgb(0,0,0,0.12)]" 
                            : "text-foreground/70 hover:bg-secondary/50 hover:text-foreground"
                        }`}
                      >
                        <item.icon className={`h-5 w-5 ${isActive ? "text-background" : "text-foreground/50"}`} />
                        <span>{item.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-6 border-t border-border/40">
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl transition-colors select-none">
            <div className="h-10 w-10 rounded-full bg-secondary text-primary flex items-center justify-center shrink-0">
               <User className="h-5 w-5" />
            </div>
            <div className="flex flex-col min-w-0">
               <span className="text-sm font-bold text-foreground truncate">Admin</span>
               <span className="text-xs text-foreground/50 font-medium capitalize truncate">Patisserie Owner</span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col flex-1 min-h-screen bg-transparent transition-all duration-300">
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md h-20 border-b border-border/40 flex items-center justify-between px-6 lg:px-10 shrink-0 shadow-sm">
          <div className="flex items-center gap-6 flex-1">
            <SidebarTrigger className="h-10 w-10 text-foreground hover:bg-secondary hover:text-foreground rounded-xl" />
            <div className="relative max-w-md w-full hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
              <Input 
                placeholder="Search orders, clients, or pastries..." 
                className="pl-10 rounded-full h-10 border-border/50 bg-secondary/30 shadow-sm focus-visible:ring-primary/50 font-medium placeholder:text-foreground/40 text-sm w-full"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            <DropdownMenu onOpenChange={(open) => { if(open) setUnreadCount(0) }}>
              <DropdownMenuTrigger className="relative flex h-10 w-10 items-center justify-center rounded-full text-foreground/60 hover:bg-secondary hover:text-foreground hover:shadow-sm border border-transparent transition-all outline-none">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary border-2 border-background"></span>}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 p-0 rounded-[1.5rem] border-border/40 shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden bg-background/95 backdrop-blur-xl">
                <DropdownMenuLabel className="p-4 border-b border-border/40 bg-secondary/20 flex justify-between items-center">
                  <span className="font-bold text-foreground font-heading text-lg">Notifications</span>
                  {unreadCount > 0 && <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-bold uppercase tracking-wider">{unreadCount} new</span>}
                </DropdownMenuLabel>
                <div className="max-h-[300px] overflow-y-auto">
                  {orders.slice(0, 5).map(order => (
                     <DropdownMenuItem key={order.id} className="p-4 border-b border-border/40 cursor-pointer hover:bg-secondary/50 focus:bg-secondary/50 rounded-none last:border-0 items-start gap-4">
                       <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                         <ShoppingBag className="h-4 w-4" />
                       </div>
                       <div className="flex flex-col gap-1">
                         <p className="text-sm font-bold text-foreground">New order from {order.client}</p>
                         <p className="text-xs text-foreground/60 font-medium">Order #{order.id} • ${order.amount.toFixed(2)}</p>
                       </div>
                     </DropdownMenuItem>
                  ))}
                  {orders.length === 0 && (
                    <div className="p-10 text-center text-sm text-foreground/40 font-medium tracking-wide">
                       Vous n'avez pas de notifications
                    </div>
                  )}
                </div>
                <div className="p-3 border-t border-border/40 bg-secondary/20 text-center">
                  <Link href="/orders" className="text-xs font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-widest">View all orders</Link>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="h-6 w-px bg-border/60 hidden sm:block" />
            <div className="flex items-center gap-3">
               <div className="hidden sm:flex flex-col items-end text-sm">
                 <span className="font-bold text-foreground">Admin Session</span>
                 <span className="text-xs text-foreground/50 font-medium tracking-wide">Patisserie Owner</span>
               </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden p-6 sm:p-8 lg:p-12 space-y-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
