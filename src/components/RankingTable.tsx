import { useState } from "react";
import { loadRankings, type RankingEntry } from "@/components/GummyGame";

type Speed = "relax" | "normal" | "fast" | "extreme";

const TABS: { key: Speed; label: string; emoji: string }[] = [
  { key: "relax", label: "Relajado", emoji: "🐢" },
  { key: "normal", label: "Normal", emoji: "🍭" },
  { key: "fast", label: "Rápido", emoji: "🔥" },
  { key: "extreme", label: "Extremo", emoji: "⚡" },
];

interface RankingTableProps {
  onClose: () => void;
}

export default function RankingTable({ onClose }: RankingTableProps) {
  const [tab, setTab] = useState<Speed>("normal");
  const rankings = loadRankings();
  const entries: RankingEntry[] = rankings[tab];

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="mt-6 glass-card rounded-2xl border-[3px] border-[hsl(var(--candy-rose))] p-6 animate-bounce-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-xl font-bold text-primary">
          🏆 Ranking
        </h3>
        <button
          onClick={onClose}
          className="font-sans text-sm font-bold text-muted-foreground hover:text-foreground transition-colors px-3 py-1 rounded-full border border-border hover:border-primary/50"
        >
          ✕ Cerrar
        </button>
      </div>

      {/* Speed tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`font-sans text-xs font-bold px-3 py-1.5 rounded-full border-2 transition-all ${
              tab === t.key
                ? "border-primary bg-primary text-primary-foreground scale-105"
                : "border-border bg-background text-foreground hover:border-primary/50"
            }`}
          >
            {t.emoji} {t.label}
          </button>
        ))}
      </div>

      {/* Table */}
      {entries.length === 0 ? (
        <p className="text-center text-muted-foreground font-sans text-sm py-8">
          Aún no hay puntajes en esta velocidad. ¡Sé el primero! 🍬
        </p>
      ) : (
        <div className="overflow-auto max-h-[300px]">
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="border-b-2 border-[hsl(var(--candy-coral))]">
                <th className="text-left py-2 px-2 text-muted-foreground font-semibold">#</th>
                <th className="text-left py-2 px-2 text-muted-foreground font-semibold">Nombre</th>
                <th className="text-right py-2 px-2 text-muted-foreground font-semibold">Puntos</th>
                <th className="text-right py-2 px-2 text-muted-foreground font-semibold">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e, i) => (
                <tr
                  key={i}
                  className={`border-b border-border/50 ${i < 3 ? "bg-[hsl(var(--candy-cream)/0.5)]" : ""}`}
                >
                  <td className="py-2 px-2 font-bold">
                    {i < 3 ? medals[i] : i + 1}
                  </td>
                  <td className="py-2 px-2 font-semibold text-foreground">{e.name}</td>
                  <td className="py-2 px-2 text-right font-bold text-primary">{e.score}</td>
                  <td className="py-2 px-2 text-right text-muted-foreground text-xs">{e.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
