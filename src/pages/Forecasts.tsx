import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChartCard } from "@/components/ChartCard";

// TODO: Replace with ML model API call
function generateForecast(gdpGrowth: number, enrDelta: number) {
  const baseEmissions = 70.05;
  const years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

  return years.map((year) => {
    const t = year - 2023;
    const optimiste = baseEmissions * Math.pow(1 - 0.03 - enrDelta / 100, t) * Math.pow(1 + gdpGrowth / 200, t);
    const base = baseEmissions * Math.pow(1 - 0.01, t) * Math.pow(1 + gdpGrowth / 100, t);
    const pessimiste = baseEmissions * Math.pow(1 + 0.02 + gdpGrowth / 80, t);
    return {
      year: year.toString(),
      Optimiste: +optimiste.toFixed(1),
      Base: +base.toFixed(1),
      Pessimiste: +pessimiste.toFixed(1),
    };
  });
}

const Forecasts = () => {
  const [gdpGrowth, setGdpGrowth] = useState(3.5);
  const [enrDelta, setEnrDelta] = useState(2.0);
  const data = generateForecast(gdpGrowth, enrDelta);
  const result2030 = data[data.length - 1];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Prévisions 2030</h1>
        <p className="text-muted-foreground mt-1">Scénarios d'émissions selon vos hypothèses</p>
      </div>

      {/* Sliders */}
      <div className="bg-card rounded-lg border border-border shadow-sm p-6">
        <h3 className="font-display font-semibold text-foreground mb-4">Paramètres de simulation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Croissance PIB: <span className="text-primary font-bold">{gdpGrowth}%</span>
            </label>
            <input
              type="range" min={0} max={8} step={0.5} value={gdpGrowth}
              onChange={(e) => setGdpGrowth(+e.target.value)}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0%</span><span>8%</span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Delta ENR annuel: <span className="text-primary font-bold">{enrDelta}%</span>
            </label>
            <input
              type="range" min={0} max={5} step={0.5} value={enrDelta}
              onChange={(e) => setEnrDelta(+e.target.value)}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0%</span><span>5%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Optimiste", value: result2030.Optimiste, color: "text-secondary" },
          { label: "Base", value: result2030.Base, color: "text-primary" },
          { label: "Pessimiste", value: result2030.Pessimiste, color: "text-destructive" },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-lg border border-border shadow-sm p-5 text-center">
            <p className="text-sm text-muted-foreground">{s.label} 2030</p>
            <p className={`text-3xl font-display font-bold mt-1 ${s.color}`}>{s.value} Mt</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <ChartCard title="Trajectoires CO₂" subtitle="3 scénarios 2023–2030">
        <ResponsiveContainer width="100%" height={340}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(37, 12%, 88%)" />
            <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="hsl(214, 20%, 40%)" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(214, 20%, 40%)" />
            <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid hsl(37, 12%, 88%)", borderRadius: "8px", fontSize: "13px" }} />
            <Legend />
            <Line type="monotone" dataKey="Optimiste" stroke="hsl(152, 40%, 52%)" strokeWidth={2} strokeDasharray="5 5" />
            <Line type="monotone" dataKey="Base" stroke="hsl(155, 40%, 30%)" strokeWidth={2.5} />
            <Line type="monotone" dataKey="Pessimiste" stroke="hsl(0, 72%, 51%)" strokeWidth={2} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
};

export default Forecasts;
