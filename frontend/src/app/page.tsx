"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Cake, 
  Users, 
  CreditCard, 
  ArrowRight,
  ChevronRight,
  Plus
} from "lucide-react";

import { useRole } from "@/hooks/use-role";

export default function LandingPage() {
  const { setRole } = useRole();

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      {/* Navbar */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <Link className="flex items-center justify-center gap-2" href="/">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Cake className="h-5 w-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-primary font-heading uppercase">SweetOps</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link 
            className="text-sm font-semibold hover:text-primary transition-colors pr-2" 
            href="/select-role"
          >
            Sign In
          </Link>
          <Link href="/select-role">
            <Button size="sm" variant="default" className="rounded-full px-6 shadow-lg shadow-primary/20">
              Get Started
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 xl:py-48 px-4 flex justify-center items-center text-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent">
          <div className="container space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="space-y-4">
              <div className="inline-block rounded-full bg-secondary/80 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-widest border border-primary/10 mb-4">
                Premium Bakery ERP & Storefront
              </div>
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl text-primary font-heading leading-[1.1]">
                Bake Better. <br className="hidden sm:inline" /> Manage Smarter. 🍰
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-lg/relaxed xl:text-xl/relaxed leading-relaxed">
                Whether you're whisking up wonders or ordering artisanal treats, 
                SweetOps is your all-in-one bakery companion.
              </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center pt-4">
              <Link href="/select-role">
                <Button size="lg" className="px-10 h-14 text-md rounded-full shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all font-bold">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-2xl bg-background shadow-sm border border-border/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Cake className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Track Cake Orders</h3>
                <p className="text-muted-foreground text-sm">
                  Never miss a delivery date. Track status from "Baking" to "Delivered" with real-time updates.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-2xl bg-background shadow-sm border border-border/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Manage Customers</h3>
                <p className="text-muted-foreground text-sm">
                  Keep a detailed directory of your customers, their preferences, and order history.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-2xl bg-background shadow-sm border border-border/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <CreditCard className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Monitor Expenses</h3>
                <p className="text-muted-foreground text-sm">
                  Categorize ingredient costs, rent, and staff salaries. Know exactly where your money goes.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-border/50 bg-secondary/10">
        <p className="text-xs text-muted-foreground">
          © 2024 SweetOps Bakery Systems. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
