"use client";

import React, { useState, useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ModalForm } from "@/components/ui/modal-form";
import { ChartCard } from "@/components/admin/chart-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast-context";
import { Plus, Info } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { name: "Ingredients", id: "Ingredients", emoji: "🥚", color: "#f59e0b" },
  { name: "Staff Salary", id: "Staff Salary", emoji: "👩‍🍳", color: "#3b82f6" },
  { name: "Rent", id: "Rent", emoji: "🏪", color: "#ef4444" },
  { name: "Utilities", id: "Utilities", emoji: "⚡", color: "#10b981" },
  { name: "Packaging", id: "Packaging", emoji: "📦", color: "#8b5cf6" },
];

const MOCK_EXPENSES = [
  { id: "EXP-01", desc: "Weekly Flour & Sugar", category: "Ingredients", amount: 450, date: "2024-10-20" },
  { id: "EXP-02", desc: "October Rent", category: "Rent", amount: 2000, date: "2024-10-01" },
  { id: "EXP-03", desc: "Electricity Bill", category: "Utilities", amount: 250, date: "2024-10-05" },
  { id: "EXP-04", desc: "Custom Cake Boxes", category: "Packaging", amount: 150, date: "2024-10-15" },
  { id: "EXP-05", desc: "Baker Assistant Salary", category: "Staff Salary", amount: 1200, date: "2024-10-15" },
  { id: "EXP-06", desc: "Fresh Strawberries", category: "Ingredients", amount: 85, date: "2024-10-22" },
];

const expenseSchema = z.object({
  desc: z.string().min(2, "Description is required"),
  category: z.string().min(1, "Category is required"),
  amount: z.number().positive("Must be positive amount"),
  date: z.string().min(1, "Date is required"),
  notes: z.string().optional(),
});

type ExpenseFormValues = z.infer<typeof expenseSchema>;

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState(MOCK_EXPENSES);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue, watch, trigger } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema)
  });

  const selectedCategory = watch("category");

  const filteredExpenses = expenses.filter(e => activeCategory === "All" || e.category === activeCategory);
  
  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    CATEGORIES.forEach(c => totals[c.id] = 0);
    expenses.forEach(e => {
       if (totals[e.category] !== undefined) totals[e.category] += e.amount;
    });
    return totals;
  }, [expenses]);

  const pieData = CATEGORIES.map(c => ({
    name: c.name,
    value: categoryTotals[c.id],
    color: c.color
  })).filter(d => d.value > 0);

  const ingredientTotal = categoryTotals["Ingredients"] || 0;

  const onSubmit = async (data: ExpenseFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newExp = {
      id: `EXP-${String(expenses.length + 1).padStart(2, '0')}`,
      desc: data.desc,
      category: data.category,
      amount: data.amount,
      date: data.date,
    };
    setExpenses([newExp, ...expenses]);
    setIsModalOpen(false);
    reset();
    toast("Expense logged successfully!", "success");
  };

  const columns = [
    { header: "ID", accessorKey: "id" as const, className: "font-mono text-slate-500" },
    { header: "Date", accessorKey: "date" as const },
    { header: "Description", accessorKey: "desc" as const, className: "font-bold text-slate-800" },
    { 
      header: "Category", 
      accessorKey: "category" as const,
      cell: (item: any) => {
        const cat = CATEGORIES.find(c => c.id === item.category);
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
            {cat?.emoji} {cat?.name}
          </span>
        );
      }
    },
    { 
      header: "Amount", 
      accessorKey: "amount" as const,
      cell: (item: any) => <span className="font-mono font-bold text-red-600">-${item.amount.toFixed(2)}</span>
    },
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-8 fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-heading text-amber-950 tracking-tight">Expenses</h1>
          <p className="text-slate-500">Monitor your cash outflows and operational overheads.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md font-bold px-6 py-6 h-auto">
          <Plus className="mr-2 h-5 w-5" />
          Log Expense
        </Button>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-4 text-blue-900 shadow-sm font-medium">
         <Info className="h-5 w-5 shrink-0 text-blue-500" />
         <span>You spent <strong className="font-mono">${ingredientTotal.toFixed(2)}</strong> on Ingredients logged so far. Keep an eye on ingredient waste!</span>
      </div>

      {/* Category Pills */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide py-2">
        <button
          onClick={() => setActiveCategory("All")}
          className={cn(
            "shrink-0 px-5 py-3 rounded-2xl font-bold transition-all border shadow-sm flex items-center gap-2 hover:-translate-y-0.5",
            activeCategory === "All" ? "bg-amber-900 text-white border-amber-900 shadow-md" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
          )}
        >
          🌐 All Expenses
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "shrink-0 px-5 py-3 rounded-2xl font-bold transition-all border shadow-sm flex items-center gap-2 flex-col items-start hover:-translate-y-0.5 min-w-[140px]",
              activeCategory === cat.id ? "bg-amber-900 text-white border-amber-900 shadow-md" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            )}
          >
            <div className="flex w-full justify-between items-center bg-transparent">
              <span className="text-xl bg-transparent">{cat.emoji}</span>
              <span className={cn("text-lg font-mono", activeCategory === cat.id ? "text-amber-200" : "text-amber-700")}>${categoryTotals[cat.id]}</span>
            </div>
            <span className="text-sm mt-1">{cat.name}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DataTable 
            columns={columns} 
            data={filteredExpenses} 
            emptyMessage="No expenses found for this category."
          />
        </div>
        <div>
          <ChartCard title="Expense Breakdown" className="h-full">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  formatter={(value: any) => `$${value}`}
                  contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      <ModalForm 
        title="Log New Expense" 
        description="Record an operational out-going for tracking."
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); reset(); }}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
        submitText="Save Expense"
      >
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 block">Category</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
               {CATEGORIES.map(cat => (
                 <button
                   key={cat.id}
                   type="button"
                   onClick={() => { setValue("category", cat.id); trigger("category"); }}
                   className={cn(
                     "px-3 py-2 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition-all",
                     selectedCategory === cat.id 
                       ? "bg-amber-100 border-amber-400 text-amber-900 ring-2 ring-amber-400/50" 
                       : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                   )}
                 >
                   <span>{cat.emoji}</span>
                   <span>{cat.name}</span>
                 </button>
               ))}
            </div>
            {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700">Description</label>
            <Input {...register("desc")} placeholder="e.g. November Rent" className="rounded-xl border-slate-200 focus-visible:ring-blue-500" />
            {errors.desc && <p className="text-xs text-red-500">{errors.desc.message}</p>}
          </div>
          
          <div className="space-y-1">
             <label className="text-sm font-bold text-slate-700">Amount ($)</label>
             <Input type="number" step="0.01" {...register("amount", { valueAsNumber: true })} className="rounded-xl border-slate-200 focus-visible:ring-blue-500" />
             {errors.amount && <p className="text-xs text-red-500">{errors.amount.message}</p>}
          </div>

          <div className="space-y-1">
             <label className="text-sm font-bold text-slate-700">Date</label>
             <Input type="date" {...register("date")} className="rounded-xl border-slate-200 focus-visible:ring-blue-500" />
             {errors.date && <p className="text-xs text-red-500">{errors.date.message}</p>}
          </div>

          <div className="space-y-1">
             <label className="text-sm font-bold text-slate-700">Notes (Optional)</label>
             <Input {...register("notes")} className="rounded-xl border-slate-200 focus-visible:ring-blue-500" />
          </div>
        </div>
      </ModalForm>
    </div>
  );
}
