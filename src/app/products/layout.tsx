import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore our premium Herbalife nutrition products with AI-powered recommendations, 3D visualization, and expert guidance for your wellness goals.",
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
