"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, User, Tag, Search, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const blogCategories = ["All", "Nutrition", "Wellness", "AI & Tech", "Fitness", "Recipes"];

const blogPosts = [
  {
    id: 1,
    title: "How AI Is Revolutionizing Personal Nutrition Plans",
    excerpt:
      "Discover how artificial intelligence analyzes your body metrics to create perfectly balanced meal plans that adapt to your progress and goals.",
    category: "AI & Tech",
    readTime: "5 min read",
    date: "May 10, 2026",
    author: "Dr. Meera Sharma",
    featured: true,
    gradient: "from-emerald-500/15 to-teal-500/10",
  },
  {
    id: 2,
    title: "Understanding Your Body Fat Percentage: A Complete Guide",
    excerpt:
      "Learn what body fat percentage really means, how to measure it accurately, and what ranges are healthy for different age groups and fitness goals.",
    category: "Wellness",
    readTime: "7 min read",
    date: "May 8, 2026",
    author: "Coach Arjun",
    featured: false,
    gradient: "from-teal-500/15 to-cyan-500/10",
  },
  {
    id: 3,
    title: "10 High-Protein Vegetarian Breakfast Ideas for Weight Loss",
    excerpt:
      "Start your mornings right with these delicious and nutritious vegetarian breakfast recipes that pack a protein punch while keeping calories in check.",
    category: "Recipes",
    readTime: "4 min read",
    date: "May 5, 2026",
    author: "Nutritionist Priya",
    featured: false,
    gradient: "from-green-500/15 to-emerald-500/10",
  },
  {
    id: 4,
    title: "The Science Behind BMI, BMR, and Why They Matter",
    excerpt:
      "A deep dive into the science of BMI and BMR calculations, their limitations, and how our AI uses advanced metrics for more accurate health assessments.",
    category: "Nutrition",
    readTime: "6 min read",
    date: "May 3, 2026",
    author: "Dr. Meera Sharma",
    featured: false,
    gradient: "from-violet-500/15 to-purple-500/10",
  },
  {
    id: 5,
    title: "Building a Sustainable Fitness Habit: The 21-Day Guide",
    excerpt:
      "Transform your relationship with exercise using our proven habit-building framework, backed by behavioral science and AI-powered reminders.",
    category: "Fitness",
    readTime: "8 min read",
    date: "Apr 30, 2026",
    author: "Coach Arjun",
    featured: false,
    gradient: "from-orange-500/15 to-amber-500/10",
  },
  {
    id: 6,
    title: "Visceral Fat: The Hidden Danger and How to Reduce It",
    excerpt:
      "Understanding visceral fat, why it's more dangerous than subcutaneous fat, and the most effective nutritional strategies to reduce it safely.",
    category: "Wellness",
    readTime: "6 min read",
    date: "Apr 28, 2026",
    author: "Dr. Meera Sharma",
    featured: false,
    gradient: "from-red-500/15 to-rose-500/10",
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find((p) => p.featured);

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero py-16">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Insights & Articles
            </span>
            <h1 className="mt-4 font-heading text-4xl font-bold text-foreground sm:text-5xl">
              Health & Wellness <span className="text-gradient-green">Blog</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Expert insights on nutrition, wellness, fitness, and how AI is
              transforming personal health management
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-8 max-w-md"
          >
            <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3 shadow-premium">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="scrollbar-hide -mb-px flex gap-1 overflow-x-auto py-4">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && activeCategory === "All" && !searchQuery && (
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link href={`/blog/${featuredPost.id}`} className="group block">
                <div
                  className={cn(
                    "glass relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:shadow-premium-lg sm:p-12",
                    "bg-gradient-to-br",
                    featuredPost.gradient
                  )}
                >
                  <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    Featured
                  </span>
                  <h2 className="mt-4 font-heading text-2xl font-bold text-foreground transition-colors group-hover:text-primary sm:text-3xl lg:text-4xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-muted-foreground">
                    {featuredPost.excerpt}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" /> {featuredPost.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> {featuredPost.readTime}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Tag className="h-3.5 w-3.5" /> {featuredPost.category}
                    </span>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">
                    Read Full Article
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts
              .filter((p) => !p.featured || activeCategory !== "All" || searchQuery)
              .map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link href={`/blog/${post.id}`} className="group block">
                    <div className="glass relative flex flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-premium-lg">
                      {/* Gradient header */}
                      <div className={cn("h-36 bg-gradient-to-br", post.gradient)} />

                      {/* Content */}
                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="rounded-md bg-primary/10 px-2 py-0.5 font-medium text-primary">
                            {post.category}
                          </span>
                          <span>{post.date}</span>
                        </div>

                        <h3 className="mt-3 font-heading text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                          {post.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                          {post.excerpt}
                        </p>

                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <User className="h-3 w-3" /> {post.author}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" /> {post.readTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="py-20 text-center">
              <Search className="mx-auto h-12 w-12 text-muted-foreground/40" />
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                No articles found
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Try a different search term or category
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
