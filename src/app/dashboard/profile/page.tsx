"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Settings, Save, Sparkles, Flame, Droplets, Moon, Target, Utensils, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [profile, setProfile] = useState({
    age: "",
    gender: "male",
    dietaryPreference: "vegetarian",
    foodAllergies: "",
    foodDislikes: "",
    wellnessGoal: "weight_loss",
    activityLevel: "moderate",
    preferredLanguage: "en-US",
    climate: "tropical",
    sleepTarget: "8",
    waterTarget: "3",
    dailyStepsTarget: "10000"
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        if (data.profile) {
          setProfile({
            ...profile,
            ...data.profile,
            age: data.profile.age?.toString() || "",
            sleepTarget: data.profile.sleepTarget?.toString() || "8",
            waterTarget: data.profile.waterTarget?.toString() || "3",
            dailyStepsTarget: data.profile.dailyStepsTarget?.toString() || "10000",
          });
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      if (!res.ok) throw new Error("Failed to save");
      alert("Profile saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Error saving profile. Note: Database might be disconnected.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="relative overflow-hidden bg-gradient-hero py-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Customer Profile</span>
          </div>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">Wellness Profile</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your personal details, goals, and dietary preferences.</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        <div className="glass glow-green rounded-3xl p-6 sm:p-8">
          <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            
            {/* Basic Info */}
            <div>
              <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-foreground mb-4 border-b border-border pb-2">
                <User className="h-5 w-5 text-primary" /> Basic Information
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Age</label>
                  <input
                    type="number"
                    value={profile.age}
                    onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm font-medium text-foreground outline-none transition-colors focus:border-primary focus:bg-background"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Gender</label>
                  <select
                    value={profile.gender}
                    onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm font-medium text-foreground outline-none transition-colors focus:border-primary focus:bg-background"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Preferred Language</label>
                  <select
                    value={profile.preferredLanguage}
                    onChange={(e) => setProfile({ ...profile, preferredLanguage: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm font-medium text-foreground outline-none transition-colors focus:border-primary focus:bg-background"
                  >
                    <option value="en-US">English</option>
                    <option value="hi-IN">Hindi (हिंदी)</option>
                    <option value="te-IN">Telugu (తెలుగు)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Climate/Location</label>
                  <select
                    value={profile.climate}
                    onChange={(e) => setProfile({ ...profile, climate: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm font-medium text-foreground outline-none transition-colors focus:border-primary focus:bg-background"
                  >
                    <option value="tropical">Tropical (Hot & Humid)</option>
                    <option value="dry">Dry / Arid</option>
                    <option value="temperate">Temperate</option>
                    <option value="cold">Cold</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Nutrition & Diet */}
            <div>
              <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-foreground mb-4 border-b border-border pb-2">
                <Utensils className="h-5 w-5 text-primary" /> Nutrition Preferences
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Dietary Preference</label>
                  <select
                    value={profile.dietaryPreference}
                    onChange={(e) => setProfile({ ...profile, dietaryPreference: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm font-medium text-foreground outline-none transition-colors focus:border-primary focus:bg-background"
                  >
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="eggetarian">Eggetarian</option>
                    <option value="non-vegetarian">Non-Vegetarian</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Activity Level</label>
                  <select
                    value={profile.activityLevel}
                    onChange={(e) => setProfile({ ...profile, activityLevel: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm font-medium text-foreground outline-none transition-colors focus:border-primary focus:bg-background"
                  >
                    <option value="sedentary">Sedentary (Little to no exercise)</option>
                    <option value="light">Lightly Active (1-3 days/week)</option>
                    <option value="moderate">Moderately Active (3-5 days/week)</option>
                    <option value="active">Very Active (6-7 days/week)</option>
                  </select>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Food Allergies</label>
                  <input
                    type="text"
                    placeholder="e.g., Peanuts, Dairy, Gluten"
                    value={profile.foodAllergies}
                    onChange={(e) => setProfile({ ...profile, foodAllergies: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm font-medium text-foreground outline-none transition-colors focus:border-primary focus:bg-background"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Food Dislikes</label>
                  <input
                    type="text"
                    placeholder="e.g., Mushrooms, Broccoli"
                    value={profile.foodDislikes}
                    onChange={(e) => setProfile({ ...profile, foodDislikes: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm font-medium text-foreground outline-none transition-colors focus:border-primary focus:bg-background"
                  />
                </div>
              </div>
            </div>

            {/* Targets & Goals */}
            <div>
              <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-foreground mb-4 border-b border-border pb-2">
                <Target className="h-5 w-5 text-primary" /> Daily Targets
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1">
                  <label className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <Moon className="h-3 w-3 text-purple-500" /> Sleep Target (hrs)
                  </label>
                  <input
                    type="number"
                    value={profile.sleepTarget}
                    onChange={(e) => setProfile({ ...profile, sleepTarget: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm font-medium text-foreground outline-none transition-colors focus:border-primary focus:bg-background"
                  />
                </div>
                <div className="space-y-1">
                  <label className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <Droplets className="h-3 w-3 text-sky-500" /> Water Target (L)
                  </label>
                  <input
                    type="number"
                    value={profile.waterTarget}
                    onChange={(e) => setProfile({ ...profile, waterTarget: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm font-medium text-foreground outline-none transition-colors focus:border-primary focus:bg-background"
                  />
                </div>
                <div className="space-y-1">
                  <label className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <Flame className="h-3 w-3 text-orange-500" /> Daily Steps
                  </label>
                  <input
                    type="number"
                    value={profile.dailyStepsTarget}
                    onChange={(e) => setProfile({ ...profile, dailyStepsTarget: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm font-medium text-foreground outline-none transition-colors focus:border-primary focus:bg-background"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end border-t border-border">
              <button 
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-transform active:scale-95 disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {saving ? "Saving Profile..." : "Save Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
