"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Sparkles, Package, FileText, Zap, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SearchResult {
  type: "product" | "blog" | "service";
  title: string;
  description: string;
  relevance: number;
}

interface SearchResponse {
  results: SearchResult[];
  suggestion: string;
  provider: string;
}

const typeIcons = {
  product: Package,
  blog: FileText,
  service: Zap,
};

const typeColors = {
  product: "bg-emerald-500/10 text-emerald-500",
  blog: "bg-blue-500/10 text-blue-500",
  service: "bg-purple-500/10 text-purple-500",
};

export function SmartSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.length < 3) {
      setResults(null);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/ai/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: value }),
        });
        const data = await res.json();
        setResults(data);
      } catch {
        console.error("Search failed");
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground transition-all hover:border-primary/30 hover:bg-muted"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden rounded bg-background px-1.5 py-0.5 text-[10px] font-medium sm:inline">⌘K</kbd>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              className="fixed left-1/2 top-[15%] z-50 w-full max-w-lg -translate-x-1/2"
            >
              <div className="glass-strong mx-4 rounded-2xl shadow-premium-lg">
                {/* Search input */}
                <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  ) : (
                    <Sparkles className="h-5 w-5 text-primary" />
                  )}
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Ask anything... e.g. 'best product for weight loss'"
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                  <button onClick={() => setOpen(false)}>
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>

                {/* Results */}
                <div className="max-h-80 overflow-y-auto p-2">
                  {results && results.results ? (
                    <div className="space-y-1">
                      {results.results.map((r, i) => {
                        const Icon = typeIcons[r.type] || Search;
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <Link
                              href={r.type === "product" ? "/products" : r.type === "blog" ? "/blog" : "/services"}
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all hover:bg-muted"
                            >
                              <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", typeColors[r.type])}>
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">{r.title}</p>
                                <p className="text-xs text-muted-foreground truncate">{r.description}</p>
                              </div>
                              <span className="text-[10px] font-medium text-muted-foreground">{r.relevance}%</span>
                            </Link>
                          </motion.div>
                        );
                      })}
                      {results.suggestion && (
                        <p className="px-3 py-2 text-xs text-muted-foreground">
                          💡 {results.suggestion}
                        </p>
                      )}
                    </div>
                  ) : query.length < 3 ? (
                    <p className="px-3 py-6 text-center text-xs text-muted-foreground">
                      Type at least 3 characters to search with AI...
                    </p>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
