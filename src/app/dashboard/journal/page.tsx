import { BookOpen, Edit3 } from "lucide-react";

export default function JournalPage() {
  return (
    <div className="min-h-screen p-8 pt-24">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold font-heading">Wellness Journal</h1>
          <p className="text-muted-foreground mt-2">Reflect on your daily feelings, diet, and progress.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl font-medium hover:bg-primary/90 transition-colors">
          <Edit3 className="h-4 w-4" />
          New Entry
        </button>
      </div>
      
      <div className="bg-muted/20 border border-border rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 text-muted-foreground mb-4">
          <BookOpen className="h-5 w-5" />
          <span className="text-sm font-medium">Today</span>
        </div>
        <textarea 
          className="w-full bg-transparent border-none focus:ring-0 resize-none h-32 text-lg outline-none placeholder:text-muted-foreground/50" 
          placeholder="How are you feeling today? What did you eat?"
        />
      </div>
    </div>
  );
}
