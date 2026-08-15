import {
  Activity,
  Apple,
  BarChart3,
  Bot,
  Brain,
  Calendar,
  Camera,
  Dumbbell,
  FileText,
  Globe,
  Heart,
  Lightbulb,
  MessageSquare,
  Mic,
  QrCode,
  Search,
  Sparkles,
  Timer,
  TrendingUp,
  User,
  type LucideIcon,
} from "lucide-react";

// ===== Navigation =====
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Results", href: "/results" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

// ===== AI Features Strip Items =====
export interface AIFeature {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  href: string;
}

export const AI_FEATURES: AIFeature[] = [
  {
    id: "digital-body-dashboard",
    title: "Digital Body Dashboard",
    description: "AI-powered body analytics & wellness insights",
    icon: Activity,
    gradient: "from-emerald-500 to-teal-600",
    href: "/dashboard",
  },
  {
    id: "ai-meal-generator",
    title: "AI Meal Generator",
    description: "Personalized vegetarian meal plans",
    icon: Apple,
    gradient: "from-green-500 to-emerald-600",
    href: "/dashboard/meals",
  },
  {
    id: "smart-nutrition-scanner",
    title: "Smart Nutrition Scanner",
    description: "Upload food images for instant analysis",
    icon: Camera,
    gradient: "from-teal-500 to-cyan-600",
    href: "/dashboard/scanner",
  },
  {
    id: "live-health-score",
    title: "Live Health Score",
    description: "Real-time wellness & balance indicators",
    icon: Heart,
    gradient: "from-emerald-400 to-green-600",
    href: "/dashboard/health-score",
  },
  {
    id: "voice-health-chat",
    title: "Voice-Based Health Chat",
    description: "Multilingual AI voice wellness assistant",
    icon: Mic,
    gradient: "from-green-400 to-teal-500",
    href: "/dashboard/voice-assistant",
  },
  {
    id: "ai-motivation-system",
    title: "AI Motivation System",
    description: "Personalized motivation & encouragement",
    icon: Lightbulb,
    gradient: "from-yellow-400 to-emerald-500",
    href: "/dashboard/motivation",
  },
  {
    id: "daily-habit-tracker",
    title: "Daily Habit Tracker",
    description: "Track water, meals, workouts & sleep",
    icon: Timer,
    gradient: "from-teal-400 to-emerald-500",
    href: "/dashboard/habits",
  },
  {
    id: "smart-reminder-system",
    title: "Smart Reminder System",
    description: "Never miss supplements or workouts",
    icon: Calendar,
    gradient: "from-emerald-500 to-green-400",
    href: "/dashboard/reminders",
  },
  {
    id: "fitness-challenge",
    title: "Fitness Challenge System",
    description: "Compete, earn badges & climb leaderboards",
    icon: Dumbbell,
    gradient: "from-green-500 to-lime-500",
    href: "/dashboard/challenges",
  },
  {
    id: "qr-membership",
    title: "QR Membership System",
    description: "Scan to check-in & validate membership",
    icon: QrCode,
    gradient: "from-teal-500 to-green-500",
    href: "/dashboard/membership",
  },
  {
    id: "ai-report-generator",
    title: "AI Report Generator",
    description: "Downloadable wellness & analytics PDFs",
    icon: FileText,
    gradient: "from-emerald-500 to-teal-400",
    href: "/dashboard/reports",
  },
  {
    id: "smart-search",
    title: "Smart Search System",
    description: "AI-powered product & wellness search",
    icon: Search,
    gradient: "from-green-400 to-emerald-500",
    href: "/products",
  },
  {
    id: "product-matching",
    title: "Personalized Product Matching",
    description: "AI finds your perfect nutrition match",
    icon: Sparkles,
    gradient: "from-teal-400 to-cyan-500",
    href: "/products",
  },
  {
    id: "body-progress-timeline",
    title: "Body Progress Timeline",
    description: "Transformation history & milestone tracking",
    icon: TrendingUp,
    gradient: "from-emerald-400 to-green-500",
    href: "/dashboard/timeline",
  },
  {
    id: "3d-body-model",
    title: "Interactive 3D Body Model",
    description: "Click body regions to explore wellness",
    icon: User,
    gradient: "from-teal-500 to-emerald-600",
    href: "/dashboard/body-model",
  },
  {
    id: "ai-voice-assistant",
    title: "AI Multilingual Voice Assistant",
    description: "Health chat in English, Telugu & Hindi",
    icon: Globe,
    gradient: "from-green-500 to-teal-400",
    href: "/dashboard/voice-assistant",
  },
  {
    id: "health-risk-indicator",
    title: "AI Health Risk Indicator",
    description: "Detect obesity, fat & wellness risks",
    icon: BarChart3,
    gradient: "from-red-400 to-emerald-500",
    href: "/dashboard/health-risk",
  },
  {
    id: "fitness-journal",
    title: "Personal Fitness Journal",
    description: "Diet notes, energy & mood tracking",
    icon: Brain,
    gradient: "from-emerald-400 to-teal-400",
    href: "/dashboard/journal",
  },
];

// ===== Stats for animated counters =====
export const STATS = [
  { label: "Active Members", value: 2500, suffix: "+" },
  { label: "Transformations", value: 850, suffix: "+" },
  { label: "Premium Products", value: 120, suffix: "+" },
  { label: "AI Insights Daily", value: 10000, suffix: "+" },
] as const;

// ===== Language Options =====
export const LANGUAGES = [
  { code: "en" as const, label: "English", flag: "🇺🇸" },
  { code: "te" as const, label: "తెలుగు", flag: "🇮🇳" },
  { code: "hi" as const, label: "हिंदी", flag: "🇮🇳" },
] as const;

// ===== Testimonials =====
export const TESTIMONIALS = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Lost 15kg in 3 months",
    content: "SVH Nutrition Club transformed my health journey. The AI dashboard helped me understand my body like never before, and the personalized meal plans made it easy to stay on track.",
    avatar: "/images/testimonials/avatar-1.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "Gained lean muscle",
    content: "The 3D body model and progress timeline kept me motivated every single day. I could literally see my transformation happening in real-time!",
    avatar: "/images/testimonials/avatar-2.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "Ananya Reddy",
    role: "Improved wellness score by 40%",
    content: "What sets SVH apart is the AI-powered health insights. It's like having a personal nutritionist and fitness coach available 24/7 in three languages!",
    avatar: "/images/testimonials/avatar-3.jpg",
    rating: 5,
  },
] as const;
