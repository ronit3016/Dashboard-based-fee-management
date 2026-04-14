"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cake, ShoppingCart, User, Package, Truck, Clock, CheckCircle2, ArrowLeft, Menu, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useOrder } from "@/context/OrderContext";

export default function ShopOrdersPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { orders } = useOrder();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered": return <CheckCircle2 className="h-4 w-4" />;
      case "preparing": return <Package className="h-4 w-4" />;
      case "baking": return <Clock className="h-4 w-4" />;
      case "shipped": return <Truck className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "preparing": return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "baking": return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      case "shipped": return "bg-sky-500/10 text-sky-600 border-sky-500/20";
      default: return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30 font-sans">
      {/* Navigation (Shared with Shop) */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm group-hover:scale-110 transition-transform">
                <Cake className="h-5 w-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-primary font-heading uppercase">SweetOps Shop</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/shop" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Menu</Link>
              <Link href="/shop/orders" className="text-sm font-bold text-primary border-b-2 border-primary pb-1">My Orders</Link>
              <div className="h-8 w-[1px] bg-border mx-2" />
              <Link href="/select-role">
                <Button size="sm" variant="outline" className="rounded-full gap-2 transition-all">
                  <User className="h-4 w-4" />
                  Logout
                </Button>
              </Link>
            </div>

            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="space-y-4">
          <Link href="/shop" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Shopping
          </Link>
          <h1 className="text-4xl font-extrabold tracking-tight font-heading text-primary">Your Bakes</h1>
          <p className="text-muted-foreground text-lg">
            Follow the journey of your delicious orders.
          </p>
        </div>

        <Card className="border-none shadow-xl overflow-hidden rounded-3xl bg-background">
          <CardHeader className="bg-primary/5 pb-8 pt-8">
            <CardTitle className="text-2xl">Order History</CardTitle>
            <CardDescription>View status and details of your past and present cakes.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b border-border/50">
                    <TableHead className="pl-6 py-5 font-bold uppercase tracking-wider text-[11px] text-muted-foreground">Order Ref</TableHead>
                    <TableHead className="py-5 font-bold uppercase tracking-wider text-[11px] text-muted-foreground">Cake / Pastry</TableHead>
                    <TableHead className="py-5 font-bold uppercase tracking-wider text-[11px] text-muted-foreground">Date</TableHead>
                    <TableHead className="py-5 font-bold uppercase tracking-wider text-[11px] text-muted-foreground">Total</TableHead>
                    <TableHead className="py-5 font-bold uppercase tracking-wider text-[11px] text-muted-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} className="transition-colors hover:bg-secondary/10 border-b border-border/30 last:border-0">
                      <TableCell className="pl-6 py-6 font-bold text-primary">{order.id}</TableCell>
                      <TableCell className="py-6 font-semibold text-foreground">
                        {order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}
                      </TableCell>
                      <TableCell className="py-6 text-muted-foreground">{order.date}</TableCell>
                      <TableCell className="py-6 font-bold text-lg">${order.amount.toFixed(2)}</TableCell>
                      <TableCell className="py-6 pr-6">
                        <Badge variant="outline" className={cn("gap-2 capitalize px-3 py-1.5 rounded-full border-2", getStatusColor(order.status))}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="bg-secondary/10 py-6 px-8 flex justify-between items-center">
            <p className="text-sm text-muted-foreground italic">"Something missing? Our support team is here to help."</p>
            <Button variant="outline" className="rounded-full shadow-sm">Contact Bakery</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
