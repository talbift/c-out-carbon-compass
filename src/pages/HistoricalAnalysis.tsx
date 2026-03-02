import {
  LineChart, Line, BarChart, Bar, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine, AreaChart, Area,
} from "recharts";

// ─── VRAIES DONNÉES (1990–2023) ───────────────────────────────
const co2Full = [
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

// PIB réel Banque Mondiale (Mrd USD)
const gdpVsCo2 = [
  { gdp: 37.0,  co2: 22.46, year: "1990" },
  { gdp: 42.5,  co2: 28.13, year: "1994" },
  { gdp: 51.3,  co2: 31.21, year: "1998" },
  { gdp: 56.1,  co2: 33.57, year: "2000" },
  { gdp: 64.9,  co2: 38.11, year: "2003" },
  { gdp: 72.1,  co2: 44.66, year: "2005" },
  { gdp: 81.2,  co2: 52.04, year: "2010" },
  { gdp: 90.2,  co2: 58.49, year: "2013" },
  { gdp: 100.2, co2: 61.01, year: "2016" },
  { gdp: 107.1, co2: 65.20, year: "2018" },
  { gdp: 103.8, co2: 67.59, year: "2020" },
  { gdp: 134.9, co2: 72.33, year: "2022" },
  { gdp: 141.1, co2: 70.05, year: "2023" },
];

// ENR réelle WDI (%)
const enrShare = [
  { year: "1990", enr: 12.7 }, { year: "1995", enr: 5.1  },
  { year: "2000", enr: 6.1  }, { year: "2005", enr: 6.1  },
  { year: "2008", enr: 13.9 }, { year: "2010", enr: 17.6 },
  { year: "2012", enr: 8.6  }, { year: "2014", enr: 12.3 },
  { year: "2016", enr: 14.7 }, { year: "2018", enr: 18.3 },
  { year: "2019", enr: 18.3 }, { year: "2020", enr: 17.6 },
  { year: "2021", enr: 18.4 }, { year: "2022", enr: 16.9 },
  { year: "2023", enr: 20.7 },
];

// Prix EU ETS (EUR/t) — Phase I à III
const etsPrice = [
  { year: "2005", price: 22.33 }, { year: "2006", price: 17.84 },
  { year: "2007", price: 0.74  }, { year: "2008", price: 22.20 },
  { year: "2009", price: 13.37 }, { year: "2010", price: 14.39 },
  { year: "2011", price: 13.06 }, { year: "2012", price: 7.38  },
  { year: "2013", price: 4.51  }, { year: "2014", price: 5.99  },
  { year: "2015", price: 7.63  }, { year: "2016", price: 5.34  },
  { year: "2017", price: 5.84  }, { year: "2018", price: 15.88 },
  { year: "2019", price: 24.77 }, { year: "2020", price: 24.72 },
  { year: "2021", price: 53.15 }, { year: "2022", price: 80.93 },
  { year: "2023", price: 65.34 },
];

const tt = {
  backgroundColor: "white",
  border: "1px solid hsl(37, 12%, 88%)",
  borderRadius: "8px",
  fontSize: "12px",
};

const TabBtn = ({
  active, onClick, children,
}: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
      active
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-accent"
    }`}
  >
    {children}
  </button>
);

import { useState } from "react";

const HistoricalAnalysis = () => {
  const [tab, setTab] = useState<"co2" | "energie" | "ets">("co2");

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">
          34 années de données · WDI · IEA · EU ETS
        </p>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
          Analyse Historique
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Tendances carbone, énergétiques et prix CO₂ du Maroc — 1990–2023
        </p>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-2 flex-wrap">
        <TabBtn active={tab === "co2"}    onClick={() => setTab("co2")}>CO₂ & Économie</TabBtn>
        <TabBtn active={tab === "energie"} onClick={() => setTab("energie")}>Énergie & ENR</TabBtn>
        <TabBtn active={tab === "ets"}    onClick={() => setTab("ets")}>Prix Carbone EU ETS</TabBtn>
      </div>

      {/* ── Tab CO2 & ECONOMIE ── */}
      {tab === "co2" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

            {/* CO2 area chart */}
            <div className="bg-card rounded-xl border border-border shadow-sm p-6">
              <h3 className="font-display font-semibold text-foreground mb-1">
                Émissions CO₂ — 1990–2023
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Mt CO₂ équivalent · Source : WDI Banque Mondiale
              </p>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={co2Full}>
                  <defs>
                    <linearGradient id="co2Grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#2D6A4F" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#2D6A4F" stopOpacity={0}   />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(37,12%,88%)" />
                  <XAxis dataKey="year" tick={{ fontSize: 9 }} interval={3} stroke="hsl(214,20%,40%)" />
                  <YAxis tick={{ fontSize: 10 }} stroke="hsl(214,20%,40%)" domain={[15, 80]} />
                  <Tooltip contentStyle={tt} formatter={(v: number) => [`${v.toFixed(2)} Mt`, "CO₂"]} />
                  <ReferenceLine y={73.13} stroke="#f59e0b" strokeDasharray="4 4"
                    label={{ value: "Max 2021", fontSize: 9, fill: "#f59e0b" }} />
                  <Area
                    type="monotone" dataKey="co2"
                    stroke="#2D6A4F" strokeWidth={2.5}
                    fill="url(#co2Grad)" dot={false}
                    activeDot={{ r: 5, fill: "#52B788" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* PIB scatter */}
            <div className="bg-card rounded-xl border border-border shadow-sm p-6">
              <h3 className="font-display font-semibold text-foreground mb-1">
                Découplage CO₂ / PIB
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Le Maroc se décarbonne-t-il relativement ? · Mrd USD vs Mt
              </p>
              <ResponsiveContainer width="100%" height={260}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(37,12%,88%)" />
                  <XAxis
                    dataKey="gdp" name="PIB"
                    tick={{ fontSize: 10 }} stroke="hsl(214,20%,40%)"
                    label={{ value: "PIB (Mrd USD)", fontSize: 10, fill: "hsl(214,20%,40%)", dy: 14 }}
                  />
                  <YAxis
                    dataKey="co2" name="CO₂"
                    tick={{ fontSize: 10 }} stroke="hsl(214,20%,40%)"
                    label={{ value: "CO₂ (Mt)", fontSize: 10, fill: "hsl(214,20%,40%)", angle: -90, dx: -14 }}
                  />
                  <Tooltip
                    contentStyle={tt}
                    formatter={(v: number, name: string) => [
                      name === "PIB" ? `${v} Mrd USD` : `${v} Mt`,
                      name,
                    ]}
                    content={({ active, payload }) => {
                      if (active && payload?.length) {
                        const d = payload[0].payload;
                        return (
                          <div style={tt} className="px-3 py-2">
                            <p className="font-bold text-foreground">{d.year}</p>
                            <p className="text-primary">PIB : {d.gdp} Mrd USD</p>
                            <p className="text-green-700">CO₂ : {d.co2} Mt</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter data={gdpVsCo2} fill="#52B788" />
                </ScatterChart>
              </ResponsiveContainer>
              <p className="text-xs text-muted-foreground mt-2 italic">
                💡 Les points récents (2022–2023) montrent une pente moins raide → découplage relatif amorcé.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab ENERGIE & ENR ── */}
      {tab === "energie" && (
        <div className="space-y-4">
          <div className="bg-card rounded-xl border border-border shadow-sm p-6">
            <h3 className="font-display font-semibold text-foreground mb-1">
              Part des Énergies Renouvelables
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              % du mix électrique · Source : WDI · Objectif NDC 52% en 2030
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={enrShare}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(37,12%,88%)" />
                <XAxis dataKey="year" tick={{ fontSize: 10 }} stroke="hsl(214,20%,40%)" />
                <YAxis tick={{ fontSize: 10 }} stroke="hsl(214,20%,40%)" domain={[0, 55]} />
                <Tooltip
                  contentStyle={tt}
                  formatter={(v: number) => [`${v.toFixed(1)}%`, "ENR"]}
                />
                <ReferenceLine y={52} stroke="#ef4444" strokeDasharray="4 4"
                  label={{ value: "Cible NDC 52%", fontSize: 9, fill: "#ef4444", position: "insideTopRight" }} />
                <Bar dataKey="enr" fill="#2D6A4F" radius={[4, 4, 0, 0]}>
                  {enrShare.map((e, i) => (
                    <rect key={i} fill={e.enr >= 18 ? "#52B788" : "#2D6A4F"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Faits clés */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Centrale Noor (Ouarzazate)", value: "580 MW", sub: "Plus grande centrale CSP d'Afrique", color: "#f59e0b" },
              { label: "Production ENR 2023", value: "9 009 GWh", sub: "+25% vs 2022 · Source IEA", color: "#2D6A4F" },
              { label: "Progression vers NDC", value: "39.8%", sub: "Chemin parcouru vers l'objectif 52%", color: "#52B788" },
            ].map((f) => (
              <div
                key={f.label}
                className="bg-card rounded-xl border border-border p-5"
                style={{ borderTop: `3px solid ${f.color}` }}
              >
                <p className="text-xs text-muted-foreground mb-1">{f.label}</p>
                <p className="text-2xl font-display font-bold" style={{ color: f.color }}>{f.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{f.sub}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab EU ETS ── */}
      {tab === "ets" && (
        <div className="space-y-4">
          <div className="bg-card rounded-xl border border-border shadow-sm p-6">
            <h3 className="font-display font-semibold text-foreground mb-1">
              Prix EU ETS 2005–2023
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              EUR/tonne CO₂ · Source : Ember / EEX · Référence CBAM pour les exportateurs marocains
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={etsPrice}>
                <defs>
                  <linearGradient id="etsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(37,12%,88%)" />
                <XAxis dataKey="year" tick={{ fontSize: 10 }} stroke="hsl(214,20%,40%)" />
                <YAxis tick={{ fontSize: 10 }} stroke="hsl(214,20%,40%)" domain={[0, 90]} />
                <Tooltip
                  contentStyle={tt}
                  formatter={(v: number) => [`${v.toFixed(2)} €/t`, "EU ETS"]}
                />
                <ReferenceLine x="2007" stroke="#f59e0b" strokeDasharray="3 3"
                  label={{ value: "Crash Phase I", fontSize: 8, fill: "#f59e0b" }} />
                <ReferenceLine x="2022" stroke="#ef4444" strokeDasharray="3 3"
                  label={{ value: "Pic crise énergie", fontSize: 8, fill: "#ef4444" }} />
                <Area
                  type="monotone" dataKey="price"
                  stroke="#ef4444" strokeWidth={2.5}
                  fill="url(#etsGrad)" dot={{ r: 3, fill: "#ef4444" }}
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-accent/50 rounded-xl p-4 border border-border">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Note CBAM :</strong> Ces prix EU ETS européens servent de{" "}
              <strong className="text-primary">référence CBAM</strong> pour les exportateurs marocains vers l'UE
              à partir de janvier 2026. Le Maroc n'a pas encore de marché carbone domestique —
              la taxe nationale PLF 2027 est en cours de finalisation.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoricalAnalysis;
