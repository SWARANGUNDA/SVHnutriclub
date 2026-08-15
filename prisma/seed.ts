import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ======================== USERS ========================
  const adminPassword = await bcrypt.hash("admin123", 12);
  const userPassword = await bcrypt.hash("user123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@svhnutritionclub.com" },
    update: {},
    create: {
      name: "SVH Admin",
      email: "admin@svhnutritionclub.com",
      hashedPassword: adminPassword,
      role: "ADMIN",
      phone: "+91 98765 43210",
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: "demo@svhnutritionclub.com" },
    update: {},
    create: {
      name: "Demo User",
      email: "demo@svhnutritionclub.com",
      hashedPassword: userPassword,
      role: "CUSTOMER",
      phone: "+91 91234 56789",
    },
  });

  console.log("✅ Users created:", { admin: admin.email, customer: customer.email });

  // ======================== PRODUCTS ========================
  const products = [
    {
      name: "Formula 1 Nutritional Shake Mix",
      slug: "formula-1-shake",
      description: "A delicious, healthy meal replacement shake with essential vitamins, minerals, and protein. Available in multiple flavors.",
      price: 1599,
      originalPrice: 1899,
      category: "SHAKES" as const,
      badge: "Best Seller",
      benefits: ["220 calories per serving", "18g protein", "21 vitamins & minerals", "Gluten-free available"],
      tags: ["weight-management", "meal-replacement", "protein"],
      rating: 4.8,
      reviewCount: 342,
      sortOrder: 1,
    },
    {
      name: "Herbal Tea Concentrate",
      slug: "herbal-tea-concentrate",
      description: "Refreshing low-calorie tea with green tea extract and caffeine to boost metabolism and energy levels.",
      price: 1299,
      category: "TEAS" as const,
      badge: "Popular",
      benefits: ["Low calorie", "Boosts metabolism", "Antioxidant-rich", "85mg caffeine"],
      tags: ["energy", "metabolism", "antioxidants"],
      rating: 4.7,
      reviewCount: 198,
      sortOrder: 2,
    },
    {
      name: "Protein Drink Mix",
      slug: "protein-drink-mix",
      description: "High-quality whey and casein protein blend for muscle recovery and lean muscle growth.",
      price: 1899,
      category: "SUPPLEMENTS" as const,
      benefits: ["24g protein", "Low fat", "Muscle recovery", "BCAA enriched"],
      tags: ["protein", "muscle", "recovery"],
      rating: 4.9,
      reviewCount: 156,
      sortOrder: 3,
    },
    {
      name: "Herbalife SKIN Collagen Beauty Booster",
      slug: "skin-collagen-booster",
      description: "Collagen peptides with vitamin C and biotin for healthy, glowing skin from within.",
      price: 2499,
      originalPrice: 2899,
      category: "SKIN" as const,
      badge: "New",
      benefits: ["Collagen peptides", "Vitamin C + Biotin", "Skin elasticity", "Anti-aging"],
      tags: ["skin", "collagen", "beauty"],
      rating: 4.6,
      reviewCount: 87,
      sortOrder: 4,
    },
    {
      name: "Cell Activator",
      slug: "cell-activator",
      description: "Advanced formula with alpha-lipoic acid and botanicals to support nutrient absorption and cellular energy.",
      price: 999,
      category: "SUPPLEMENTS" as const,
      benefits: ["Nutrient absorption", "Cellular energy", "Antioxidant support", "Alpha-lipoic acid"],
      tags: ["cellular", "energy", "absorption"],
      rating: 4.5,
      reviewCount: 124,
      sortOrder: 5,
    },
    {
      name: "Aloe Vera Concentrate",
      slug: "aloe-vera-concentrate",
      description: "Soothing aloe vera drink to support digestive health and nutrient absorption.",
      price: 1199,
      category: "SUPPLEMENTS" as const,
      badge: "Top Rated",
      benefits: ["Digestive support", "Nutrient absorption", "40% aloe vera", "Soothing"],
      tags: ["digestion", "aloe", "gut-health"],
      rating: 4.8,
      reviewCount: 215,
      sortOrder: 6,
    },
    {
      name: "Personalized Protein Powder",
      slug: "personalized-protein",
      description: "Unflavored protein powder that can be added to Formula 1 or any meal for extra protein boost.",
      price: 1399,
      category: "SUPPLEMENTS" as const,
      benefits: ["5g protein/serving", "Unflavored", "Versatile use", "Whey + soy blend"],
      tags: ["protein", "versatile", "custom"],
      rating: 4.4,
      reviewCount: 93,
      sortOrder: 7,
    },
    {
      name: "Total Control Tablets",
      slug: "total-control-tablets",
      description: "Green tea, ginger, and cinnamon blend for enhanced metabolism and energy throughout the day.",
      price: 1799,
      originalPrice: 2099,
      category: "SUPPLEMENTS" as const,
      badge: "Best Value",
      benefits: ["Metabolism boost", "Green tea extract", "Ginger & cinnamon", "Sustained energy"],
      tags: ["metabolism", "energy", "weight-management"],
      rating: 4.7,
      reviewCount: 167,
      sortOrder: 8,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  console.log(`✅ ${products.length} products seeded`);

  // ======================== BLOG POSTS ========================
  const posts = [
    {
      title: "The Science Behind AI-Powered Nutrition Planning",
      slug: "ai-powered-nutrition-planning",
      excerpt: "How artificial intelligence is revolutionizing personalized nutrition and making healthy eating accessible to everyone.",
      content: "Full article content about AI and nutrition...",
      category: "AI & Technology",
      author: "Dr. SVH Wellness Team",
      readTime: "5 min read",
      status: "PUBLISHED" as const,
      featured: true,
      publishedAt: new Date("2025-12-01"),
    },
    {
      title: "10 Morning Habits for a Healthier Life",
      slug: "morning-habits-healthier-life",
      excerpt: "Start your day right with these science-backed morning rituals that boost energy, mood, and overall wellness.",
      content: "Full article content about morning habits...",
      category: "Wellness",
      author: "SVH Nutrition Club",
      readTime: "4 min read",
      status: "PUBLISHED" as const,
      publishedAt: new Date("2025-11-15"),
    },
    {
      title: "Understanding Protein: Your Complete Guide",
      slug: "understanding-protein-guide",
      excerpt: "Everything you need to know about protein intake, types, timing, and how it fuels your body transformation.",
      content: "Full article content about protein...",
      category: "Nutrition",
      author: "SVH Nutrition Club",
      readTime: "7 min read",
      status: "PUBLISHED" as const,
      publishedAt: new Date("2025-11-01"),
    },
    {
      title: "How to Stay Consistent with Your Fitness Goals",
      slug: "stay-consistent-fitness-goals",
      excerpt: "Practical strategies and mindset shifts to help you maintain consistency and achieve lasting results.",
      content: "Full article content about fitness consistency...",
      category: "Fitness",
      author: "SVH Wellness Team",
      readTime: "6 min read",
      status: "PUBLISHED" as const,
      publishedAt: new Date("2025-10-20"),
    },
    {
      title: "5 Quick Healthy Recipes Under 15 Minutes",
      slug: "quick-healthy-recipes",
      excerpt: "Delicious, nutritious meals that fit into even the busiest schedule. Simple ingredients, maximum nutrition.",
      content: "Full article content with recipes...",
      category: "Recipes",
      author: "SVH Kitchen",
      readTime: "4 min read",
      status: "PUBLISHED" as const,
      publishedAt: new Date("2025-10-10"),
    },
    {
      title: "The Mind-Body Connection in Weight Management",
      slug: "mind-body-weight-management",
      excerpt: "Understanding how stress, sleep, and mental health directly impact your weight and body composition.",
      content: "Full article content about mind-body connection...",
      category: "Wellness",
      author: "Dr. SVH Wellness Team",
      readTime: "8 min read",
      status: "PUBLISHED" as const,
      publishedAt: new Date("2025-09-25"),
    },
  ];

  for (const post of posts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  console.log(`✅ ${posts.length} blog posts seeded`);

  // ======================== TRANSFORMATIONS ========================
  const transformations = [
    {
      name: "Priya Sharma",
      age: 28,
      location: "Hyderabad",
      beforeWeight: 82,
      afterWeight: 65,
      duration: "6 months",
      story: "I struggled with weight for years. SVH Nutrition Club's AI-powered meal plans and personal coaching transformed not just my body but my entire relationship with food.",
      achievements: ["Lost 17 kg", "Gained confidence", "Completed 5K run", "Better sleep quality"],
      isPublished: true,
    },
    {
      name: "Rajesh Kumar",
      age: 35,
      location: "Bangalore",
      beforeWeight: 95,
      afterWeight: 78,
      duration: "8 months",
      story: "The body analytics dashboard helped me understand exactly what my body needed. The personalized nutrition plan was a game-changer for my fitness journey.",
      achievements: ["Lost 17 kg", "Built lean muscle", "Reduced body fat 28% → 18%", "Reversed pre-diabetes"],
      isPublished: true,
    },
    {
      name: "Ananya Reddy",
      age: 24,
      location: "Chennai",
      beforeWeight: 68,
      afterWeight: 55,
      duration: "4 months",
      story: "As a busy professional, I needed a plan that worked around my schedule. The AI meal generator gave me quick, healthy options every single day.",
      achievements: ["Lost 13 kg", "Clear skin", "More energy", "Better focus at work"],
      isPublished: true,
    },
    {
      name: "Vikram Patel",
      age: 42,
      location: "Mumbai",
      beforeWeight: 105,
      afterWeight: 85,
      duration: "10 months",
      story: "At 42, I thought it was too late to change. SVH proved me wrong. The combination of Herbalife products and AI tracking made the journey measurable and motivating.",
      achievements: ["Lost 20 kg", "Normal blood pressure", "Active lifestyle", "Inspiring my family"],
      isPublished: true,
    },
    {
      name: "Meena Iyer",
      age: 31,
      location: "Pune",
      beforeWeight: 75,
      afterWeight: 62,
      duration: "5 months",
      story: "Post-pregnancy weight was my biggest challenge. The nutrition scanner helped me make better choices for both me and my baby. Incredible support system!",
      achievements: ["Lost 13 kg", "Post-pregnancy recovery", "Healthy breastfeeding", "Mental wellness"],
      isPublished: true,
    },
    {
      name: "Arjun Nair",
      age: 29,
      location: "Kochi",
      beforeWeight: 88,
      afterWeight: 74,
      duration: "7 months",
      story: "The voice-based health assistant made tracking so easy. I could just tell it what I ate and it would calculate everything. Technology meets wellness perfectly.",
      achievements: ["Lost 14 kg", "Six-pack abs", "Marathon runner", "Wellness ambassador"],
      isPublished: true,
    },
  ];

  for (const t of transformations) {
    await prisma.transformation.create({ data: t });
  }

  console.log(`✅ ${transformations.length} transformations seeded`);

  console.log("\n🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
