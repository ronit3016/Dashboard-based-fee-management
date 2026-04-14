"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Search, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search cake orders, customers..."
            className="w-[300px] bg-secondary/50 pl-8 focus-visible:ring-primary"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-primary" />
        </Button>
        <div className="h-6 w-[1px] bg-border mx-2" />
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium leading-none">SweetOps Admin</p>
            <p className="text-xs text-muted-foreground">Certified Baker</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User className="h-5 w-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
