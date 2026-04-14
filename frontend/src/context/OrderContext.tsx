"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type OrderStatus = "preparing" | "baking" | "ready" | "shipped" | "delivered" | "pending";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type Order = {
  id: string;
  client: string;
  items: CartItem[];
  amount: number;
  status: OrderStatus;
  date: string;
};

interface OrderContextType {
  cart: CartItem[];
  addToCart: (item: any) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
  orders: Order[];
  placeOrder: (clientName: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const initialOrders: Order[] = [
  { id: "ORD-921", client: "Guest User", items: [{ id: 1, name: "Chocolate Fudge Cake", price: 15.00, quantity: 1, image: "" }], amount: 15.00, status: "delivered", date: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0] },
  { id: "ORD-935", client: "Alice Smith", items: [{ id: 2, name: "Red Velvet Dream", price: 18.00, quantity: 1, image: "" }], amount: 18.00, status: "preparing", date: new Date().toISOString().split('T')[0] },
];

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  useEffect(() => {
    const savedCart = localStorage.getItem("sweetops_cart");
    const savedOrders = localStorage.getItem("sweetops_orders");
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  useEffect(() => {
    localStorage.setItem("sweetops_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("sweetops_orders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = (item: any) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1, image: item.image }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
  };

  const clearCart = () => setCart([]);

  const placeOrder = (clientName: string) => {
    if (cart.length === 0) return;
    const amount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 10000)}`,
      client: clientName || "Guest User",
      items: cart,
      amount,
      status: "pending",
      date: new Date().toISOString().split('T')[0],
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  return (
    <OrderContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, orders, placeOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}
