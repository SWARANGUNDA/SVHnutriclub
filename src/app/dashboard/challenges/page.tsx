import { Trophy, Users } from "lucide-react";

export default function ChallengesPage() {
  return (
    <div className="min-h-screen p-8 pt-24">
      <h1 className="text-3xl font-bold font-heading mb-2">Community Challenges</h1>
      <p className="text-muted-foreground mb-8">Join others in achieving shared wellness goals.</p>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-500/20">
          <Trophy className="h-12 w-12 mb-4 text-yellow-300" />
          <h2 className="text-2xl font-bold mb-2">21-Day Transformation</h2>
          <p className="opacity-90 mb-6">Join 450+ members in our summer body transformation challenge.</p>
          <div className="flex items-center gap-2 mb-6">
            <Users className="h-5 w-5" />
            <span className="font-semibold">452 Active Participants</span>
          </div>
          <button className="bg-white text-indigo-600 px-6 py-2 rounded-xl font-bold hover:bg-white/90 transition-colors">
            Join Challenge
          </button>
        </div>
      </div>
    </div>
  );
}
