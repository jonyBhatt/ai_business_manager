import { motion } from "framer-motion";

export function MiniBarChart({ values, labels, tone = "accent", height = 120 }) {
  const max = Math.max(...values, 1);
  const barColor = tone === "signal" ? "var(--color-signal)" : tone === "gold" ? "var(--color-gold)" : "var(--color-accent)";

  return (
    <div>
      <div className="flex items-end gap-2" style={{ height }}>
        {values.map((v, i) => (
          <div key={i} className="flex h-full flex-1 flex-col justify-end">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${Math.max((v / max) * 100, 3)}%` }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: "easeOut" }}
              className="w-full rounded-t-[3px]"
              style={{ backgroundColor: barColor }}
            />
          </div>
        ))}
      </div>
      {labels && (
        <div className="mt-2 flex gap-2">
          {labels.map((l, i) => (
            <span key={i} className="flex-1 text-center text-[10.5px] text-[var(--color-muted)]">
              {l}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
