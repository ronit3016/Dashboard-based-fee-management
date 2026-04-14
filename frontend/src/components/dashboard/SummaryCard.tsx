import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function SummaryCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
}: SummaryCardProps) {
  return (
    <Card className={cn("overflow-hidden border-none shadow-sm shadow-primary/5 transition-all hover:shadow-md", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        {(description || trend) && (
          <div className="mt-1 flex items-center gap-1.5 text-xs">
            {trend && (
              <span
                className={cn(
                  "flex items-center font-medium",
                  trend.isPositive ? "text-emerald-600" : "text-rose-600"
                )}
              >
                {trend.isPositive ? (
                  <ArrowUpRight className="mr-0.5 h-3 w-3" />
                ) : (
                  <ArrowDownRight className="mr-0.5 h-3 w-3" />
                )}
                {trend.value}%
              </span>
            )}
            {description && <span className="text-muted-foreground">{description}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
