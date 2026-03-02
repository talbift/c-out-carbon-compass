import { Factory, TrendingUp } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from "recharts";

// ─── DONNÉES RÉELLES (depuis le dashboard Streamlit) ─────────
const sectors = [
  {
    name: "Électricité Fossile",
    risk: "ÉLEVÉ",
    riskColor: "#ef4444",
    riskBg: "rgba(239,68,68,0.1)",
    co2Mt: 15.8,
    exportEU: 18,
    cbamMMad: Math.round(15.8e6 * 0.18 * 74 * 10.9 / 1e6),
    desc: "Principale source d'émissions. Centrales charbon (Jerada) et fuel oil.",
  },
  {
    name: "Ciment & BTP",
    risk: "ÉLEVÉ",
    riskColor: "#ef4444",
    riskBg: "rgba(239,68,68,0.1)",
    co2Mt: 12.1,
    exportEU: 45,
    cbamMMad: Math.round(12.1e6 * 0.45 * 74 * 10.9 / 1e6),
    desc: "Fort taux d'export vers l'UE. Secteur prioritaire CBAM — clinker & ciment.",
  },
  {
    name: "Transport",
    risk: "MOYEN",
    riskColor: "#f59e0b",
    riskBg: "rgba(245,158,11,0.1)",
    co2Mt: 9.4,
    exportEU: 22,
    cbamMMad: Math.round(9.4e6 * 0.22 * 74 * 10.9 / 1e6),
    desc: "Émissions croissantes. Hors scope CBAM actuel mais sous surveillance.",
  },
  {
    name: "Engrais & Chimie",
    risk: "ÉLEVÉ",
    riskColor: "#ef4444",
    riskBg: "rgba(239,68,68,0.1)",
    co2Mt: 7.2,
    exportEU: 65,
    cbamMMad: Math.round(7.2e6 * 0.65 * 74 * 10.9 / 1e6),
    desc: "OCP Group — très exposé. 65% de production exportée vers l'UE. Engrais dans le scope CBAM.",
  },
  {
    name: "Bâtiment",
    risk: "FAIBLE",
    riskColor: "#2D6A4F",
    riskBg: "rgba(45,106,79,0.1)",
    co2Mt: 5.3,
    exportEU: 8,
    cbamMMad: Math.round(5.3e6 * 0.08 * 74 * 10.9 / 1e6),
    desc: "Faible exposition directe. Fort potentiel d'efficacité énergétique.",
  },
  {
    name: "Agro-alimentaire",
    risk: "MOYEN",
    riskColor: "#f59e0b",
    riskBg: "rgba(245,158,11,0.1)",
    co2Mt: 2.1,
    exportEU: 30,
    cbamMMad: Math.round(2.1e6 * 0.30 * 74 * 10.9 / 1e6),
    desc: "Exposition modérée. Règlement déforestation UE (EUDR) à surveiller.",
  },
];

const ndcObjectives = [
  { label: "Part Renouvelable",         current: 20.7, target: 52.0, color: "#2D6A4F",  unit: "%" },
  { label: "Réduction Intensité CO₂",   current: 21.0, target: 45.0, color: "#52B788",  unit: "%" },
  { label: "Efficacité Énergétique",    current: 34.0, target: 20.0, color: "#f59e0b",  unit: "%" },
  { label: "Capacité Solaire installée",current: 3.2,  target: 8.0,  color: "#2D6A4F",  unit: " GW" },
  { label: "Conformité PLF 2027",       current: 15.0, target: 100.0,color: "#ef4444",  unit: "%" },
];

const tt = {
  backgroundColor: "white",
  border: "1px solid hsl(37,12%,88%)",
  borderRadius: "8px",
  fontSize: "12px",
};

const RiskSectors = () => {
  const totalCBAM = sectors.reduce((s, x) => s + x.cbamMMad, 0);

  return (
    <div className="space-y-6 animate-fade-in">

      {/* ── Header ── */}
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">
          Exposition CBAM · Estimation 2027 · Prix EU ETS 74 €/t
        </p>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
          Secteurs à Risque
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Évaluation de l'exposition sectorielle au CBAM européen
        </p>
      </div>

      {/* ── Résumé ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Exposition totale 2027",    value: `${(totalCBAM / 1000).toFixed(1)} Mrd MAD`, color: "#ef4444", sub: "Tous secteurs éligibles CBAM" },
          { label: "Secteurs ÉLEVÉ",             value: "3 secteurs", color: "#ef4444", sub: "Électricité · Ciment · Engrais" },
          { label: "Export UE max exposé",       value: "65%", color: "#f59e0b", sub: "Engrais & Chimie (OCP)" },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-5"
            style={{ borderTop: `3px solid ${s.color}` }}>
            <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
            <p className="text-2xl font-display font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Main grid : cards + bar chart ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

        {/* Cards — 3/5 */}
        <div className="lg:col-span-3 space-y-3">
          {sectors.map((s) => {
            const barPct = Math.round((s.co2Mt / 15.8) * 100);
            return (
              <div
                key={s.name}
                className="bg-card rounded-xl border border-border p-4 hover:shadow-md transition-shadow"
                style={{ borderLeft: `4px solid ${s.riskColor}` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Factory size={16} className="text-primary shrink-0" />
                    <h3 className="font-display font-semibold text-foreground text-sm">{s.name}</h3>
                  </div>
                  <span
                    className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                    style={{ color: s.riskColor, background: s.riskBg, border: `1px solid ${s.riskColor}44` }}
                  >
                    {s.risk}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{s.desc}</p>
                <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                  <div>
                    <p className="text-muted-foreground">Émissions</p>
                    <p className="font-semibold text-foreground">{s.co2Mt} Mt</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Export UE</p>
                    <p className="font-semibold text-foreground">{s.exportEU}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">CBAM 2027</p>
                    <p className="font-bold" style={{ color: s.riskColor }}>{s.cbamMMad.toLocaleString()} M MAD</p>
                  </div>
                </div>
                {/* Progress bar CO2 */}
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full"
                    style={{ width: `${barPct}%`, backgroundColor: s.riskColor }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bar chart — 2/5 */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border shadow-sm p-6">
          <h3 className="font-display font-semibold text-foreground mb-1 text-sm">
            Exposition CBAM 2027
          </h3>
          <p className="text-xs text-muted-foreground mb-4">Millions MAD · Prix EU ETS 74 €/t</p>
          <ResponsiveContainer width="100%" height={380}>
            <BarChart
              data={sectors.map((s) => ({ name: s.name.split(" ")[0], value: s.cbamMMad, color: s.riskColor }))}
              layout="vertical"
              barSize={20}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(37,12%,88%)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 9 }} tickFormatter={(v) => `${v}M`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={72} />
              <Tooltip
                contentStyle={tt}
                formatter={(v: number) => [`${v.toLocaleString()} M MAD`, "CBAM 2027"]}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {sectors.map((s, i) => (
                  <Cell key={i} fill={s.riskColor} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Feuille de route NDC ── */}
      <div className="bg-card rounded-xl border border-border shadow-sm p-6">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp size={18} className="text-primary" />
          <h3 className="font-display font-semibold text-foreground">
            Feuille de Route Décarbonation — Objectifs NDC 2030
          </h3>
        </div>
        <div className="space-y-4">
          {ndcObjectives.map((obj) => {
            const pct = Math.min((obj.current / obj.target) * 100, 100);
            return (
              <div key={obj.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-foreground">{obj.label}</span>
                  <span className="text-xs font-medium" style={{ color: obj.color }}>
                    {obj.current}{obj.unit} / {obj.target}{obj.unit}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, backgroundColor: obj.color }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{pct.toFixed(1)}% de l'objectif atteint</p>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center pb-2">
        Sources : IEA Energy Balances · OCP Group · Ministère Transition Énergétique · PLF 2027
        {/* TODO: Connect to real-time sector emissions data */}
      </p>
    </div>
  );
};

export default RiskSectors;
