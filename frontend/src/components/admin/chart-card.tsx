"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function ChartCard({ title, description, children, className }: ChartCardProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className={`rounded-2xl border-orange-900/10 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white ${className || ""}`}>
      <CardHeader>
        <CardTitle className="font-heading text-lg text-amber-950">{title}</CardTitle>
        {description && <CardDescription className="text-slate-500">{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="w-full h-[300px] rounded-xl" />
        ) : (
          <div className="w-full h-[300px] animate-in fade-in duration-500">
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
