import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { AICarousel } from "@/components/dashboard/AICarousel";
import { 
  Activity, ArrowRight, Target, Utensils, Droplet, Flame, CheckCircle2, 
  Sparkles, TrendingUp, Sun, ChevronRight, Plus, Mic, Calendar, ChevronLeft, Home, Scan, FileText, ShoppingBag, Bot
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function CustomerDashboardPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
  }

  const userId = session.user.id;
  const userName = session.user.name?.split(" ")[0] || "Guest";
  
  const todayDate = new Intl.DateTimeFormat("en-US", { weekday: "long", day: "numeric", month: "short", year: "numeric" }).format(new Date());
  const todayDateShort = new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short", year: "numeric" }).format(new Date());

  // Defaults
  let metrics = {
    wellnessScore: 84, scoreTrend: 6,
    weight: 61.5, weightTrend: -1.2,
    bodyFat: 18.5, bodyFatTrend: -2.3,
    muscleMass: 33.0, muscleTrend: 1.8,
    bmi: 22.0, visceralFat: 5.5, waterPercent: 58.2, bodyAge: 28
  };
  let lastScanDaysAgo = 14;

  try {
    const latestMetrics = await db.bodyMetric.findMany({
      where: { userId },
      orderBy: { measuredAt: 'desc' },
      take: 2
    });

    if (latestMetrics.length > 0) {
      const current = latestMetrics[0];
      const previous = latestMetrics[1]; // might be undefined

      metrics.wellnessScore = Math.round(current.healthScore || 80);
      metrics.weight = current.weight || 61.5;
      metrics.bodyFat = current.bodyFat || 18.5;
      metrics.muscleMass = current.muscleMass || 33.0;
      metrics.bmi = current.bmi || 22.0;
      metrics.visceralFat = current.visceralFat || 5.5;
      metrics.waterPercent = current.waterPercent || 58.2;
      metrics.bodyAge = current.metabolicAge || 28;

      if (previous) {
        metrics.weightTrend = Number((metrics.weight - (previous.weight || metrics.weight)).toFixed(1));
        metrics.bodyFatTrend = Number((metrics.bodyFat - (previous.bodyFat || metrics.bodyFat)).toFixed(1));
        metrics.muscleTrend = Number((metrics.muscleMass - (previous.muscleMass || metrics.muscleMass)).toFixed(1));
      }

      const diffTime = Math.abs(new Date().getTime() - new Date(current.measuredAt).getTime());
      lastScanDaysAgo = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
    }
  } catch (error) {
    console.warn("DB not connected, using defaults.");
  }

  return (
    <div className="flex flex-col gap-6 pb-24 relative">
      
      {/* 1. HERO & TOP METRICS */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Hero (spans 5 cols) */}
        <div className="lg:col-span-5 relative overflow-hidden rounded-[24px] border border-white/5 bg-black/40 backdrop-blur-xl p-8 flex flex-col justify-between min-h-[220px]">
          {/* Subtle background image representing sunrise/wellness */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Sun className="h-5 w-5 text-yellow-400" />
              <span className="text-sm font-bold text-foreground">Good Morning, {userName} <span className="text-xl">👋</span></span>
            </div>
            <p className="text-xs text-muted-foreground font-medium mb-6">{todayDate}</p>
            
            <h1 className="font-heading text-2xl sm:text-3xl font-bold leading-tight text-white mb-2">
              Here's what matters<br/>for your <span className="text-emerald-400">wellness today.</span>
            </h1>
            <p className="text-sm text-zinc-300 font-medium max-w-[80%]">
              Stay consistent, make healthier choices, and let's build a better you together.
            </p>
          </div>
        </div>

        {/* Right Metrics (spans 7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard 
            title="Wellness Score" 
            value={metrics.wellnessScore} 
            unit="/100" 
            trend={`↑ ${metrics.scoreTrend}%`} 
            subtitle="Top 15% for your age"
            icon={Activity}
            chartColor="text-emerald-500"
            isScore
          />
          <MetricCard 
            title="Weight" 
            value={metrics.weight} 
            unit="kg" 
            trend={`↓ ${Math.abs(metrics.weightTrend)} kg`} 
            trendColor="text-emerald-500"
            icon={Target}
            chartColor="text-blue-500"
          />
          <MetricCard 
            title="Body Fat" 
            value={metrics.bodyFat} 
            unit="%" 
            trend={`↓ ${Math.abs(metrics.bodyFatTrend)}%`} 
            trendColor="text-emerald-500"
            icon={TrendingUp}
            chartColor="text-orange-500"
          />
          <MetricCard 
            title="Muscle Mass" 
            value={metrics.muscleMass} 
            unit="kg" 
            trend={`↑ ${Math.abs(metrics.muscleTrend)} kg`} 
            trendColor="text-emerald-500"
            icon={TrendingUp}
            chartColor="text-emerald-500"
          />
        </div>
      </section>

      {/* 2. SVH INTELLIGENCE (AI CAROUSEL) */}
      <section className="mt-2">
        <AICarousel />
      </section>

      {/* 3. MIDDLE ROW (Today at SVH & Next Best Action) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Today at SVH (7 cols) */}
        <div className="lg:col-span-7 rounded-[24px] border border-white/5 bg-white/5 p-6 backdrop-blur-xl dark:bg-black/40 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-emerald-400" />
              <h2 className="font-heading text-lg font-bold text-foreground">Today at SVH</h2>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md">
              <span className="text-xs font-medium text-foreground">Today, {todayDateShort}</span>
              <div className="flex gap-1 border-l border-white/10 pl-2">
                <ChevronLeft className="h-3 w-3 text-muted-foreground" />
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="flex flex-col gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 relative overflow-hidden">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center"><Utensils className="h-3 w-3 text-emerald-500" /></div>
                <span className="text-[10px] font-bold uppercase text-foreground">Club <span className="text-muted-foreground">Nutrition</span></span>
              </div>
              <p className="text-xs font-bold text-emerald-500 mt-1">Completed</p>
              <p className="text-[10px] text-muted-foreground">1 / 2 shakes</p>
              <CheckCircle2 className="absolute bottom-2 right-2 h-4 w-4 text-emerald-500" />
            </div>

            <div className="flex flex-col gap-2 rounded-xl border border-orange-500/30 bg-orange-500/5 p-3">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-orange-500/10 flex items-center justify-center"><Home className="h-3 w-3 text-orange-500" /></div>
                <span className="text-[10px] font-bold uppercase text-foreground">Home <span className="text-muted-foreground">Nutrition</span></span>
              </div>
              <p className="text-xs font-bold text-orange-500 mt-1">Not logged</p>
              <p className="text-[10px] text-primary hover:underline cursor-pointer mt-auto">Log now</p>
            </div>

            <div className="flex flex-col gap-2 rounded-xl border border-blue-500/30 bg-blue-500/5 p-3">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-blue-500/10 flex items-center justify-center"><Droplet className="h-3 w-3 text-blue-500" /></div>
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Water Intake</span>
              </div>
              <p className="text-sm font-bold text-foreground mt-auto">1.2 <span className="text-[10px] text-muted-foreground">L / 2 L</span></p>
            </div>

            <div className="flex flex-col gap-2 rounded-xl border border-primary/30 bg-primary/5 p-3">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center"><Activity className="h-3 w-3 text-primary" /></div>
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Activity</span>
              </div>
              <p className="text-sm font-bold text-foreground mt-auto">6,500 <span className="text-[10px] text-muted-foreground">/ 8,000</span></p>
            </div>
          </div>
        </div>

        {/* Next Best Action (5 cols) */}
        <div className="lg:col-span-5 rounded-[24px] border border-emerald-500/30 bg-emerald-500/5 p-6 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none">
            <Scan className="h-40 w-40 text-emerald-500 translate-x-10 translate-y-10" />
          </div>
          
          <div className="relative z-10 flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-emerald-400" />
              <h2 className="font-heading text-lg font-bold text-foreground">Your Next Best Action</h2>
            </div>
            <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-500">Recommended</span>
          </div>

          <div className="relative z-10 flex gap-4 mt-2">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-500 border border-emerald-500/30">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground">Your body scan is due.</h3>
              <p className="text-sm text-zinc-300 mt-1 max-w-[90%]">
                Your last scan was {lastScanDaysAgo} days ago. Update your measurements to get personalized recommendations.
              </p>
              <Link href="/dashboard/scan" className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-xs font-bold text-black transition-transform hover:scale-105">
                Update Body Scan <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

      </section>

      {/* 4. LOWER ROW (Body Comp, Progress Chart, Today's Nutrition) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Body Composition (4 cols) */}
        <div className="lg:col-span-4 rounded-[24px] border border-white/5 bg-white/5 p-6 backdrop-blur-xl dark:bg-black/40">
          <div className="flex items-center gap-2 mb-6">
            <Scan className="h-5 w-5 text-primary" />
            <h2 className="font-heading text-lg font-bold text-foreground">Your Body Composition</h2>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col items-center justify-between w-1/3">
              <div className="flex-1 w-full rounded-xl bg-black/50 border border-white/5 flex items-center justify-center overflow-hidden">
                {/* Simulated 3D Avatar space */}
                <Image src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=200&auto=format&fit=crop" width={100} height={200} alt="Avatar" className="opacity-50 h-full object-cover" />
              </div>
              <Link href="/dashboard/progress" className="mt-3 flex items-center justify-center gap-1 w-full rounded-full border border-white/20 bg-white/5 py-1.5 text-[10px] font-bold text-foreground hover:bg-white/10">
                View 3D Body <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <CompRow label="Weight" val={metrics.weight} unit="kg" trend="↓ 1.2" color="text-emerald-500" />
              <CompRow label="BMI" val={metrics.bmi} unit="" trend="Normal" color="text-blue-500" />
              <CompRow label="Body Fat" val={metrics.bodyFat} unit="%" trend="↓ 2.3" color="text-emerald-500" />
              <CompRow label="Visceral Fat" val={metrics.visceralFat} unit="" trend="Good" color="text-emerald-500" />
              <CompRow label="Muscle Mass" val={metrics.muscleMass} unit="kg" trend="↑ 1.8" color="text-emerald-500" />
              <CompRow label="Water %" val={metrics.waterPercent} unit="%" trend="Good" color="text-emerald-500" />
              <CompRow label="Body Age" val={metrics.bodyAge} unit="yrs" trend="↓ 4" color="text-emerald-500" />
            </div>
          </div>
        </div>

        {/* Progress Chart (4 cols) */}
        <div className="lg:col-span-4 rounded-[24px] border border-white/5 bg-white/5 p-6 backdrop-blur-xl dark:bg-black/40">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              <h2 className="font-heading text-lg font-bold text-foreground">Your Progress</h2>
            </div>
            <Link href="/dashboard/progress" className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1">
              View Details <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="flex gap-2 mb-4">
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-[10px] font-bold text-emerald-500 border border-emerald-500/20">Weight</span>
            <span className="rounded-full bg-transparent px-3 py-1 text-[10px] font-bold text-muted-foreground border border-white/10">Body Fat</span>
            <span className="rounded-full bg-transparent px-3 py-1 text-[10px] font-bold text-muted-foreground border border-white/10">Muscle</span>
          </div>
          <div className="flex-1 h-[140px] w-full border-b border-l border-white/10 relative">
             {/* Fake line chart using SVG for exact layout match */}
             <svg className="h-full w-full" viewBox="0 0 100 50" preserveAspectRatio="none">
               <polyline points="0,20 20,25 40,30 60,32 80,35 100,38" fill="none" stroke="#10b981" strokeWidth="2" />
               <circle cx="100" cy="38" r="2" fill="#10b981" />
             </svg>
             <div className="absolute top-1/2 right-0 -translate-y-6 bg-white/10 backdrop-blur-md px-2 py-1 rounded text-[10px] border border-white/10 text-center">
               <span className="block font-bold text-foreground">61.5 kg</span>
               <span className="block text-[8px] text-muted-foreground">{todayDate.split(',')[1]}</span>
             </div>
          </div>
        </div>

        {/* Today's Nutrition (4 cols) */}
        <div className="lg:col-span-4 rounded-[24px] border border-white/5 bg-white/5 p-6 backdrop-blur-xl dark:bg-black/40">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Utensils className="h-5 w-5 text-emerald-500" />
              <h2 className="font-heading text-lg font-bold text-foreground">Today's Nutrition</h2>
            </div>
            <Link href="/dashboard/nutrition" className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1">
              View Log <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/5">
            {/* Donut Chart Simulation */}
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-[6px] border-white/5">
              <div className="absolute inset-[-6px] rounded-full border-[6px] border-emerald-500" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 50%)" }} />
              <div className="flex flex-col items-center">
                <span className="font-heading text-lg font-bold text-foreground">1,250</span>
                <span className="text-[8px] font-medium text-muted-foreground">/ 2,000 kcal</span>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2 text-xs">
               <MacroRow label="Protein" val="62g" total="/ 120g" color="bg-emerald-500" />
               <MacroRow label="Carbs" val="180g" total="/ 250g" color="bg-blue-500" />
               <MacroRow label="Fats" val="42g" total="/ 70g" color="bg-orange-500" />
            </div>
          </div>

          <div className="flex gap-2">
            <MealMiniCard name="Breakfast" desc="Oats + Banana" cal="320" />
            <MealMiniCard name="Lunch" desc="Brown Rice + Veg" cal="450" />
            <MealMiniCard name="Snack" desc="Protein Shake" cal="180" />
            <div className="flex-1 flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-white/20 bg-white/5 py-2 cursor-pointer hover:bg-white/10 transition-colors">
              <Plus className="h-4 w-4 text-muted-foreground" />
              <span className="text-[8px] font-bold text-muted-foreground uppercase">Add Meal</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BOTTOM ROW (Challenges, Products, Education) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BottomCard title="Upcoming Challenges" link="/dashboard/discover">
          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-2 border border-white/5">
            <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center"><Activity className="h-4 w-4 text-emerald-500" /></div>
            <div>
              <p className="text-xs font-bold text-foreground">30 Day Fitness Challenge</p>
              <p className="text-[10px] text-muted-foreground">Day 7 of 30</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-2 border border-white/5 mt-2">
            <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center"><Droplet className="h-4 w-4 text-blue-500" /></div>
            <div>
              <p className="text-xs font-bold text-foreground">Hydration Challenge</p>
              <p className="text-[10px] text-muted-foreground">Day 12 of 30</p>
            </div>
          </div>
        </BottomCard>

        <BottomCard title="Recommended for You" link="/dashboard/discover">
          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-2 border border-white/5">
            <div className="h-8 w-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center overflow-hidden"><ShoppingBag className="h-4 w-4 text-emerald-500" /></div>
            <div>
              <p className="text-xs font-bold text-foreground">Formula 1 Shake</p>
              <p className="text-[10px] text-orange-400">★ 4.8</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-2 border border-white/5 mt-2">
            <div className="h-8 w-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center overflow-hidden"><ShoppingBag className="h-4 w-4 text-emerald-500" /></div>
            <div>
              <p className="text-xs font-bold text-foreground">Personalized Protein</p>
              <p className="text-[10px] text-orange-400">★ 4.6</p>
            </div>
          </div>
        </BottomCard>

        <BottomCard title="SVH Education" link="/dashboard/journal">
          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-2 border border-white/5">
            <div className="h-8 w-12 rounded bg-black/50 overflow-hidden"><Image src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=100&auto=format&fit=crop" width={48} height={32} alt="article" className="h-full w-full object-cover opacity-70" /></div>
            <div>
              <p className="text-xs font-bold text-foreground">5 Nutrition Tips for Energy</p>
              <p className="text-[10px] text-muted-foreground">5 min read</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-2 border border-white/5 mt-2">
            <div className="h-8 w-12 rounded bg-black/50 overflow-hidden"><Image src="https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=100&auto=format&fit=crop" width={48} height={32} alt="article" className="h-full w-full object-cover opacity-70" /></div>
            <div>
              <p className="text-xs font-bold text-foreground">Understanding Body Fat</p>
              <p className="text-[10px] text-muted-foreground">7 min read</p>
            </div>
          </div>
        </BottomCard>
      </section>

      {/* FLOATING AI BOT */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
        <div className="relative group cursor-pointer flex flex-col items-center">
          <div className="mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-white border border-white/10 whitespace-nowrap">
            Talk to SVH AI Coach
          </div>
          <div className="h-16 w-16 rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600 p-[2px] shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-transform hover:scale-105">
            <div className="h-full w-full rounded-full bg-black flex items-center justify-center relative overflow-hidden">
               <Bot className="h-8 w-8 text-emerald-400 mb-1" />
               <div className="absolute bottom-2 h-1.5 w-6 rounded-full bg-emerald-500/50 animate-pulse" />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-black border border-white/10 flex items-center justify-center">
            <Mic className="h-3 w-3 text-emerald-500" />
          </div>
        </div>
      </div>

    </div>
  );
}

// Helper Components
function MetricCard({ title, value, unit, trend, subtitle, icon: Icon, chartColor, trendColor, isScore }: any) {
  return (
    <div className="flex flex-col justify-between rounded-[20px] border border-white/5 bg-white/5 p-4 backdrop-blur-md dark:bg-black/40">
      <div className="flex items-center gap-2 mb-2">
        <div className={`rounded-md ${isScore ? 'bg-emerald-500/20' : 'bg-white/10'} p-1.5`}>
          <Icon className={`h-4 w-4 ${isScore ? 'text-emerald-500' : 'text-muted-foreground'}`} />
        </div>
        <span className="text-xs font-bold text-muted-foreground">{title}</span>
        <ChevronRight className="h-3 w-3 text-muted-foreground ml-auto" />
      </div>
      <div className="flex items-center gap-3">
        {isScore && (
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-[4px] border-emerald-500/20">
             <div className="absolute inset-[-4px] rounded-full border-[4px] border-emerald-500" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 50%)" }} />
             <span className="font-heading text-xl font-bold text-white">{value}</span>
          </div>
        )}
        {!isScore && (
          <div className="flex flex-col">
            <span className="font-heading text-2xl font-bold text-white drop-shadow-sm">{value} <span className="text-sm font-medium text-muted-foreground">{unit}</span></span>
            <span className={`text-[10px] font-bold ${trendColor || 'text-emerald-500'} mt-1`}>{trend}</span>
          </div>
        )}
        {isScore && subtitle && (
          <div className="flex flex-col ml-2">
            <span className="text-[10px] font-bold text-emerald-500">{trend}</span>
            <span className="text-[10px] text-muted-foreground">{subtitle}</span>
          </div>
        )}
      </div>
      {/* Fake sparkline */}
      {!isScore && (
        <div className="mt-3 h-6 w-full">
           <svg viewBox="0 0 100 20" className="h-full w-full opacity-70" preserveAspectRatio="none">
             <polyline points="0,15 20,12 40,16 60,8 80,10 100,5" fill="none" stroke="currentColor" strokeWidth="2" className={chartColor} />
           </svg>
        </div>
      )}
    </div>
  );
}

function CompRow({ label, val, unit, trend, color }: any) {
  return (
    <div className="flex items-center justify-between text-xs py-1 border-b border-white/5 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <div className="flex items-center gap-4">
        <span className="font-bold text-foreground w-12 text-right">{val} {unit}</span>
        <span className={`font-bold w-12 text-right ${color}`}>{trend}</span>
      </div>
    </div>
  );
}

function MacroRow({ label, val, total, color }: any) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <div className={`h-2 w-2 rounded-full ${color}`} />
        <span className="text-muted-foreground">{label}</span>
      </div>
      <div className="font-bold text-foreground">{val} <span className="text-muted-foreground text-[10px]">{total}</span></div>
    </div>
  );
}

function MealMiniCard({ name, desc, cal }: any) {
  return (
    <div className="flex-1 flex flex-col rounded-xl bg-black/40 border border-white/5 p-2 relative overflow-hidden">
      <div className="absolute -right-4 -bottom-4 h-12 w-12 rounded-full bg-emerald-500/10 blur-xl" />
      <span className="text-[10px] font-bold text-foreground mb-1">{name}</span>
      <span className="text-[8px] text-muted-foreground truncate">{desc}</span>
      <span className="text-[9px] font-bold text-orange-400 mt-2">{cal} kcal</span>
    </div>
  );
}

function BottomCard({ title, link, children }: any) {
  return (
    <div className="rounded-[24px] border border-white/5 bg-white/5 p-5 backdrop-blur-xl dark:bg-black/40">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-emerald-500" />
          <h3 className="font-heading text-sm font-bold text-foreground">{title}</h3>
        </div>
        <Link href={link} className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1">
          View All <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div>{children}</div>
    </div>
  );
}
