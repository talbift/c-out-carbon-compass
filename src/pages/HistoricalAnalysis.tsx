import {
  LineChart, Line, BarChart, Bar, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { ChartCard } from "@/components/ChartCard";

// TODO: Replace with real historical data from API
const co2Trend = [
  { year: "1990", co2: 23.1 }, { year: "1993", co2: 25.8 }, { year: "1996", co2: 29.2 },
  { year: "1999", co2: 32.5 }, { year: "2002", co2: 36.8 }, { year: "2005", co2: 40.2 },
  { year: "2008", co2: 45.6 }, { year: "2011", co2: 50.3 }, { year: "2014", co2: 56.1 },
  { year: "2017", co2: 61.8 }, { year: "2020", co2: 55.8 }, { year: "2023", co2: 70.05 },
];

const gdpVsCo2 = [
  { gdp: 100, co2: 23 }, { gdp: 120, co2: 28 }, { gdp: 145, co2: 34 },
  { gdp: 175, co2: 40 }, { gdp: 210, co2: 49 }, { gdp: 240, co2: 56 },
  { gdp: 260, co2: 56 }, { gdp: 290, co2: 63 }, { gdp: 310, co2: 67 }, { gdp: 330, co2: 70 },
];

const enrShare = [
  { year: "2010", enr: 8.2 }, { year: "2012", enr: 9.5 }, { year: "2014", enr: 11.3 },
  { year: "2016", enr: 13.1 }, { year: "2018", enr: 15.8 }, { year: "2020", enr: 17.4 },
  { year: "2022", enr: 19.2 }, { year: "2023", enr: 20.7 },
];

const tooltipStyle = {
  backgroundColor: "white",
  border: "1px solid hsl(37, 12%, 88%)",
  borderRadius: "8px",
  fontSize: "13px",
};

const HistoricalAnalysis = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Analyse Historique</h1>
        <p className="text-muted-foreground mt-1">Tendances carbone et énergie du Maroc</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ChartCard title="Tendance CO₂" subtitle="Émissions 1990–2023 (Mt)">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={co2Trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(37, 12%, 88%)" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="hsl(214, 20%, 40%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(214, 20%, 40%)" />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="co2" stroke="hsl(155, 40%, 30%)" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="PIB vs CO₂" subtitle="Corrélation croissance/émissions">
          <ResponsiveContainer width="100%" height={280}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(37, 12%, 88%)" />
              <XAxis dataKey="gdp" name="PIB (Mrd MAD)" tick={{ fontSize: 11 }} stroke="hsl(214, 20%, 40%)" />
              <YAxis dataKey="co2" name="CO₂ (Mt)" tick={{ fontSize: 11 }} stroke="hsl(214, 20%, 40%)" />
              <Tooltip contentStyle={tooltipStyle} cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={gdpVsCo2} fill="hsl(152, 40%, 52%)" />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Évolution Part ENR" subtitle="Part des énergies renouvelables (%)">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={enrShare}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(37, 12%, 88%)" />
            <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="hsl(214, 20%, 40%)" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(214, 20%, 40%)" />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="enr" fill="hsl(155, 40%, 30%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
};

export default HistoricalAnalysis;
