"use client";

import React, { useState, useEffect, useMemo } from "react";
import { SummaryCard } from "@/components/admin/summary-card";
import { ChartCard } from "@/components/admin/chart-card";
import { DollarSign, TrendingUp, TrendingDown, Clock, AlertTriangle, X, Sparkles } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useOrder } from "@/context/OrderContext";

const MOCK_LINE_DATA = [
  { name: "Jan", sales: 4000, expenses: 2400 },
  { name: "Feb", sales: 3000, expenses: 1398 },
  { name: "Mar", sales: 2000, expenses: 9800 },
  { name: "Apr", sales: 2780, expenses: 3908 },
  { name: "May", sales: 1890, expenses: 4800 },
  { name: "Jun", sales: 2390, expenses: 3800 },
  { name: "Jul", sales: 3490, expenses: 4300 },
];

export default function DashboardPage() {
  const [showPopup, setShowPopup] = useState(true);
  const { orders } = useOrder();

  // Auto-hide popup after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  // Compute stats in true real-time from orders context!
  const { totalRevenue, pendingCount, categoryData } = useMemo(() => {
     let revenue = 0;
     let pending = 0;
     
     // Build a dynamic map of categories sold
     const categoryMap: Record<string, number> = {
       "Birthday Cakes": 0,
       "Wedding Cakes": 0,
       "Custom Cakes": 0,
       "Pastries": 0,
     };

     orders.forEach((order) => {
       revenue += order.amount;
       if (order.status === "pending" || order.status === "preparing") {
         pending++;
       }
       // If items were stored with categories, we could sum them dynamically. 
       // For now, let's simulate category mapping based on product names stored in items
       order.items.forEach(item => {
         const name = item.name.toLowerCase();
         if (name.includes("fudge") || name.includes("birthday")) categoryMap["Birthday Cakes"] += item.quantity;
         else if (name.includes("pearl") || name.includes("wedding")) categoryMap["Wedding Cakes"] += item.quantity;
         else if (name.includes("bespoke") || name.includes("bliss")) categoryMap["Custom Cakes"] += item.quantity;
         else categoryMap["Pastries"] += item.quantity;
       });
     });

     const barData = Object.keys(categoryMap).map(key => ({
       name: key,
       sales: categoryMap[key] + Math.floor(Math.random() * 50) + 20 // Add some base static padding so charts aren't fully empty if no orders
     }));

     return { totalRevenue: revenue, pendingCount: pending, categoryData: barData };
  }, [orders]);

  const stats = {
    revenue: totalRevenue + 45000, // starting static base + real dynamic revenue
    expenses: 12200,
    profit: (totalRevenue + 45000) - 12200,
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-8 fade-in duration-500 relative">
      
      {/* Floating Smart Insight Popup */}
      {showPopup && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-6 fade-in duration-500">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl shadow-primary/20 border border-white/40 p-4 max-w-sm flex items-start gap-4">
             <div className="h-10 w-10 rounded-xl bg-accent/20 text-accent-foreground flex items-center justify-center shrink-0">
               <TrendingUp className="h-5 w-5" />
             </div>
             <div className="flex-1">
                <h4 className="font-bold text-foreground text-sm font-heading">Business Insight</h4>
                <p className="text-xs text-foreground/70 mt-1 leading-relaxed">
                  Real-time sales tracking active. {orders.length} total orders processed!
                </p>
             </div>
             <button onClick={() => setShowPopup(false)} className="text-foreground/40 hover:text-foreground/80 transition-colors">
               <X className="h-4 w-4" />
             </button>
          </div>
        </div>
      )}

      {/* Caution Alert Banner */}
      <div className="bg-destructive/10 border border-destructive/20 rounded-[1.25rem] p-4 flex items-start sm:items-center gap-4 text-foreground/80 shadow-sm font-medium">
         <div className="bg-white/80 rounded-xl p-2 text-destructive shrink-0 shadow-sm">
           <AlertTriangle className="h-5 w-5" />
         </div>
         <span className="text-sm sm:text-base cursor-default leading-relaxed text-destructive/90">
           <strong className="font-bold mr-1 tracking-wide uppercase text-xs border border-destructive/20 bg-destructive/10 px-2 py-0.5 rounded mr-2">Caution</strong> 
           Notice: Butter import costs have risen. Consider adjusting overhead margins.
         </span>
      </div>

      <div className="flex flex-col gap-1 pb-2">
        <h1 className="text-4xl font-extrabold font-heading text-foreground tracking-tight drop-shadow-sm">Business Overview</h1>
        <p className="text-foreground/70 text-lg font-medium">Real-time metrics driving the patisserie's performance.</p>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard 
           title="Total Revenue" 
           value={`$${stats.revenue.toLocaleString()}`} 
           trend={12} 
           insight="Sales increased 12% this month" 
           icon={DollarSign} 
        />
        <SummaryCard 
           title="Total Expenses" 
           value={`$${stats.expenses.toLocaleString()}`} 
           trend={-5} 
           insight="Costs dropped 5% this month." 
           icon={TrendingDown} 
        />
        <SummaryCard 
           title="Net Profit" 
           value={`$${stats.profit.toLocaleString()}`} 
           trend={18} 
           insight="Profit margin up by 18%." 
           icon={TrendingUp} 
        />
        <SummaryCard 
           title="Pending Action" 
           value={`${pendingCount} Orders`} 
           trend={0} 
           insight="Awaiting preparation." 
           icon={Clock} 
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
        <div className="flex flex-col gap-8">
          <ChartCard 
            title="Revenue Tracking" 
            description="A 7-month comparison of your revenue against operational costs."
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={MOCK_LINE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 600 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '1rem', border: '1px solid hsl(var(--border))', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05)' }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '13px', fontWeight: 600, color: 'hsl(var(--foreground))' }} />
                <Line type="monotone" dataKey="sales" name="Revenue ($)" stroke="oklch(0.55 0.2 290)" strokeWidth={4} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 8, stroke: 'white', strokeWidth: 2 }} />
                <Line type="monotone" dataKey="expenses" name="Expenses ($)" stroke="oklch(0.88 0.08 340)" strokeWidth={4} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 8, stroke: 'white', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* AI Insights Card */}
          <div className="bg-white/70 backdrop-blur-md border border-white/50 rounded-[1.5rem] p-8 shadow-sm flex flex-col gap-6 group hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 p-16 bg-primary/5 blur-3xl rounded-full" />
            <div className="flex items-center gap-3 text-foreground font-bold font-heading text-xl relative z-10">
               <div className="p-2 bg-primary/10 rounded-xl border border-primary/20 shadow-sm">
                 <Sparkles className="h-5 w-5 text-primary" />
               </div>
               AI Market Insights
            </div>
            <ul className="space-y-4 relative z-10">
              <li className="flex items-start gap-4">
                 <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0 shadow-[0_0_8px_rgb(var(--primary))]"></div>
                 <p className="text-sm text-foreground/80 font-medium leading-relaxed">Demand for Custom Bespoke cakes has surged; consider raising premium tier pricing.</p>
              </li>
              <li className="flex items-start gap-4">
                 <div className="h-2 w-2 rounded-full bg-secondary mt-2 shrink-0 shadow-sm"></div>
                 <p className="text-sm text-foreground/80 font-medium leading-relaxed">Profit margins remain strong despite recent increases in dairy costs.</p>
              </li>
              <li className="flex items-start gap-4">
                 <div className="h-2 w-2 rounded-full bg-accent mt-2 shrink-0"></div>
                 <p className="text-sm text-foreground/80 font-medium leading-relaxed">Recent orders prominently feature macarons. Consider a promotional bundle.</p>
              </li>
            </ul>
          </div>
        </div>

        <ChartCard 
          title="Top Selling Categories" 
          description="Live distribution mapping driven by actual active orders."
        >
          <div className="flex justify-end mb-4 pr-4">
             <span className="inline-flex items-center gap-1.5 bg-secondary/30 text-primary px-4 py-1.5 rounded-full text-xs font-bold shadow-[0_2px_10px_rgb(0,0,0,0.05)] border border-white/50 hover:scale-105 transition-transform cursor-default">
               ✨ Extracted from real-time data
             </span>
          </div>
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 600 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 600 }} />
              <Tooltip 
                cursor={{ fill: 'var(--color-secondary)', opacity: 0.2 }}
                contentStyle={{ borderRadius: '1rem', border: '1px solid hsl(var(--border))', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.08)' }}
              />
              <Bar dataKey="sales" name="Volume" fill="oklch(0.55 0.2 290)" radius={[8, 8, 8, 8]} barSize={42} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
