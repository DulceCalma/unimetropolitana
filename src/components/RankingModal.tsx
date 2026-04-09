import { useState } from "react";

interface RankingModalProps {
  score: number;
  speed: string;
  onSubmit: (name: string) => void;
  onClose: () => void;
}

export default function RankingModal({ score, speed, onSubmit, onClose }: RankingModalProps) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (trimmed) {
      onSubmit(trimmed);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="glass-card rounded-3xl border-[4px] border-[hsl(var(--candy-rose))] shadow-2xl p-8 max-w-sm w-full animate-bounce-in">
        <h3 className="font-serif text-2xl font-bold text-primary text-center mb-1">
          🎉 ¡Juego terminado!
        </h3>
        <p className="text-center text-muted-foreground text-sm mb-4">
          Velocidad: <span className="font-bold">{speed}</span>
        </p>
        <p className="text-center font-sans text-3xl font-bold text-primary mb-6">
          ⭐ {score} puntos
        </p>
        <label className="block font-sans text-sm font-semibold text-foreground mb-2">
          Ingresa tu nombre para el ranking:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          maxLength={20}
          placeholder="Tu nombre..."
          className="w-full px-4 py-3 rounded-xl border-2 border-[hsl(var(--candy-coral))] bg-[hsl(var(--candy-cream))] font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors mb-4"
          autoFocus
        />
        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="flex-1 font-sans font-bold text-base px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, hsl(340 82% 65%), hsl(350 65% 72%))",
              color: "white",
            }}
          >
            ✅ Guardar
          </button>
          <button
            onClick={onClose}
            className="font-sans font-bold text-base px-6 py-3 rounded-full border-2 border-border text-muted-foreground hover:scale-105 transition-all"
          >
            Omitir
          </button>
        </div>
      </div>
    </div>
  );
}
