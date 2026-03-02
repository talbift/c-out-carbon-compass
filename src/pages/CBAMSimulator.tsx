import { useState } from "react";
import { Zap, TrendingDown, Leaf, Clock } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, BarChart, Bar, Cell
} from "recharts";

// ─── CONSTANTES (depuis le dashboard Streamlit) ───────────────
const MAD_PER_EUR  = 10.9;
const CBAM_SHARE   = 0.23; // part des émissions exposées au CBAM
const EU_ETS_PROJ: Record<number, number> = {
  2026: 72, 2027: 74, 2028: 76, 2029: 79, 2030: 81
};

const formatMAD = (v: number) => {
  if (v >= 1e9)  return `${(v / 1e9).toFixed(2)} Mrd MAD`;
  if (v >= 1e6)  return `${(v / 1e6).toFixed(1)} M MAD`;
  return `${v.toFixed(0)} MAD`;
};

const CBAMSimulator = () => {
  const [emissions,    setEmissions]    = useState(0.5);    // Mt CO2
  const [exportPct,    setExportPct]    = useState(45);     // %
  const [enrReduction, setEnrReduction] = useState(15);     // % réduction CO2
  const [horizon,      setHorizon]      = useState(2027);

  const etsPrice = EU_ETS_PROJ[horizon] ?? 74;

  // ─── Calculs (logique identique au Streamlit) ────────────────
  const co2ExposedNow = emissions * 1e6 * (exportPct / 100);               // tonnes
  const co2ExposedRed = co2ExposedNow * (1 - enrReduction / 100);
  const cbamSans      = co2ExposedNow * etsPrice * MAD_PER_EUR;             // MAD
  const cbamAvec      = co2ExposedRed * etsPrice * MAD_PER_EUR;
  const economie      = cbamSans - cbamAvec;
  const roi           = enrReduction > 0 ? (economie / cbamSans) * 100 : 0;
  const payback       = roi > 0 ? (100 / roi).toFixed(1) : "—";

  // Courbe ROI selon % ENR (0→50%)
  const roiCurve = Array.from({ length: 11 }, (_, i) => {
    const pct  = i * 5;
    const cbam = co2ExposedNow * (1 - pct / 100) * etsPrice * MAD_PER_EUR;
    return { pct, saving: cbamSans - cbam };
  });

  // Barres comparaison sans/avec
  const barData = [
    { label: "Sans action", value: cbamSans,  color: "#ef4444" },
    { label: `Avec ${enrReduction}% ENR`, value: cbamAvec, color: "#2D6A4F" },
  ];

  const results = [
    {
      label: `Exposition CBAM ${horizon}`,
      value: formatMAD(cbamSans),
      sub: `${(co2ExposedNow / 1e6).toFixed(2)} Mt exposées`,
      icon: Zap,
      color: "#ef4444",
      bg: "rgba(239,68,68,0.06)",
      border: "rgba(239,68,68,0.3)",
    },
    {
      label: `Après ${enrReduction}% ENR`,
      value: formatMAD(cbamAvec),
      sub: `−${enrReduction}% émissions`,
      icon: Leaf,
      color: "#2D6A4F",
      bg: "rgba(45,106,79,0.06)",
      border: "rgba(45,106,79,0.3)",
    },
    {
      label: "Économie réalisée",
      value: formatMAD(economie),
      sub: `ROI ${roi.toFixed(1)}%`,
      icon: TrendingDown,
      color: "#52B788",
      bg: "rgba(82,183,136,0.06)",
      border: "rgba(82,183,136,0.3)",
    },
    {
      label: "Délai de retour",
      value: `${payback} ans`,
      sub: "Sur investissement ENR",
      icon: Clock,
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.06)",
      border: "rgba(245,158,11,0.3)",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">

      {/* ── Header ── */}
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">
          Outil de simulation
        </p>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
          Simulateur CBAM
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Estimez votre exposition au mécanisme d'ajustement carbone aux frontières (Jan 2026)
        </p>
      </div>

      {/* ── Paramètres ── */}
      <div className="bg-card rounded-xl border border-border shadow-sm p-6">
        <h3 className="font-display font-semibold text-foreground mb-5">
          Paramètres entreprise
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">
              Émissions annuelles (Mt CO₂)
            </label>
            <input
              type="number" min={0.01} max={50} step={0.05}
              value={emissions}
              onChange={(e) => setEmissions(+e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:outline-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Ex : OCP ≈ 3.5 Mt · Ciment du Maroc ≈ 1.2 Mt
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">
              Export vers UE (%)
            </label>
            <input
              type="number" min={0} max={100} step={5}
              value={exportPct}
              onChange={(e) => setExportPct(+e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:outline-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Seules les émissions des produits exportés vers l'UE sont taxées
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">
              Réduction CO₂ via ENR (%)
            </label>
            <input
              type="number" min={0} max={50} step={5}
              value={enrReduction}
              onChange={(e) => setEnrReduction(+e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:outline-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Baisse des émissions grâce à l'investissement ENR planifié
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">
              Horizon d'analyse
            </label>
            <select
              value={horizon}
              onChange={(e) => setHorizon(+e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:outline-none"
            >
              {[2026, 2027, 2028, 2029, 2030].map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground mt-1">
              Prix EU ETS {horizon} estimé :{" "}
              <strong className="text-foreground">{etsPrice} €/t</strong>
            </p>
          </div>
        </div>
      </div>

      {/* ── Résultats KPI ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {results.map((r) => (
          <div
            key={r.label}
            className="rounded-xl p-5"
            style={{
              background: r.bg,
              border: `1px solid ${r.border}`,
              borderTop: `3px solid ${r.color}`,
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {r.label}
              </p>
              <r.icon size={16} style={{ color: r.color }} />
            </div>
            <p className="text-2xl font-display font-bold" style={{ color: r.color }}>
              {r.value}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{r.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Charts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Bar : sans vs avec ENR */}
        <div className="bg-card rounded-xl border border-border shadow-sm p-6">
          <h3 className="font-display font-semibold text-foreground mb-1">
            Exposition CBAM {horizon}
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Sans action vs avec investissement ENR
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} barSize={60}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(37,12%,88%)" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} />
              <YAxis
                tick={{ fontSize: 10 }}
                tickFormatter={(v) => formatMAD(v).split(" ")[0]}
              />
              <Tooltip
                formatter={(v: number) => [formatMAD(v), "CBAM"]}
                contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {barData.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Courbe ROI */}
        <div className="bg-card rounded-xl border border-border shadow-sm p-6">
          <h3 className="font-display font-semibold text-foreground mb-1">
            Courbe ROI — Économies vs Effort ENR
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Économies CBAM selon le % de réduction CO₂ investi
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={roiCurve}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(37,12%,88%)" />
              <XAxis
                dataKey="pct"
                tick={{ fontSize: 10 }}
                tickFormatter={(v) => `${v}%`}
              />
              <YAxis
                tick={{ fontSize: 10 }}
                tickFormatter={(v) => formatMAD(v).split(" ")[0]}
              />
              <Tooltip
                formatter={(v: number) => [formatMAD(v), "Économie"]}
                labelFormatter={(l) => `${l}% ENR`}
                contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
              />
              <ReferenceLine
                x={enrReduction}
                stroke="#f59e0b"
                strokeDasharray="4 4"
                label={{ value: "Votre position", fontSize: 10, fill: "#f59e0b" }}
              />
              <Line
                type="monotone"
                dataKey="saving"
                stroke="#2D6A4F"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Note ── */}
      <div className="bg-accent/60 rounded-xl p-4 flex items-start gap-3 border border-border">
        <Zap size={18} className="text-primary mt-0.5 shrink-0" />
        <p className="text-sm text-muted-foreground">
          Prix EU ETS {horizon} estimé à <strong className="text-foreground">{etsPrice} €/t</strong> (source : projection Commission Européenne).
          Taux MAD/EUR : {MAD_PER_EUR}. Part émissions exposées CBAM : {(CBAM_SHARE * 100).toFixed(0)}% (secteurs éligibles).{" "}
          {/* TODO: Replace with real-time EU ETS price feed + ML model forecasts */}
        </p>
      </div>
    </div>
  );
};

export default CBAMSimulator;
