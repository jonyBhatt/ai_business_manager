import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send } from "lucide-react";
import { useBusinessStore } from "@/store/useBusinessStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
  "How is my business doing?",
  "Who owes me money?",
  "What should I focus on today?",
  "Show me today's numbers.",
];

export default function AIAssistant() {
  const { businessType, aiMessages, sendAiMessage } = useBusinessStore();
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiMessages]);

  function handleSend(text) {
    const value = (text ?? input).trim();
    if (!value) return;
    sendAiMessage(value);
    setInput("");
  }

  return (
    <div className="flex h-[calc(100vh-160px)] flex-col">
      <div className="scroll-quiet flex-1 overflow-y-auto pr-1">
        <div className="mx-auto flex max-w-2xl flex-col gap-4 pb-4">
          <AnimatePresence initial={false}>
            {aiMessages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
                className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-2.5 text-[13.5px] leading-relaxed",
                    m.role === "user"
                      ? "bg-[var(--color-ink)] text-white"
                      : "border border-[var(--color-line)] bg-white text-[var(--color-ink)]"
                  )}
                >
                  {m.role === "ai" && (
                    <div className="mb-1 flex items-center gap-1.5 text-[11px] font-medium text-[var(--color-accent)]">
                      <Sparkles size={12} /> Assistant
                    </div>
                  )}
                  {m.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={endRef} />
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-2xl flex-col gap-3 pt-3">
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleSend(s)}
              className="rounded-full border border-[var(--color-line)] bg-white px-3 py-1.5 text-[12px] text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent-strong)]"
            >
              {s}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask about your ${businessType.label.toLowerCase()}…`}
            className="h-11"
          />
          <Button type="submit" variant="accent" size="icon" className="h-11 w-11 shrink-0">
            <Send size={16} />
          </Button>
        </form>
      </div>
    </div>
  );
}
