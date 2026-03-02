import { useState } from "react";
import { Zap } from "lucide-react";

// TODO: Connect to real EU ETS price feed
const EU_ETS_PRICE = 65.34; // €/t
const MAD_EUR = 10.8; // approximate exchange rate

const CBAMSimulator = () => {
  const [emissions, setEmissions] = useState(0.5);
  const [exportPct, setExportPct] = useState(40);
  const [enrInvestment, setEnrInvestment] = useState(500);

  // TODO: Replace with ML model calculations
  const cbamExposure = emissions * (exportPct / 100) * EU_ETS_PRICE * 1_000_000 / MAD_EUR;
  const enrReduction = enrInvestment * 0.15; // simplified: 15% of investment reduces exposure
  const savings = Math.min(cbamExposure, enrReduction * 1_000_000);
  const roi = enrInvestment > 0 ? ((savings / (enrInvestment * 1_000_000)) * 100) : 0;
  const payback = roi > 0 ? (100 / roi) : 0;

  const formatMAD = (v: number) => {
    if (v >= 1e9) return `${(v / 1e9).toFixed(1)} Mrd MAD`;
    if (v >= 1e6) return `${(v / 1e6).toFixed(1)} M MAD`;
    return `${v.toFixed(0)} MAD`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Simulateur CBAM</h1>
        <p className="text-muted-foreground mt-1">Estimez votre exposition au mécanisme d'ajustement carbone</p>
      </div>

      {/* Inputs */}
      <div className="bg-card rounded-lg border border-border shadow-sm p-6">
        <h3 className="font-display font-semibold text-foreground mb-4">Paramètres entreprise</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Émissions (Mt CO₂)</label>
            <input
              type="number" min={0} max={50} step={0.1} value={emissions}
              onChange={(e) => setEmissions(+e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Export vers UE (%)</label>
            <input
              type="number" min={0} max={100} step={1} value={exportPct}
              onChange={(e) => setExportPct(+e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Investissement ENR (M MAD)</label>
            <input
              type="number" min={0} max={10000} step={50} value={enrInvestment}
              onChange={(e) => setEnrInvestment(+e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Exposition CBAM", value: formatMAD(cbamExposure), color: "border-l-destructive" },
          { label: "Économies estimées", value: formatMAD(savings), color: "border-l-secondary" },
          { label: "ROI ENR", value: `${roi.toFixed(1)}%`, color: "border-l-primary" },
          { label: "Délai retour", value: `${payback.toFixed(1)} ans`, color: "border-l-primary" },
        ].map((r) => (
          <div key={r.label} className={`bg-card rounded-lg border border-border shadow-sm p-5 border-l-4 ${r.color}`}>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">{r.label}</p>
            <p className="text-2xl font-display font-bold text-foreground mt-2">{r.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-accent/50 rounded-lg p-4 flex items-start gap-3">
        <Zap size={20} className="text-primary mt-0.5 shrink-0" />
        <p className="text-sm text-muted-foreground">
          {/* TODO: Replace with dynamic analysis from ML model */}
          Les calculs utilisent le prix EU ETS actuel de {EU_ETS_PRICE} €/t. Les économies sont estimées
          sur base d'un facteur de réduction simplifié. Connectez votre modèle ML pour des projections plus précises.
        </p>
      </div>
    </div>
  );
};

export default CBAMSimulator;
