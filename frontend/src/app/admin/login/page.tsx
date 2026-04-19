"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cake, Lock, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRole } from "@/hooks/use-role";
import { useRouter } from "next/navigation";
import React from "react";

export default function AdminLoginPage() {
  const { setRole } = useRole();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setRole("admin");
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-pink-50/50 to-secondary/30 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="flex flex-col items-center">
          <Link href="/" className="self-start flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/80 to-primary text-primary-foreground shadow-xl shadow-primary/20">
            <Cake className="h-8 w-8" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground font-heading">
            Admin Portal
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Sign in to manage your patisserie
          </p>
        </div>

        <div className="rounded-3xl bg-white/80 backdrop-blur-md p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-secondary-foreground font-medium">Email address</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="owner@patisserie.com"
                    className="pl-10 h-12 rounded-xl bg-background/50 border-border/60 focus:border-primary/50 transition-colors"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-secondary-foreground font-medium">Password</Label>
                  <Link
                    href="#"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 h-12 rounded-xl bg-background/50 border-border/60 focus:border-primary/50 transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full h-12 rounded-xl shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-primary-foreground font-bold transition-all hover:scale-[1.02]">
              Access Dashboard
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
