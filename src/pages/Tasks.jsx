import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useBusinessStore } from "@/store/useBusinessStore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const COLUMNS = [
  { id: "todo", label: "To do" },
  { id: "in_progress", label: "In progress" },
  { id: "done", label: "Done" },
];

const NEXT = { todo: "in_progress", in_progress: "done", done: null };

export default function Tasks() {
  const { data } = useBusinessStore();
  const [tasks, setTasks] = useState(data.tasks);

  useEffect(() => setTasks(data.tasks), [data.tasks]);

  function advance(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: NEXT[t.status] ?? t.status } : t))
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {COLUMNS.map((col) => {
        const items = tasks.filter((t) => t.status === col.id);
        return (
          <div key={col.id} className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <p className="text-[12.5px] font-medium uppercase tracking-wide text-[var(--color-muted)]">
                {col.label}
              </p>
              <span className="text-[12px] text-[var(--color-muted)]">{items.length}</span>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-dashed border-[var(--color-line)] p-2 min-h-[120px]">
              <AnimatePresence>
                {items.map((t) => (
                  <motion.div
                    key={t.id}
                    layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Card className="p-3">
                      <p className="text-[13px] font-medium text-[var(--color-ink)]">{t.title}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[11.5px] text-[var(--color-muted)]">{t.owner}</span>
                        {NEXT[t.status] && (
                          <Button size="sm" variant="ghost" className="h-6 px-2" onClick={() => advance(t.id)}>
                            <ArrowRight size={13} />
                          </Button>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}
