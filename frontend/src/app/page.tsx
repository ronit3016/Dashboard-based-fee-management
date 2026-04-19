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
    <div className="flex min-h-screen flex-col bg-background font-sans selection:bg-primary/20">
      {/* Navbar Minimalist */}
      <header className="px-6 lg:px-12 h-24 flex items-center border-b border-border/40 backdrop-blur-md sticky top-0 z-50 bg-background/80">
        <Link className="flex items-center justify-center gap-3 group" href="/">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transform group-hover:rotate-6 transition-all duration-300">
            <Cake className="h-5 w-5" />
          </div>
          <span className="font-extrabold text-2xl tracking-normal text-foreground font-heading">
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
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-secondary/60 blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl" />
          
          <div className="container relative z-10 space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-[0.2em] border border-primary/20 rounded-full bg-white/50 backdrop-blur-sm mb-2">
                Maison de Pâtisserie
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-foreground font-heading leading-tight max-w-4xl mx-auto drop-shadow-sm">
                Artisanal Pastries, <br />
                <span className="text-primary italic font-serif font-medium">Extraordinary</span> Moments.
              </h1>
              <p className="mx-auto max-w-2xl text-foreground/70 md:text-xl leading-relaxed">
                Experience the delicate art of French baking. Handcrafted cakes and pastries made with passion, perfect for every celebration.
              </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center pt-8">
              <Link href="/shop">
                <Button size="lg" className="px-12 h-16 text-lg rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.16)] bg-foreground text-background hover:bg-foreground/90 transition-all font-semibold group">
                  Explore the Boutique
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Selection */}
        <section className="w-full py-24 bg-white">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-foreground">
                Signature Collection
              </h2>
              <p className="text-foreground/60 text-lg max-w-xl mx-auto">
                A curated selection of our most beloved creations.
              </p>
            </div>

            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {[
                { name: "Raspberry Rose Macaron", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=80", tag: "Signature" },
                { name: "Vanilla Bean Mille-Feuille", image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&q=80" },
                { name: "Dark Chocolate Tart", image: "https://images.unsplash.com/photo-1519869325930-281384150729?w=800&q=80" }
              ].map((item, i) => (
                <Link href="/shop" key={i} className="group cursor-pointer">
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6 shadow-sm group-hover:shadow-xl transition-all duration-700">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {item.tag && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full px-4 text-xs font-bold text-foreground">
                        {item.tag}
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold font-heading text-foreground group-hover:text-primary transition-colors text-center">
                    {item.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Storytelling About Section */}
        <section className="w-full py-32 bg-secondary/30 relative">
          <div className="container px-6 grid lg:grid-cols-2 gap-16 items-center mx-auto max-w-7xl">
            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1556217646-9f7ce18e9581?w=1000&q=80" 
                alt="Baker working" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-sm font-bold text-primary shadow-sm">
                <Heart className="w-4 h-4" /> Our Story
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold font-heading leading-tight text-foreground">
                Crafted with love, <br />
                baked with precision.
              </h2>
              <p className="text-lg text-foreground/70 leading-relaxed">
                 Every pastry we create is a testament to the timeless French tradition. We source only the finest organic ingredients—from rich European butter to single-origin chocolates—to ensure that every bite transports you to the heart of Paris.
              </p>
              <div className="pt-4 flex items-center gap-8">
                <div className="space-y-2">
                   <h4 className="text-3xl font-heading font-bold text-foreground">15+</h4>
                   <p className="text-sm text-foreground/60 font-medium tracking-wide">YEARS EXPERTISE</p>
                </div>
                <div className="w-px h-12 bg-border"></div>
                <div className="space-y-2">
                   <h4 className="text-3xl font-heading font-bold text-foreground">10k+</h4>
                   <p className="text-sm text-foreground/60 font-medium tracking-wide">HAPPY CLIENTS</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Container */}
        <section className="w-full py-32 px-6 flex justify-center text-center">
           <div className="max-w-4xl bg-primary/5 border border-primary/10 rounded-[3rem] p-16 md:p-24 shadow-sm">
              <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-foreground mb-6">
                Make your moments sweeter
              </h2>
              <p className="text-lg text-foreground/70 mb-10 max-w-2xl mx-auto">
                Whether it's a grand wedding or a simple Sunday morning craving, our cakes are ready to be the centerpiece of your table.
              </p>
              <Link href="/shop">
                <Button size="lg" className="rounded-full px-12 h-14 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 text-white font-bold text-lg">
                  Order Now
                </Button>
              </Link>
           </div>
        </section>
      </main>

      {/* Footer Minimalist */}
      <footer className="py-12 px-6 md:px-12 border-t border-border bg-white text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <Cake className="w-6 h-6 text-primary" />
          <span className="font-heading font-extrabold text-xl text-foreground">L'Élégance</span>
        </div>
        <p className="text-sm text-foreground/50 font-medium">
          © 2026 L'Élégance Patisserie. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
