"use client";

import { useState } from "react";
import { useOrder } from "@/context/OrderContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Cake, ShoppingCart, User, Search, Minus, Plus, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const BAKERY_PRODUCTS = [
  {
    id: 101,
    name: "Classic Chocolate Fudge",
    price: 35.00,
    tag: "Best Seller",
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
    name: "Velvet Rose Cupcakes (6x)",
    price: 24.00,
    tag: "Best Seller",
    category: "Cupcakes",
    image: "https://images.unsplash.com/photo-1607958674115-05b248a8a94b?w=600&q=80",
  },
  {
    id: 105,
    name: "Lemon Raspberry Drip",
    price: 42.00,
    category: "Birthday Cakes",
    image: "https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?w=600&q=80",
  },
  {
    id: 106,
    name: "Blueberry Dream Cupcake",
    price: 4.50,
    category: "Cupcakes",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80",
  }
];

const CATEGORIES = ["All", "Birthday Cakes", "Wedding Cakes", "Custom Cakes", "Cupcakes"];

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
    <div className="min-h-screen bg-[#FFF8F2] font-sans selection:bg-amber-100 flex flex-col transition-colors duration-300">
      
      {/* 1. HEADER (Sticky) */}
      <header className="sticky top-0 z-50 bg-[#FFF8F2]/90 backdrop-blur-md border-b border-orange-900/10 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-900 text-cream shadow-md group-hover:-rotate-12 transition-transform duration-300">
              <Cake className="h-6 w-6 text-white" />
            </div>
            <span className="hidden sm:inline font-extrabold text-2xl tracking-tighter text-amber-950">
              SweetOps
            </span>
          </Link>

          <div className="relative flex-1 max-w-md hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-900/40" />
            <Input 
              placeholder="Search cakes..." 
              className="w-full pl-10 pr-4 h-12 rounded-full border-none bg-white shadow-sm focus-visible:ring-2 focus-visible:ring-amber-200 text-amber-950 placeholder:text-amber-900/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <Sheet open={isCheckoutOpen} onOpenChange={(open) => {
              setIsCheckoutOpen(open);
              if (!open) setTimeout(() => setCheckoutStep("cart"), 300);
            }}>
              <SheetTrigger render={
                <Button variant="ghost" className="relative group rounded-full h-12 w-12 hover:bg-amber-100/50 transition-colors">
                  <ShoppingCart className="h-6 w-6 text-amber-950 group-hover:scale-110 transition-transform" />
                  {cart.length > 0 && (
                    <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white text-[10px] font-bold shadow-sm animate-in zoom-in">
                      {cart.length}
                    </span>
                  )}
                </Button>
              } />
              
              {/* 5. & 6. CART DRAWER & ORDER FLOW */}
              <SheetContent className="flex flex-col w-full sm:max-w-lg bg-[#FFF8F2] border-l-0 shadow-2xl p-0">
                <SheetHeader className="p-6 border-b border-orange-900/10 bg-white">
                  <SheetTitle className="text-2xl font-bold text-amber-950 flex items-center gap-2">
                    {checkoutStep === "cart" ? "Your Cart" : checkoutStep === "form" ? "Checkout Details" : "Order Placed!"}
                  </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-6 py-6 h-full">
                  {checkoutStep === "cart" && (
                    cart.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full space-y-4 text-amber-900/50">
                        <ShoppingCart className="h-16 w-16 opacity-30" />
                        <p className="font-medium text-lg text-center">Your cart is empty.</p>
                        <Button 
                          onClick={() => setIsCheckoutOpen(false)} 
                          variant="ghost" 
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 mt-2"
                        >
                          Browse Cakes
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div key={item.id} className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm border border-orange-900/5 group hover:border-orange-900/10 transition-colors">
                            <div className="h-20 w-20 bg-amber-50 rounded-xl overflow-hidden shrink-0">
                              {item.image && <img src={item.image} alt={item.name} className="h-full w-full object-cover" />}
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                              <h4 className="font-bold text-amber-950 text-sm line-clamp-1">{item.name}</h4>
                              <p className="text-blue-600 font-bold text-sm mb-2">${(item.price * item.quantity).toFixed(2)}</p>
                              
                              <div className="flex items-center gap-3 bg-[#FFF8F2] w-fit rounded-full p-1">
                                <button onClick={() => removeFromCart(item.id)} className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-white hover:shadow-sm transition-all text-amber-900">
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="text-xs font-bold text-amber-950 min-w-[12px] text-center">{item.quantity}</span>
                                <button onClick={() => addToCart(item)} className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-white hover:shadow-sm transition-all text-amber-900">
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
                        <Label className="text-amber-950 font-bold">Full Name</Label>
                        <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="h-12 rounded-xl bg-white border-orange-900/20 focus-visible:ring-blue-500" placeholder="Jane Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-amber-950 font-bold">Delivery Address</Label>
                        <Input required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="h-12 rounded-xl bg-white border-orange-900/20 focus-visible:ring-blue-500" placeholder="123 Bakery Lane" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-amber-950 font-bold">Phone Number</Label>
                        <Input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} type="tel" className="h-12 rounded-xl bg-white border-orange-900/20 focus-visible:ring-blue-500" placeholder="(555) 000-0000" />
                      </div>
                    </form>
                  )}

                  {checkoutStep === "success" && (
                    <div className="flex flex-col items-center justify-center h-full space-y-6 text-center animate-in zoom-in duration-500">
                      <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-12 w-12 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-amber-950">Thank You!</h3>
                        <p className="text-amber-900/70 mt-2 max-w-sm mx-auto">
                          Your sweet order has been placed. We're warming up the ovens!
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {cart.length > 0 && checkoutStep !== "success" && (
                  <div className="p-6 bg-white border-t border-orange-900/10 space-y-4 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
                    <div className="flex items-center justify-between text-lg">
                      <span className="font-semibold text-amber-950/70">Subtotal</span>
                      <span className="font-extrabold text-amber-950 flex items-baseline gap-1">
                        <span className="text-sm font-medium text-amber-900/50">USD</span>
                        ${cartTotal.toFixed(2)}
                      </span>
                    </div>
                    {checkoutStep === "cart" ? (
                      <Button onClick={() => setCheckoutStep("form")} className="w-full h-14 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 relative group overflow-hidden">
                         Proceed to Checkout
                         <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button type="button" variant="outline" onClick={() => setCheckoutStep("cart")} className="h-14 rounded-2xl border-orange-900/20 text-amber-950 hover:bg-amber-50 px-6">
                           Back
                        </Button>
                        <Button type="submit" form="checkout-form" className="flex-1 h-14 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg shadow-lg shadow-blue-500/20 transition-all">
                           Confirm Order
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </SheetContent>
            </Sheet>

            <Link href="/select-role">
              <Button variant="ghost" className="rounded-full h-12 w-12 hover:bg-amber-100/50">
                <User className="h-6 w-6 text-amber-950" />
              </Button>
            </Link>
          </div>
          
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-24">
        
        {/* 2. HERO SECTION */}
        <section className="py-12 md:py-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="bg-amber-900 rounded-[2.5rem] overflow-hidden relative min-h-[400px] flex items-center justify-center p-8 md:p-16 text-center isolate shadow-2xl shadow-amber-900/20">
            {/* Background Image/Overlay */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay">
               <img src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1200&q=80" alt="Bakery Hero" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-amber-950/80 via-amber-900/40 to-transparent" />
            
            <div className="relative z-10 max-w-3xl space-y-6">
              <span className="inline-block py-1.5 px-4 rounded-full bg-white/20 backdrop-blur-md text-white font-bold text-sm tracking-widest uppercase border border-white/20 shadow-xl">
                Artisanal Quality
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight drop-shadow-md">
                Freshly Baked Happiness 🍰
              </h1>
              <p className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto font-medium drop-shadow">
                Order custom cakes, delicate pastries, and everyday breads for every occasion.
              </p>
              <div className="pt-4">
                <Button onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })} className="h-14 rounded-full px-10 bg-white text-amber-950 hover:bg-amber-50 font-bold text-lg shadow-xl transition-all hover:scale-105">
                  Explore Cakes
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CATEGORY FILTER */}
        <div className="sticky top-20 z-40 bg-[#FFF8F2]/90 backdrop-blur-md py-4 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "snap-start shrink-0 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 shadow-sm border",
                  activeCategory === cat 
                    ? "bg-amber-900 text-white border-amber-900 hover:shadow-md hover:-translate-y-0.5" 
                    : "bg-white text-amber-950 border-orange-900/10 hover:bg-amber-50 hover:border-orange-900/20"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4. PRODUCT GRID */}
        {filteredProducts.length === 0 ? (
           <div className="text-center py-24 text-amber-900/60">
             <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
             <p className="text-xl font-medium">No sweets found matching your search.</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-[2rem] p-4 flex flex-col shadow-sm hover:shadow-xl transition-all duration-500 border border-orange-900/5 hover:-translate-y-1 relative">
                
                {/* Image Container */}
                <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-amber-50 mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  {product.tag && (
                    <div className="absolute top-3 left-3">
                      <span className={cn(
                        "px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg backdrop-blur-md",
                        product.tag === "Best Seller" ? "bg-amber-500/90 text-white" : "bg-blue-500/90 text-white"
                      )}>
                        {product.tag}
                      </span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col px-2 pb-2">
                  <p className="text-xs font-bold text-amber-900/50 uppercase tracking-wider mb-1">{product.category}</p>
                  <h3 className="text-lg font-bold text-amber-950 line-clamp-1 group-hover:text-amber-700 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="mt-auto pt-6 flex items-end justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-amber-900/50">Price</span>
                      <span className="text-2xl font-extrabold text-blue-600">${product.price.toFixed(2)}</span>
                    </div>
                    
                    <Button 
                      onClick={() => handleAddToCart(product)}
                      className="rounded-2xl h-12 px-6 bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 font-bold"
                    >
                      <Plus className="mr-2 h-5 w-5" />
                      Add
                    </Button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </main>

    </div>
  );
}
