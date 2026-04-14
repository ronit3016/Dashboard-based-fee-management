"use client";

import * as React from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  CreditCard,
  Settings,
  X,
  Menu,
  ChevronLeft,
  ChevronRight,
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
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

import { useRole } from "@/hooks/use-role";

const adminItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Cake Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Bakery Expenses", href: "/dashboard/expenses", icon: CreditCard },
  { name: "Payments", href: "/dashboard/payments", icon: TrendingUp },
];

const clientItems = [
  { name: "Shop Menu", href: "/dashboard/shop", icon: ShoppingCart },
  { name: "My Orders", href: "/dashboard/my-orders", icon: LayoutDashboard },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { isAdmin } = useRole();

  const navItems = isAdmin ? adminItems : clientItems;

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-card">
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2 font-bold text-primary">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-lg">S</span>
          </div>
          <span className="truncate group-data-[collapsible=icon]:hidden font-heading text-xl">
            SweetOps
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarMenu>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  render={<Link href={item.href} />}
                  tooltip={item.name}
                  isActive={isActive}
                  className={cn(
                    "transition-all hover:bg-secondary hover:text-secondary-foreground",
                    isActive && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              render={<Button variant="ghost" className="w-full justify-start gap-2 hover:bg-destructive/10 hover:text-destructive" />}
              tooltip="Logout"
            >
              <LogOut className="h-5 w-5" />
              <span className="group-data-[collapsible=icon]:hidden">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
