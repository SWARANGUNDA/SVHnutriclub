"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  Star,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  Eye,
  X,
  Leaf,
  Zap,
  Heart,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "All Products", icon: Sparkles },
  { id: "shakes", label: "Shakes", icon: Zap },
  { id: "teas", label: "Teas & Beverages", icon: Leaf },
  { id: "supplements", label: "Supplements", icon: Heart },
  { id: "skin", label: "Skin & Body", icon: Flame },
];

const products = [
  {
    id: 1,
    name: "Formula 1 Nutritional Shake Mix",
    category: "shakes",
    price: "₹2,199",
    originalPrice: "₹2,499",
    rating: 4.9,
    reviews: 342,
    image: null,
    badge: "Bestseller",
    badgeColor: "from-amber-500 to-orange-500",
    description: "Balanced meal replacement with essential vitamins, minerals, and protein",
    benefits: ["25g Protein", "21 Vitamins", "Low Calorie"],
    tags: ["Weight Management", "Meal Replacement"],
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
  },
  {
    id: 2,
    name: "Herbalife Afresh Energy Drink",
    category: "teas",
    price: "₹999",
    originalPrice: "₹1,199",
    rating: 4.8,
    reviews: 256,
    image: null,
    badge: "Popular",
    badgeColor: "from-emerald-500 to-teal-500",
    description: "Natural energy boost with green tea extracts and essential nutrients",
    benefits: ["Natural Energy", "Antioxidants", "Low Sugar"],
    tags: ["Energy", "Metabolism"],
    gradient: "from-green-500/20 via-emerald-500/10 to-transparent",
  },
  {
    id: 3,
    name: "Personalized Protein Powder",
    category: "supplements",
    price: "₹1,599",
    originalPrice: "₹1,899",
    rating: 4.7,
    reviews: 189,
    image: null,
    badge: "AI Recommended",
    badgeColor: "from-violet-500 to-purple-500",
    description: "Customizable protein blend for your specific fitness goals",
    benefits: ["24g Protein", "Low Fat", "Easy Mix"],
    tags: ["Muscle Building", "Recovery"],
    gradient: "from-teal-500/20 via-cyan-500/10 to-transparent",
  },
  {
    id: 4,
    name: "Herbal Aloe Concentrate",
    category: "teas",
    price: "₹1,299",
    originalPrice: "₹1,499",
    rating: 4.6,
    reviews: 178,
    image: null,
    badge: null,
    badgeColor: "",
    description: "Soothing aloe vera drink for digestive health and hydration",
    benefits: ["Digestive Health", "Hydration", "Natural"],
    tags: ["Gut Health", "Hydration"],
    gradient: "from-lime-500/20 via-green-500/10 to-transparent",
  },
  {
    id: 5,
    name: "Herbalife SKIN Collagen Beauty Booster",
    category: "skin",
    price: "₹3,499",
    originalPrice: "₹3,999",
    rating: 4.8,
    reviews: 124,
    image: null,
    badge: "Premium",
    badgeColor: "from-rose-500 to-pink-500",
    description: "Advanced collagen peptides for radiant skin and anti-aging benefits",
    benefits: ["Collagen", "Vitamin C", "Anti-aging"],
    tags: ["Beauty", "Skin Health"],
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
  },
  {
    id: 6,
    name: "Cell Activator Supplement",
    category: "supplements",
    price: "₹1,799",
    originalPrice: "₹2,099",
    rating: 4.5,
    reviews: 145,
    image: null,
    badge: null,
    badgeColor: "",
    description: "Essential vitamins and minerals to support cellular nutrition and energy",
    benefits: ["B-Vitamins", "Antioxidants", "Cellular Health"],
    tags: ["Immunity", "Energy"],
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
  },
  {
    id: 7,
    name: "Formula 1 Sport Shake",
    category: "shakes",
    price: "₹2,899",
    originalPrice: "₹3,299",
    rating: 4.9,
    reviews: 98,
    image: null,
    badge: "New",
    badgeColor: "from-blue-500 to-indigo-500",
    description: "High-performance nutrition for athletes and active lifestyles",
    benefits: ["30g Protein", "NSF Certified", "Electrolytes"],
    tags: ["Sports", "Performance"],
    gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
  },
  {
    id: 8,
    name: "Herbal Tea Concentrate",
    category: "teas",
    price: "₹1,499",
    originalPrice: "₹1,699",
    rating: 4.7,
    reviews: 210,
    image: null,
    badge: "Popular",
    badgeColor: "from-emerald-500 to-teal-500",
    description: "Refreshing herbal tea blend for metabolism boost and focus",
    benefits: ["85mg Caffeine", "Zero Sugar", "Thermogenic"],
    tags: ["Metabolism", "Focus"],
    gradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
  },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null);
  const [productsList, setProductsList] = useState(products);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          if (data.products && data.products.length > 0) {
            setProductsList(data.products);
          }
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = productsList.filter((p) => {
    const matchesCategory =
      activeCategory === "all" || p.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero pb-8 pt-12">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Premium Collection
            </span>
            <h1 className="mt-4 font-heading text-4xl font-bold text-foreground sm:text-5xl">
              Our <span className="text-gradient-green">Products</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              World-class Herbalife nutrition products with AI-powered
              recommendations tailored to your wellness goals
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-8 max-w-xl"
          >
            <div className="glass relative flex items-center gap-3 rounded-2xl px-5 py-3 shadow-premium">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products, ingredients, benefits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="scrollbar-hide -mb-px flex gap-1 overflow-x-auto py-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300",
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <cat.icon className="h-4 w-4" />
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Results count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {filteredProducts.length}
              </span>{" "}
              products
            </p>
            <button className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <SlidersHorizontal className="h-4 w-4" />
              Sort
            </button>
          </div>

          <motion.div
            layout
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="glass group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-premium-lg">
                    {/* Badge */}
                    {product.badge && (
                      <div
                        className={cn(
                          "absolute left-3 top-3 z-10 rounded-full bg-gradient-to-r px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md",
                          product.badgeColor
                        )}
                      >
                        {product.badge}
                      </div>
                    )}

                    {/* Product Image Area */}
                    <div
                      className={cn(
                        "relative flex h-52 items-center justify-center bg-gradient-to-br",
                        product.gradient
                      )}
                    >
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                        <ShoppingBag className="h-10 w-10 text-primary" />
                      </div>

                      {/* Quick view button */}
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-foreground opacity-0 backdrop-blur-md transition-all duration-300 hover:bg-white/30 group-hover:opacity-100"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-5">
                      {/* Tags */}
                      <div className="mb-2 flex flex-wrap gap-1.5">
                        {product.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-primary/8 px-2 py-0.5 text-[10px] font-medium text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="font-heading text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                        {product.name}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                        {product.description}
                      </p>

                      {/* Benefits pills */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {product.benefits.map((b) => (
                          <span
                            key={b}
                            className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground"
                          >
                            {b}
                          </span>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="mt-auto flex items-end justify-between pt-4">
                        <div>
                          <span className="text-lg font-bold text-foreground">
                            {product.price}
                          </span>
                          <span className="ml-2 text-xs text-muted-foreground line-through">
                            {product.originalPrice}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-semibold text-foreground">
                            {product.rating}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({product.reviews})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center"
            >
              <Search className="mx-auto h-12 w-12 text-muted-foreground/40" />
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                No products found
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedProduct(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-strong fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl shadow-premium-lg"
            >
              <div className={cn("relative flex h-56 items-center justify-center bg-gradient-to-br", selectedProduct.gradient)}>
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                  <ShoppingBag className="h-12 w-12 text-primary" />
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30"
                >
                  <X className="h-4 w-4" />
                </button>
                {selectedProduct.badge && (
                  <div className={cn("absolute left-4 top-4 rounded-full bg-gradient-to-r px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white", selectedProduct.badgeColor)}>
                    {selectedProduct.badge}
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-semibold">{selectedProduct.rating}</span>
                  <span className="text-xs text-muted-foreground">({selectedProduct.reviews} reviews)</span>
                </div>
                <h3 className="mt-2 font-heading text-xl font-bold text-foreground">{selectedProduct.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{selectedProduct.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedProduct.benefits.map((b) => (
                    <span key={b} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{b}</span>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-foreground">{selectedProduct.price}</span>
                    <span className="ml-2 text-sm text-muted-foreground line-through">{selectedProduct.originalPrice}</span>
                  </div>
                  <Link
                    href="/consultation"
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl"
                  >
                    Enquire Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
