"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  value: string | number;
  trend?: number;
  insight: string;
  icon: React.ElementType;
}

export function SummaryCard({ title, value, trend, insight, icon: Icon }: SummaryCardProps) {
  return (
    <Card className="hover:shadow-md transition-all duration-300 hover:-translate-y-1 bg-white border-orange-900/10 rounded-2xl overflow-hidden group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-500 font-heading">{title}</p>
            <p className="text-3xl font-bold text-amber-950 font-mono tracking-tight">{value}</p>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-700 group-hover:scale-110 group-hover:bg-amber-100 transition-all">
            <Icon className="h-6 w-6" />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          {trend !== undefined && (
            <div className={cn(
               "flex items-center gap-1 text-sm font-bold w-fit px-2 py-1 rounded-full",
               trend > 0 ? "text-emerald-700 bg-emerald-50" : trend < 0 ? "text-red-700 bg-red-50" : "text-slate-700 bg-slate-50"
            )}>
              {trend > 0 ? <ArrowUpRight className="h-4 w-4" /> : trend < 0 ? <ArrowDownRight className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
          <p className="text-sm text-slate-500 font-medium">
            {insight}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
