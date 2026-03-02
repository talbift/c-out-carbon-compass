import { Wind, Sun, Euro, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { KPICard } from "@/components/KPICard";
import { ChartCard } from "@/components/ChartCard";

// TODO: Replace with real API data from ML model
const co2History = [
  { year: "1990", co2: 23.1 }, { year: "1995", co2: 28.4 }, { year: "2000", co2: 33.7 },
  { year: "2005", co2: 40.2 }, { year: "2010", co2: 48.9 }, { year: "2015", co2: 58.3 },
  { year: "2018", co2: 63.1 }, { year: "2020", co2: 55.8 }, { year: "2021", co2: 62.4 },
  { year: "2022", co2: 67.3 }, { year: "2023", co2: 70.05 },
];

const kpis = [
  { title: "CO₂ 2023", value: "70.05 Mt", subtitle: "Émissions totales", icon: Wind, trend: "+4.1%" },
  { title: "Part ENR", value: "20.7%", subtitle: "Énergies renouvelables", icon: Sun, trend: "+2.3%" },
  { title: "EU ETS", value: "65.34 €/t", subtitle: "Prix carbone EU", icon: Euro, trend: "+12.4%" },
  { title: "Exposition CBAM", value: "~2.1 Mrd MAD", subtitle: "Risque estimé", icon: AlertTriangle, trend: "Nouveau" },
];

const Dashboard = () => {
  const ndcTarget = 52;
  const currentENR = 20.7;
  const progress = (currentENR / ndcTarget) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Vue d'ensemble</h1>
        <p className="text-muted-foreground mt-1">Tableau de bord carbone du Maroc</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* CO2 Trend Chart */}
      <ChartCard title="Émissions CO₂ du Maroc" subtitle="1990 – 2023 (Mt CO₂)">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={co2History}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(37, 12%, 88%)" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="hsl(214, 20%, 40%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(214, 20%, 40%)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid hsl(37, 12%, 88%)",
                borderRadius: "8px",
                fontSize: "13px",
              }}
            />
            <Line
              type="monotone"
              dataKey="co2"
              stroke="hsl(155, 40%, 30%)"
              strokeWidth={3}
              dot={{ fill: "hsl(155, 40%, 30%)", r: 4 }}
              activeDot={{ r: 6, fill: "hsl(152, 40%, 52%)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* NDC Progress */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
        <h3 className="font-display font-semibold text-foreground mb-2">Objectif NDC 2030</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Cible: {ndcTarget}% ENR — Actuel: {currentENR}%
        </p>
        <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">{progress.toFixed(1)}% de l'objectif atteint</p>
      </div>
    </div>
  );
};

export default Dashboard;
