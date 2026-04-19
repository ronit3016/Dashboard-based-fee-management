"use client";

import React, { useState, useEffect } from "react";
import { SummaryCard } from "@/components/admin/summary-card";
import { ChartCard } from "@/components/admin/chart-card";
import { DollarSign, TrendingUp, TrendingDown, Clock, AlertTriangle, X, Sparkles } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const MOCK_LINE_DATA = [
  { name: "Jan", sales: 4000, expenses: 2400 },
  { name: "Feb", sales: 3000, expenses: 1398 },
  { name: "Mar", sales: 2000, expenses: 9800 },
  { name: "Apr", sales: 2780, expenses: 3908 },
  { name: "May", sales: 1890, expenses: 4800 },
  { name: "Jun", sales: 2390, expenses: 3800 },
  { name: "Jul", sales: 3490, expenses: 4300 },
];

const MOCK_BAR_DATA = [
  { name: "Pastries", sales: 300 },
  { name: "Birthdays", sales: 120 },
  { name: "Weddings", sales: 85 },
  { name: "Macarons", sales: 210 },
  { name: "Breads", sales: 150 },
];

export default function DashboardPage() {
  const [showPopup, setShowPopup] = useState(true);

  // Auto-hide popup after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-8 fade-in duration-500 relative">
      
      {/* Floating Smart Insight Popup */}
      {showPopup && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-6 fade-in duration-500">
          <div className="bg-white rounded-2xl shadow-2xl shadow-primary/10 border border-primary/20 p-4 max-w-sm flex items-start gap-4">
             <div className="h-10 w-10 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
               <TrendingUp className="h-5 w-5" />
             </div>
             <div className="flex-1">
                <h4 className="font-bold text-foreground text-sm font-heading">Smart Insight</h4>
                <p className="text-xs text-foreground/70 mt-1 leading-relaxed">
                  Sales increased 18% this month driven by high demand for Raspberry Rose Macarons!
                </p>
             </div>
             <button onClick={() => setShowPopup(false)} className="text-foreground/40 hover:text-foreground/80 transition-colors">
               <X className="h-4 w-4" />
             </button>
          </div>
        </div>
      )}

      {/* Caution Alert Banner */}
      <div className="bg-destructive/5 border border-destructive/20 rounded-[1.25rem] p-4 flex items-start sm:items-center gap-4 text-foreground/80 shadow-sm font-medium">
         <div className="bg-white rounded-full p-2 text-destructive shrink-0">
           <AlertTriangle className="h-5 w-5" />
         </div>
         <span className="text-sm sm:text-base cursor-default leading-relaxed text-destructive/90">
           <strong className="font-bold mr-1 tracking-wide uppercase text-xs border border-destructive/20 bg-destructive/10 px-2 py-0.5 rounded mr-2">Caution</strong> 
           Vanilla bean import costs are rising this week. Consider adjusting pricing for the Vanilla Bean Mille-Feuille.
         </span>
      </div>

      <div className="flex flex-col gap-1 pb-2">
        <h1 className="text-4xl font-extrabold font-heading text-foreground tracking-tight">Business Overview</h1>
        <p className="text-foreground/60 text-lg">Welcome back. Here is your patisserie's performance so far.</p>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard 
           title="Total Revenue" 
           value="$48,500" 
           trend={12} 
           insight="Sales increased 12% this month" 
           icon={DollarSign} 
        />
        <SummaryCard 
           title="Total Expenses" 
           value="$12,200" 
           trend={-5} 
           insight="Costs dropped 5% this month." 
           icon={TrendingDown} 
        />
        <SummaryCard 
           title="Net Profit" 
           value="$36,300" 
           trend={18} 
           insight="Profit margin up by 18%." 
           icon={TrendingUp} 
        />
        <SummaryCard 
           title="Pending Payments" 
           value="$2,450" 
           trend={2} 
           insight="Action required on 8 invoices." 
           icon={Clock} 
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
        <div className="flex flex-col gap-8">
          <ChartCard 
            title="Revenue vs Expenses" 
            description="A 7-month comparison of your revenue against operational costs."
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={MOCK_LINE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--secondary))" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 500 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '1rem', border: '1px solid hsl(var(--border))', background: 'white', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05)' }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '13px', fontWeight: 600, color: 'hsl(var(--foreground))' }} />
                <Line type="monotone" dataKey="sales" name="Revenue ($)" stroke="oklch(0.75 0.12 350)" strokeWidth={4} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 8, stroke: 'white', strokeWidth: 2 }} />
                <Line type="monotone" dataKey="expenses" name="Expenses ($)" stroke="oklch(0.92 0.04 70)" strokeWidth={4} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 8, stroke: 'white', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* AI Insights Card */}
          <div className="bg-white border border-border/40 rounded-[1.5rem] p-8 shadow-sm flex flex-col gap-6 group hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all">
            <div className="flex items-center gap-3 text-foreground font-bold font-heading text-xl">
               <div className="p-2 bg-primary/10 rounded-lg">
                 <Sparkles className="h-5 w-5 text-primary" />
               </div>
               AI Insights
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                 <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0 shadow-[0_0_8px_rgb(var(--primary))]"></div>
                 <p className="text-sm text-foreground/70 font-medium leading-relaxed">Expenses are increasing faster than revenue over the last 2 months.</p>
              </li>
              <li className="flex items-start gap-4">
                 <div className="h-2 w-2 rounded-full bg-secondary mt-2 shrink-0"></div>
                 <p className="text-sm text-foreground/70 font-medium leading-relaxed">Profit margins are shrinking slightly due to imported ingredient costs.</p>
              </li>
              <li className="flex items-start gap-4">
                 <div className="h-2 w-2 rounded-full bg-accent mt-2 shrink-0"></div>
                 <p className="text-sm text-foreground/70 font-medium leading-relaxed">Peak sales consistently observed for signature Macarons on weekends.</p>
              </li>
            </ul>
          </div>
        </div>

        <ChartCard 
          title="Top Selling Categories" 
          description="Distribution of sales across your main pâtisserie product lines."
        >
          <div className="flex justify-end mb-4 pr-4">
             <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold shadow-[0_2px_10px_rgb(0,0,0,0.05)] border border-primary/20 hover:scale-105 transition-transform cursor-default">
               ✨ Patisseries Trending
             </span>
          </div>
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={MOCK_BAR_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--secondary))" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 500 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 500 }} />
              <Tooltip 
                cursor={{ fill: 'hsl(var(--secondary) / 0.5)' }}
                contentStyle={{ borderRadius: '1rem', border: 'none', background: 'white', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.08)' }}
              />
              <Bar dataKey="sales" name="Total Sold" fill="oklch(0.75 0.12 350)" radius={[8, 8, 8, 8]} barSize={42} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
