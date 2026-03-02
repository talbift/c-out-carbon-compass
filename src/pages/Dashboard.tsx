import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";
import { Wind, Sun, Euro, AlertTriangle, TrendingUp, Leaf } from "lucide-react";

// ─── VRAIES DONNÉES HISTORIQUES (1990–2023) ───────────────────
const co2History = [
  { year: "1990", co2: 22.46 }, { year: "1991", co2: 23.54 },
  { year: "1992", co2: 25.22 }, { year: "1993", co2: 25.98 },
  { year: "1994", co2: 28.13 }, { year: "1995", co2: 29.27 },
  { year: "1996", co2: 28.92 }, { year: "1997", co2: 30.47 },
  { year: "1998", co2: 31.21 }, { year: "1999", co2: 32.85 },
  { year: "2000", co2: 33.57 }, { year: "2001", co2: 36.99 },
  { year: "2002", co2: 38.28 }, { year: "2003", co2: 38.11 },
  { year: "2004", co2: 42.83 }, { year: "2005", co2: 44.66 },
  { year: "2006", co2: 45.38 }, { year: "2007", co2: 46.02 },
  { year: "2008", co2: 49.47 }, { year: "2009", co2: 48.96 },
  { year: "2010", co2: 52.04 }, { year: "2011", co2: 56.28 },
  { year: "2012", co2: 58.55 }, { year: "2013", co2: 58.49 },
  { year: "2014", co2: 59.46 }, { year: "2015", co2: 61.15 },
  { year: "2016", co2: 61.01 }, { year: "2017", co2: 63.86 },
  { year: "2018", co2: 65.20 }, { year: "2019", co2: 71.87 },
  { year: "2020", co2: 67.59 }, { year: "2021", co2: 73.13 },
  { year: "2022", co2: 72.33 }, { year: "2023", co2: 70.05 },
];

const mixElectrique = [
  { name: "Fossiles", value: 33237, color: "#ef4444" },
  { name: "Renouvelables", value: 9009,  color: "#2D6A4F" },
];

const alertes = [
  {
    label: "CBAM — Jan 2026",
    value: "16.5 Mrd MAD",
    desc: "Exposition estimée 2027. Secteurs : ciment · engrais · acier",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.06)",
    border: "rgba(239,68,68,0.25)",
    icon: "⚠️",
  },
  {
    label: "PLF 2027 — Taxe nationale",
    value: "En cours",
    desc: "Taux officiel non publié. Entrée en vigueur progressive 2026–2030.",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.06)",
    border: "rgba(245,158,11,0.25)",
    icon: "📋",
  },
  {
    label: "Objectif NDC 2030",
    value: "52% ENR",
    desc: "Aujourd'hui : 20.7%. Progression : +3.1pp/an. Noor · Tarfaya · Jbel Khalladi",
    color: "#2D6A4F",
    bg: "rgba(45,106,79,0.06)",
    border: "rgba(45,106,79,0.25)",
    icon: "🌱",
  },
];

const kpis = [
  {
    title: "CO₂ Total 2023",
    value: "70.05 Mt",
    subtitle: "−2.1 Mt vs 2022",
    icon: Wind,
    trendUp: false,
    trend: "−3.0% vs 2022",
  },
  {
    title: "Part ENR",
    value: "20.7%",
    subtitle: "Mix électrique",
    icon: Sun,
    trendUp: true,
    trend: "+3.8pp vs 2022",
  },
  {
    title: "EU ETS",
    value: "65.34 €/t",
    subtitle: "Prix carbone EU",
    icon: Euro,
    trendUp: false,
    trend: "−19% vs 2022",
  },
  {
    title: "Exposition CBAM",
    value: "~2.1 Mrd MAD",
    subtitle: "Secteurs exportateurs",
    icon: AlertTriangle,
    trendUp: null,
    trend: "Nouveau · Jan 2026",
  },
];

// ─── CUSTOM TOOLTIP ───────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-border rounded-lg px-3 py-2 shadow-md text-sm">
        <p className="font-semibold text-foreground">{label}</p>
        <p className="text-primary font-bold">{payload[0].value.toFixed(2)} Mt CO₂</p>
      </div>
    );
  }
  return null;
};

const Dashboard = () => {
  const ndcTarget = 52;
  const currentENR = 20.7;
  const progress = (currentENR / ndcTarget) * 100;

  return (
    <div className="space-y-6 animate-fade-in">

      {/* ── Header ── */}
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">
          Tableau de bord · Maroc 2024
        </p>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
          Intelligence Carbone
        </h1>
        <p className="text-muted-foreground mt-1 text-sm max-w-xl">
          Anticipez votre exposition à la taxe carbone PLF 2027 et au CBAM européen.
          Simulez vos scénarios de décarbonation.
        </p>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.title}
            className="bg-card rounded-xl border border-border shadow-sm p-5 border-l-4 border-l-primary hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {kpi.title}
                </p>
                <p className="text-2xl font-display font-bold text-foreground">{kpi.value}</p>
                <p className="text-xs text-muted-foreground">{kpi.subtitle}</p>
              </div>
              <div className="p-2 bg-accent rounded-lg">
                <kpi.icon size={20} className="text-primary" />
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <span
                className="text-xs font-medium"
                style={{
                  color:
                    kpi.trendUp === true
                      ? "#2D6A4F"
                      : kpi.trendUp === false
                      ? "#ef4444"
                      : "#f59e0b",
                }}
              >
                {kpi.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* CO2 Line Chart — 2/3 width */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border shadow-sm p-6">
          <h3 className="font-display font-semibold text-foreground mb-1">
            Émissions CO₂ du Maroc
          </h3>
          <p className="text-xs text-muted-foreground mb-4">1990 – 2023 · Mt CO₂ équivalent</p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={co2History}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(37, 12%, 88%)" />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 10 }}
                stroke="hsl(214, 20%, 40%)"
                interval={4}
              />
              <YAxis
                tick={{ fontSize: 10 }}
                stroke="hsl(214, 20%, 40%)"
                domain={[15, 80]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="co2"
                stroke="#2D6A4F"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: "#52B788" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Mix électrique Pie — 1/3 */}
        <div className="bg-card rounded-xl border border-border shadow-sm p-6">
          <h3 className="font-display font-semibold text-foreground mb-1">
            Mix Électrique 2023
          </h3>
          <p className="text-xs text-muted-foreground mb-4">Total : 42 246 GWh</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={mixElectrique}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {mixElectrique.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v: number) => [`${v.toLocaleString()} GWh`, ""]}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid hsl(37, 12%, 88%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {mixElectrique.map((e) => (
              <div key={e.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: e.color }}
                  />
                  <span className="text-muted-foreground">{e.name}</span>
                </div>
                <span className="font-medium text-foreground">
                  {((e.value / 42246) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── NDC Progress ── */}
      <div className="bg-card rounded-xl border border-border shadow-sm p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Leaf size={18} className="text-primary" />
            <h3 className="font-display font-semibold text-foreground">
              Objectif NDC 2030 — Énergies Renouvelables
            </h3>
          </div>
          <span className="text-xs font-medium text-primary bg-accent px-2 py-1 rounded-full">
            {progress.toFixed(1)}% atteint
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Cible : <strong>52%</strong> du mix électrique · Actuel : <strong>20.7%</strong> · Manque : +3.1pp/an
        </p>
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(to right, #2D6A4F, #52B788)",
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>0%</span>
          <span className="text-primary font-medium">20.7% aujourd'hui</span>
          <span>52% (2030)</span>
        </div>
      </div>

      {/* ── Alertes ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {alertes.map((a) => (
          <div
            key={a.label}
            className="rounded-xl p-5"
            style={{
              background: a.bg,
              border: `1px solid ${a.border}`,
              borderTop: `3px solid ${a.color}`,
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-wide mb-2"
              style={{ color: a.color }}
            >
              {a.icon}  {a.label}
            </p>
            <p
              className="text-2xl font-display font-bold mb-2"
              style={{ color: a.color }}
            >
              {a.value}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">{a.desc}</p>
          </div>
        ))}
      </div>

      {/* ── Footer note ── */}
      <p className="text-xs text-muted-foreground text-center pb-2">
        Sources : WDI Banque Mondiale · IEA Energy Balances · EU ETS Ember/EEX · NDC Maroc 2030
        <br />
        {/* TODO: Replace hardcoded values with ML model predictions once API is connected */}
      </p>
    </div>
  );
};

export default Dashboard;
