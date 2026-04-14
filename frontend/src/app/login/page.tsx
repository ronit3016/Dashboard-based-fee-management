"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cake, Lock, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "admin";

  const getRoleLabel = () => {
    return role === "super-admin" ? "Super Admin" : "Bakery Admin";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/30 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col items-center">
          <Link href="/select-role" className="self-start flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Role Selection
          </Link>
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-xl">
            <Cake className="h-10 w-10" />
          </div>
          <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-primary font-heading uppercase">
            {getRoleLabel()} Login
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Enter your credentials to manage your bakery's sweetness
          </p>
        </div>

        <div className="rounded-3xl bg-background p-8 shadow-2xl shadow-primary/5 border border-border/50">
          <form className="space-y-6" action="/dashboard" method="GET">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@sweetops.com"
                    className="pl-10 h-11 rounded-xl bg-secondary/20"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="text-xs font-semibold text-primary hover:underline"
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
                    className="pl-10 h-11 rounded-xl bg-secondary/20"
                    required
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full h-11 rounded-xl shadow-lg shadow-primary/20 font-bold transition-all hover:scale-[1.02]">
              Access Dashboard
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-secondary/30">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
