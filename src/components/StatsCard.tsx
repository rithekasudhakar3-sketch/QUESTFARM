import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: "up" | "down" | "neutral";
  gradient?: boolean;
}

const StatsCard = ({ title, value, icon: Icon, description, trend, gradient = false }: StatsCardProps) => {
  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-success";
      case "down":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className={`p-6 hover:shadow-nature transition-all duration-300 ${gradient ? "bg-gradient-nature text-primary-foreground" : "bg-card"}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${gradient ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
            {title}
          </p>
          <p className={`text-2xl font-bold ${gradient ? "text-primary-foreground" : "text-card-foreground"}`}>
            {value}
          </p>
          {description && (
            <p className={`text-xs ${gradient ? "text-primary-foreground/70" : getTrendColor()}`}>
              {description}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${gradient ? "bg-white/20" : "bg-primary/10"}`}>
          <Icon className={`h-6 w-6 ${gradient ? "text-primary-foreground" : "text-primary"}`} />
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;