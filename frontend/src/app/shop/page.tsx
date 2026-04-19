"use client";

import { useState } from "react";
import { useOrder } from "@/context/OrderContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cake, ShoppingBag, Search, Minus, Plus, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const BAKERY_PRODUCTS = [
  {
    id: 101,
    name: "Classic Chocolate Fudge",
    price: 35.00,
    tag: "Signature",
    category: "Birthday Cakes",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80",
  },
  {
    id: 102,
    name: "Elegant Pearl Vanilla",
    price: 120.00,
    tag: "New",
    category: "Wedding Cakes",
    image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=600&q=80",
  },
  {
    id: 103,
    name: "Triple Berry Bliss",
    price: 45.00,
    category: "Custom Cakes",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80",
  },
  {
    id: 104,
    name: "Velvet Rose Macarons (6x)",
    price: 28.00,
    tag: "Signature",
    category: "Pastries",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=80",
  },
  {
    id: 105,
    name: "Vanilla Bean Mille-Feuille",
    price: 42.00,
    category: "Pastries",
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&q=80",
  },
  {
    id: 106,
    name: "Dark Chocolate Tart",
    price: 38.50,
    category: "Pastries",
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?w=800&q=80",
  }
];

const CATEGORIES = ["All", "Pastries", "Birthday Cakes", "Wedding Cakes", "Custom Cakes"];

export default function BakeryStorefront() {
  const { cart, addToCart, removeFromCart, placeOrder } = useOrder();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "form" | "success">("cart");

  const [formData, setFormData] = useState({ name: "", address: "", phone: "" });

  const filteredProducts = BAKERY_PRODUCTS.filter(product => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    placeOrder(formData.name);
    setCheckoutStep("success");
    setTimeout(() => {
      setIsCheckoutOpen(false);
      setCheckoutStep("cart");
      setFormData({ name: "", address: "", phone: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 flex flex-col transition-colors duration-300">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between gap-6">
          
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transform group-hover:-rotate-6 transition-all duration-300">
              <Cake className="h-5 w-5 text-current" />
            </div>
            <span className="hidden sm:inline font-extrabold text-2xl tracking-normal text-foreground font-heading">
              L'Élégance
            </span>
          </Link>

          <div className="relative flex-1 max-w-lg hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
            <Input 
              placeholder="Search patisseries..." 
              className="w-full pl-12 pr-4 h-12 rounded-full border-border/40 bg-secondary/30 focus-visible:ring-1 focus-visible:ring-primary/50 text-foreground placeholder:text-foreground/40 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center shrink-0">
            <Sheet open={isCheckoutOpen} onOpenChange={(open) => {
              setIsCheckoutOpen(open);
              if (!open) setTimeout(() => setCheckoutStep("cart"), 300);
            }}>
              <SheetTrigger render={
                <button className="relative flex items-center justify-center rounded-full h-12 w-12 hover:bg-secondary transition-colors group">
                  <ShoppingBag className="h-6 w-6 text-foreground group-hover:scale-105 transition-transform" />
                  {cart.length > 0 && (
                    <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold shadow-sm animate-in zoom-in">
                      {cart.length}
                    </span>
                  )}
                </button>
              } />
              
              <SheetContent className="flex flex-col w-full sm:max-w-md bg-background border-l border-border/40 shadow-2xl p-0">
                <SheetHeader className="p-8 border-b border-border/40 bg-secondary/10">
                  <SheetTitle className="text-2xl font-bold font-heading text-foreground flex items-center gap-2">
                    {checkoutStep === "cart" ? "Your Selection" : checkoutStep === "form" ? "Details" : "Magnifique!"}
                  </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-8 py-6 h-full font-sans">
                  {checkoutStep === "cart" && (
                    cart.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full space-y-4 text-foreground/40">
                        <ShoppingBag className="h-16 w-16 opacity-30" />
                        <p className="font-medium text-lg text-center">Your basket is empty.</p>
                        <Button 
                          onClick={() => setIsCheckoutOpen(false)} 
                          variant="link" 
                          className="text-primary hover:text-primary/80"
                        >
                          Discover Pastries
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {cart.map((item) => (
                          <div key={item.id} className="flex gap-5 border-b border-border/40 pb-6 last:border-0 group">
                            <div className="h-24 w-20 bg-secondary/50 rounded-xl overflow-hidden shrink-0 shadow-sm">
                              {item.image && <img src={item.image} alt={item.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                            </div>
                            <div className="flex-1 flex flex-col justify-between py-1">
                              <div>
                                <h4 className="font-bold text-foreground text-sm line-clamp-2 leading-tight">{item.name}</h4>
                                <p className="text-foreground/80 font-semibold text-sm mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                              <div className="flex items-center gap-3 bg-secondary/30 w-fit rounded-full px-2 py-1 border border-border/50">
                                <button onClick={() => removeFromCart(item.id)} className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-white hover:shadow-sm transition-all text-foreground">
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="text-xs font-bold text-foreground min-w-[16px] text-center">{item.quantity}</span>
                                <button onClick={() => addToCart(item)} className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-white hover:shadow-sm transition-all text-foreground">
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  )}

                  {checkoutStep === "form" && (
                    <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-foreground font-semibold">Full Name</Label>
                        <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="h-12 rounded-xl bg-secondary/20 border-border/50 focus-visible:border-primary/50" placeholder="Madame Dubois" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-foreground font-semibold">Delivery Location</Label>
                        <Input required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="h-12 rounded-xl bg-secondary/20 border-border/50 focus-visible:border-primary/50" placeholder="Paris, France" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-foreground font-semibold">Contact No.</Label>
                        <Input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} type="tel" className="h-12 rounded-xl bg-secondary/20 border-border/50 focus-visible:border-primary/50" placeholder="+33 000 0000" />
                      </div>
                    </form>
                  )}

                  {checkoutStep === "success" && (
                    <div className="flex flex-col items-center justify-center h-full space-y-6 text-center animate-in zoom-in duration-500">
                      <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-12 w-12 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold font-heading text-foreground mb-4">Merci C'est Fait!</h3>
                        <p className="text-foreground/70 max-w-[250px] mx-auto text-lg leading-relaxed">
                          Your elegant order is being prepared with dedication.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {cart.length > 0 && checkoutStep !== "success" && (
                  <div className="p-8 bg-background border-t border-border/40 space-y-6 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
                    <div className="flex items-center justify-between text-lg">
                      <span className="font-semibold text-foreground/60 uppercase tracking-widest text-xs">Total</span>
                      <span className="font-bold text-foreground text-2xl tracking-tight">
                        ${cartTotal.toFixed(2)}
                      </span>
                    </div>
                    {checkoutStep === "cart" ? (
                      <Button onClick={() => setCheckoutStep("form")} className="w-full h-14 rounded-xl bg-foreground hover:bg-foreground/90 text-background font-bold text-lg shadow-lg hover:-translate-y-0.5 transition-all">
                         Checkout Securely
                         <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    ) : (
                      <div className="flex gap-3">
                        <Button type="button" variant="outline" onClick={() => setCheckoutStep("cart")} className="h-14 rounded-xl border-border/60 text-foreground hover:bg-secondary px-6">
                           Back
                        </Button>
                        <Button type="submit" form="checkout-form" className="flex-1 h-14 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg shadow-lg shadow-primary/20 transition-all">
                           Place Order
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-32">
        
        {/* Categories */}
        <div className="pt-12 pb-8 sticky top-24 z-40 bg-background/90 backdrop-blur-md -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "snap-start shrink-0 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border",
                  activeCategory === cat 
                    ? "bg-foreground text-background border-foreground shadow-[0_4px_15px_rgb(0,0,0,0.1)]" 
                    : "bg-transparent text-foreground/70 border-border/50 hover:border-foreground/20 hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="mt-4">
          {filteredProducts.length === 0 ? (
             <div className="text-center py-32 text-foreground/40">
               <Search className="h-10 w-10 mx-auto mb-6 opacity-30" />
               <p className="text-lg font-medium">No specialties found.</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group relative flex flex-col">
                  
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] w-full rounded-[2rem] overflow-hidden bg-secondary/30 mb-5 shadow-sm group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-500">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                    />
                    {/* Add overlay on hover */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {product.tag && (
                      <div className="absolute top-4 left-4">
                        <span className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full bg-white/95 text-foreground backdrop-blur-md shadow-sm">
                          {product.tag}
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <Button 
                        size="icon"
                        onClick={(e) => { e.preventDefault(); handleAddToCart(product); }}
                        className="rounded-full h-12 w-12 bg-white text-foreground hover:bg-primary hover:text-white shadow-xl !scale-100"
                      >
                        <Plus className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex flex-col px-2">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="text-lg font-bold font-heading text-foreground mb-1 leading-tight group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-xs font-semibold text-foreground/40 uppercase tracking-widest">{product.category}</p>
                      </div>
                      <span className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </main>

    </div>
  );
}
