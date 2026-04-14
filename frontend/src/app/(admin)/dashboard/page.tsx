"use client";

import React from "react";
import { SummaryCard } from "@/components/admin/summary-card";
import { ChartCard } from "@/components/admin/chart-card";
import { DollarSign, TrendingUp, TrendingDown, Clock } from "lucide-react";
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
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-8 fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold font-heading text-amber-950 tracking-tight">Business Overview</h1>
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

      {/* Mini Insight Lines */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-4 text-blue-900 shadow-sm font-medium">
           <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
           "Sales increased 18% this month driven by high demand for Birthday Cakes."
        </div>
        <div className="flex-1 bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-center gap-4 text-amber-900 shadow-sm font-medium">
           <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></div>
           "Ingredient expenses are rising slightly. Consider reviewing vendor rates."
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
        <ChartCard 
          title="Sales vs Expenses" 
          description="A 7-month comparison of your revenue against operational costs."
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_LINE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Line type="monotone" dataKey="sales" name="Sales ($)" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="expenses" name="Expenses ($)" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard 
          title="Top Selling Categories" 
          description="Distribution of sales across your main bakery product lines."
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_BAR_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="sales" name="Total Sold" fill="#8B5E3C" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
