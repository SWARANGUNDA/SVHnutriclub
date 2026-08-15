import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about SVH Nutrition Club — our mission, vision, and commitment to transforming lives through AI-powered wellness and premium Herbalife nutrition.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
