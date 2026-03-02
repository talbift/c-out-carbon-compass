import { ReactNode } from "react";

interface KPICardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  trend: string;
}

export function KPICard({ title, value, subtitle, icon: Icon, trend }: KPICardProps) {
  return (
    <div className="bg-card rounded-lg border border-border shadow-sm p-5 border-l-4 border-l-primary">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
          <p className="text-2xl font-display font-bold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <div className="p-2 bg-accent rounded-lg">
          <Icon size={20} className="text-primary" />
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-border">
        <span className="text-xs font-medium text-secondary">{trend}</span>
      </div>
    </div>
  );
}
