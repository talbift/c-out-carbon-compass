import { Factory } from "lucide-react";

// TODO: Replace with real sector data from ML risk assessment model
const sectors = [
  {
    name: "Ciment",
    risk: "Élevé",
    riskColor: "bg-destructive",
    emissions: "12.3 Mt",
    exportEU: "35%",
    cbamExposure: "890 M MAD",
    description: "Principale source d'émissions industrielles. Forte dépendance aux combustibles fossiles.",
  },
  {
    name: "Acier",
    risk: "Élevé",
    riskColor: "bg-destructive",
    emissions: "8.7 Mt",
    exportEU: "42%",
    cbamExposure: "720 M MAD",
    description: "Secteur très exposé au CBAM avec une part importante d'export vers l'UE.",
  },
  {
    name: "Engrais",
    risk: "Moyen",
    riskColor: "bg-warning",
    emissions: "4.2 Mt",
    exportEU: "28%",
    cbamExposure: "310 M MAD",
    description: "Exposition modérée. Potentiel de transition vers des procédés verts.",
  },
  {
    name: "Céramique",
    risk: "Moyen",
    riskColor: "bg-warning",
    emissions: "2.8 Mt",
    exportEU: "22%",
    cbamExposure: "180 M MAD",
    description: "Risque modéré avec des opportunités d'optimisation énergétique.",
  },
  {
    name: "Textile",
    risk: "Faible",
    riskColor: "bg-success",
    emissions: "1.1 Mt",
    exportEU: "55%",
    cbamExposure: "45 M MAD",
    description: "Faibles émissions directes malgré un fort taux d'export. Hors scope CBAM actuel.",
  },
];

const RiskSectors = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Secteurs à Risque</h1>
        <p className="text-muted-foreground mt-1">Évaluation de l'exposition CBAM par secteur industriel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {sectors.map((sector) => (
          <div key={sector.name} className="bg-card rounded-lg border border-border shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Factory size={20} className="text-primary" />
                <h3 className="font-display font-semibold text-foreground">{sector.name}</h3>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full text-primary-foreground ${sector.riskColor}`}>
                {sector.risk}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{sector.description}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Émissions</span>
                <span className="font-medium text-foreground">{sector.emissions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Export UE</span>
                <span className="font-medium text-foreground">{sector.exportEU}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <span className="text-muted-foreground">Exposition CBAM</span>
                <span className="font-display font-bold text-foreground">{sector.cbamExposure}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskSectors;
