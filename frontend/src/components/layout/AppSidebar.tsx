"use client";

import * as React from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  CreditCard,
  LogOut,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const adminItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Cake Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Bakery Expenses", href: "/dashboard/expenses", icon: CreditCard },
  { name: "Payments", href: "/dashboard/payments", icon: TrendingUp },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-white shadow-[2px_0_15px_rgb(0,0,0,0.02)]">
      <SidebarHeader className="flex items-center justify-between p-6">
        <div className="flex items-center gap-3 font-bold text-primary">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <span className="text-xl font-heading">L</span>
          </div>
          <span className="truncate group-data-[collapsible=icon]:hidden font-heading text-2xl text-foreground">
            L'Élégance
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3 pt-4">
        <SidebarMenu className="gap-2">
          {adminItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  render={<Link href={item.href} />}
                  tooltip={item.name}
                  isActive={isActive}
                  className={cn(
                    "transition-all duration-300 h-12 rounded-xl text-foreground/70 font-medium",
                    isActive 
                      ? "bg-primary/5 text-primary hover:bg-primary/10 font-bold shadow-sm"
                      : "hover:bg-secondary/50 hover:text-foreground"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-foreground/50")} />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-border/40">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              render={<Button variant="ghost" className="w-full h-12 rounded-xl justify-start gap-3 hover:bg-destructive/5 hover:text-destructive text-foreground/60 transition-colors" />}
              tooltip="Logout"
            >
              <LogOut className="h-5 w-5" />
              <span className="group-data-[collapsible=icon]:hidden font-medium">Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
