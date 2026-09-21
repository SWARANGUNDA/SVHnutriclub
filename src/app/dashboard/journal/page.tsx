"use client";

import { useState, useEffect } from "react";
import { BookOpen, Edit3, Loader2, Save } from "lucide-react";

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchEntries();
  }, []);

  async function fetchEntries() {
    try {
      const res = await fetch("/api/journal");
      const data = await res.json();
      if (data.entries) setEntries(data.entries);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!content.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (res.ok) {
        setContent("");
        fetchEntries();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen p-8 pt-24 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 pt-24 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading">Wellness Journal</h1>
          <p className="text-muted-foreground mt-2">Reflect on your daily feelings, diet, and progress.</p>
        </div>
      </div>
      
      {/* New Entry */}
      <div className="bg-muted/20 border border-border rounded-2xl p-6 mb-12 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
        <div className="flex items-center gap-2 text-muted-foreground mb-4">
          <Edit3 className="h-5 w-5" />
          <span className="text-sm font-medium">New Entry</span>
        </div>
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full bg-transparent border-none focus:ring-0 resize-none min-h-[120px] text-lg outline-none placeholder:text-muted-foreground/50" 
          placeholder="How are you feeling today? What did you eat?"
        />
        <div className="flex justify-end mt-4">
          <button 
            onClick={handleSave}
            disabled={saving || !content.trim()}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Entry
          </button>
        </div>
      </div>

      {/* History */}
      <h2 className="text-xl font-bold font-heading mb-6 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-primary" />
        Past Entries
      </h2>
      <div className="space-y-6">
        {entries.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No entries yet. Start writing above!</p>
        ) : (
          entries.map(entry => (
            <div key={entry.id} className="bg-card border border-border rounded-2xl p-6 hover:shadow-premium transition-all">
              <div className="text-sm text-primary font-semibold mb-3">
                {new Date(entry.createdAt).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="whitespace-pre-wrap text-foreground/90 leading-relaxed">
                {entry.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
