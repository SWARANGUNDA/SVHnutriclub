import { CheckCircle2, Circle } from "lucide-react";

export default function HabitsPage() {
  const habits = [
    { id: 1, name: "Drink 3L Water", completed: true },
    { id: 2, name: "Morning Workout", completed: false },
    { id: 3, name: "No Refined Sugar", completed: true },
    { id: 4, name: "Read 10 Pages", completed: false },
  ];

  return (
    <div className="min-h-screen p-8 pt-24">
      <h1 className="text-3xl font-bold font-heading mb-2">Daily Habits</h1>
      <p className="text-muted-foreground mb-8">Track your daily wellness goals to build consistency.</p>
      
      <div className="grid gap-4 max-w-2xl">
        {habits.map(habit => (
          <div key={habit.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border transition-colors hover:bg-muted/50">
            <span className="font-medium text-lg">{habit.name}</span>
            <button className="text-primary hover:scale-110 transition-transform">
              {habit.completed ? (
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
              ) : (
                <Circle className="h-8 w-8 text-muted-foreground/50" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
