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
  { name: "Birthday Cakes", sales: 120 },
  { name: "Wedding Cakes", sales: 85 },
  { name: "Cupcakes", sales: 210 },
  { name: "Breads", sales: 150 },
  { name: "Pastries", sales: 300 },
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
          <div className="bg-white rounded-2xl shadow-2xl shadow-purple-500/10 border border-purple-100 p-4 max-w-sm flex items-start gap-3">
             <div className="h-10 w-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
               <TrendingUp className="h-5 w-5" />
             </div>
             <div className="flex-1">
                <h4 className="font-bold text-purple-950 text-sm">Smart Insight</h4>
                <p className="text-xs text-purple-900/70 mt-1">
                  Sales increased 18% this month driven by high demand for Birthday Cakes!
                </p>
             </div>
             <button onClick={() => setShowPopup(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
               <X className="h-4 w-4" />
             </button>
          </div>
        </div>
      )}

      {/* Caution Alert Banner */}
      <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-start sm:items-center gap-3 text-red-900 shadow-sm font-medium">
         <AlertTriangle className="h-5 w-5 shrink-0 text-red-500 mt-0.5 sm:mt-0" />
         <span className="text-sm sm:text-base cursor-default">
           <strong className="font-bold text-red-950 mr-1">Caution:</strong> 
           Ingredient costs are rising this week. Consider adjusting pricing or reviewing vendor rates to maintain margins.
         </span>
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold font-heading text-purple-950 tracking-tight">Business Overview</h1>
        <p className="text-slate-500">Welcome back. Here is your bakery's performance so far.</p>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard 
           title="Total Sales" 
           value="$48,500" 
           trend={12} 
           insight="Sales increased 12% this month" 
           icon={DollarSign} 
        />
        <SummaryCard 
           title="Total Expenses" 
           value="$12,200" 
           trend={-5} 
           insight="Expenses dropped 5% this month." 
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
        <div className="flex flex-col gap-6">
          <ChartCard 
            title="Sales vs Expenses" 
            description="A 7-month comparison of your revenue against operational costs."
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={MOCK_LINE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Line type="monotone" dataKey="sales" name="Sales ($)" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="expenses" name="Expenses ($)" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* AI Insights Card */}
          <div className="bg-white border border-purple-100 rounded-2xl p-6 shadow-sm flex flex-col gap-4 group hover:shadow-md transition-all">
            <div className="flex items-center gap-2 text-purple-900 font-bold">
               <Sparkles className="h-5 w-5 text-purple-500" />
               AI Insights
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                 <div className="h-1.5 w-1.5 rounded-full bg-pink-500 mt-2 shrink-0"></div>
                 <p className="text-sm text-slate-600 font-medium">Expenses are increasing faster than revenue over the last 2 months.</p>
              </li>
              <li className="flex items-start gap-3">
                 <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mt-2 shrink-0"></div>
                 <p className="text-sm text-slate-600 font-medium">Profit margins are shrinking slightly due to ingredient costs.</p>
              </li>
              <li className="flex items-start gap-3">
                 <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                 <p className="text-sm text-slate-600 font-medium">Peak sales consistently observed on weekends.</p>
              </li>
            </ul>
          </div>
        </div>

        <ChartCard 
          title="Top Selling Categories" 
          description="Distribution of sales across your main bakery product lines."
        >
          <div className="flex justify-end mb-2 pr-4">
             <span className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm animate-pulse">
               🔥 Pastries Trending
             </span>
          </div>
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={MOCK_BAR_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="sales" name="Total Sold" fill="#c084fc" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
