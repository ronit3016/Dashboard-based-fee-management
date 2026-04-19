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
    <Card className="hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1 bg-white border-border/40 rounded-[1.5rem] overflow-hidden group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground/60">{title}</p>
            <p className="text-3xl font-extrabold text-foreground tracking-tight">{value}</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
            <Icon className="h-6 w-6" />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          {trend !== undefined && (
            <div className={cn(
               "flex items-center gap-1 text-sm font-bold w-fit px-2.5 py-1 rounded-full shadow-sm",
               trend > 0 ? "text-emerald-700 bg-emerald-500/10" : trend < 0 ? "text-destructive bg-destructive/10" : "text-foreground/70 bg-secondary"
            )}>
              {trend > 0 ? <ArrowUpRight className="h-4 w-4" /> : trend < 0 ? <ArrowDownRight className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
          <p className="text-sm text-foreground/50 font-medium">
            {insight}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
