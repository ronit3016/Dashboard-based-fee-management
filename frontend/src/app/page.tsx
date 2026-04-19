"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Cake, 
  MapPin, 
  Star, 
  ArrowRight,
  Heart
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent font-sans selection:bg-primary/20">
      {/* Navbar Minimalist */}
      <header className="px-6 lg:px-12 h-24 flex items-center border-b border-white/20 backdrop-blur-xl sticky top-0 z-50 bg-white/40 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
        <Link className="flex items-center justify-center gap-3 group" href="/">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 backdrop-blur-md border border-white/40 text-primary shadow-sm transform group-hover:rotate-6 transition-all duration-300">
            <Cake className="h-5 w-5 text-current" />
          </div>
          <span className="font-extrabold text-2xl tracking-normal text-foreground font-heading drop-shadow-sm">
            L'Élégance
          </span>
        </Link>
        <nav className="ml-auto flex gap-6 items-center">
          <Link 
            className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors" 
            href="/shop"
          >
            Boutique
          </Link>
          <Link 
            className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors" 
            href="/admin/login"
          >
            Admin Sign In
          </Link>
          <Link href="/shop">
            <Button size="lg" className="rounded-full px-8 shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              Order Now
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Luxury Hero Section */}
        <section className="relative w-full py-24 md:py-32 lg:py-48 px-6 flex justify-center items-center text-center overflow-hidden">
          {/* Subtle decorative elements */}
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-white/50 blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl" />
          
          <div className="container relative z-10 space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-[0.2em] border border-white/50 rounded-full bg-white/50 backdrop-blur-sm shadow-sm mb-2">
                Maison de Pâtisserie
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-foreground font-heading leading-tight max-w-4xl mx-auto drop-shadow-sm">
                Artisanal Pastries, <br />
                <span className="text-primary italic font-serif font-medium">Extraordinary</span> Moments.
              </h1>
              <p className="mx-auto max-w-2xl text-foreground/80 font-medium md:text-xl leading-relaxed">
                Experience the delicate art of French baking. Handcrafted cakes and pastries made with passion, perfect for every celebration.
              </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center pt-8">
              <Link href="/shop">
                <Button size="lg" className="px-12 h-16 text-lg rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.16)] bg-foreground text-background hover:bg-foreground/90 transition-all font-semibold group border border-foreground/10">
                  Explore the Boutique
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Selection */}
        <section className="w-full py-24 bg-transparent relative">
          <div className="container px-6 mx-auto relative z-10">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-foreground drop-shadow-sm">
                Signature Collection
              </h2>
              <p className="text-foreground/80 font-medium text-lg max-w-xl mx-auto">
                A curated selection of our most beloved creations.
              </p>
            </div>

            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {[
                { name: "Raspberry Rose Macaron", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=80", tag: "Signature" },
                { name: "Vanilla Bean Mille-Feuille", image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&q=80" },
                { name: "Triple Berry Tart", image: "https://images.unsplash.com/photo-1519869325930-281384150729?w=800&q=80" }
              ].map((item, i) => (
                <Link href="/shop" key={i} className="group cursor-pointer">
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6 shadow-md group-hover:shadow-2xl transition-all duration-700 border border-white/30">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {item.tag && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md py-1.5 rounded-full px-4 text-[10px] font-bold text-foreground tracking-[0.2em] uppercase shadow-sm">
                        {item.tag}
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold font-heading text-foreground group-hover:text-primary transition-colors text-center drop-shadow-sm">
                    {item.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Storytelling About Section */}
        <section className="w-full py-32 relative">
          <div className="absolute inset-0 bg-white/20 backdrop-blur-3xl border-y border-white/30" />
          <div className="container px-6 grid lg:grid-cols-2 gap-16 items-center mx-auto max-w-7xl relative z-10">
            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50">
              <img 
                src="https://images.unsplash.com/photo-1556217646-9f7ce18e9581?w=1000&q=80" 
                alt="Baker working" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/60 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest font-bold text-primary shadow-sm border border-white/40">
                <Heart className="w-3 h-3" /> Our Story
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold font-heading leading-tight text-foreground drop-shadow-sm">
                Crafted with love, <br />
                baked with precision.
              </h2>
              <p className="text-lg text-foreground/80 font-medium leading-relaxed">
                 Every pastry we create is a testament to the timeless French tradition. We source only the finest handcrafted ingredients—from rich European butter to single-origin chocolates—to ensure that every bite transports you to the heart of Paris.
              </p>
              <div className="pt-4 flex items-center gap-8">
                <div className="space-y-2">
                   <h4 className="text-3xl font-heading font-extrabold text-foreground drop-shadow-sm">15+</h4>
                   <p className="text-[10px] text-foreground/60 font-extrabold tracking-[0.2em] uppercase">YEARS EXPERTISE</p>
                </div>
                <div className="w-px h-12 bg-border/50"></div>
                <div className="space-y-2">
                   <h4 className="text-3xl font-heading font-extrabold text-foreground drop-shadow-sm">10k+</h4>
                   <p className="text-[10px] text-foreground/60 font-extrabold tracking-[0.2em] uppercase">HAPPY CLIENTS</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Container */}
        <section className="w-full py-32 px-6 flex justify-center text-center relative">
           <div className="max-w-4xl bg-white/30 backdrop-blur-xl border border-white/40 rounded-[3rem] p-16 md:p-24 shadow-[0_8px_30px_rgba(0,0,0,0.04)] w-full">
              <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-foreground mb-6 drop-shadow-sm">
                Make your moments sweeter
              </h2>
              <p className="text-lg text-foreground/80 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
                Whether it's a grand wedding or a simple Sunday morning craving, our cakes are ready to be the centerpiece of your table.
              </p>
              <Link href="/shop">
                <Button size="lg" className="rounded-full px-12 h-14 bg-primary hover:bg-primary/90 shadow-[0_8px_20px_rgb(var(--primary)_/_0.3)] text-primary-foreground font-bold text-lg transition-transform hover:-translate-y-0.5">
                  Order Now
                </Button>
              </Link>
           </div>
        </section>
      </main>

      {/* Footer Minimalist */}
      <footer className="py-12 px-6 md:px-12 border-t border-white/20 bg-transparent text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-6 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/50 backdrop-blur-md rounded-xl border border-white/40">
            <Cake className="w-5 h-5 text-primary" />
          </div>
          <span className="font-heading font-extrabold text-xl text-foreground drop-shadow-sm">L'Élégance</span>
        </div>
        <p className="text-sm text-foreground/60 font-semibold tracking-wide">
          © 2026 L'Élégance Patisserie. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
