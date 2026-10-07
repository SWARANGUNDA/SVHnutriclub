# SVH Nutrition Club - Project Context

## Project Overview
SVH Nutrition Club is a comprehensive, AI-powered health and wellness platform. It combines personalized health tracking, AI-driven nutritional guidance, e-commerce, and a coach-to-customer hierarchy into a single premium ecosystem.

## Core Features & Architecture
1. **AI-Powered Wellness & Analytics:**
   - **Body Metrics Tracking:** Users track weight, BMI, body fat, and metabolic age.
   - **AI Meal Planning:** Generates personalized 7-day or 30-day meal plans based on user metrics and goals (using Groq as primary, Gemini as fallback).
   - **AI Body Dashboard:** Generates a "Health Score" and actionable insights.

2. **E-Commerce & Products:**
   - Full store functionality for nutrition products (Herbalife).
   - Order tracking and cart management.

3. **Coaching & Community:**
   - **Role Hierarchy:** Admin -> Associate -> Customer. Associates can manage and track the progress of their assigned customers.
   - **Consultations:** Built-in system for scheduling Video, Voice, or Chat consultations.
   - **Engagement:** Habit tracking, challenges, journaling, and transformations.

## Tech Stack
- **Framework:** Next.js 15+ (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4, Framer Motion (animations), shadcn/ui
- **Database:** PostgreSQL (hosted on Supabase) accessed via Prisma ORM
- **Authentication:** NextAuth.js (v5 Beta)
- **AI Integration:** `@google/generative-ai` & Groq SDK (abstracted via a fallback provider)
- **State Management:** Zustand
- **3D Visuals:** Three.js, React Three Fiber/Drei

## Current UI Design Philosophy (Refactoring Guidelines)
The goal is to maintain a **Premium, Sleek, and Clean** design:
- **Restraint with Animations:** Avoid constant looping animations (floating objects, pulsing orbs). Use animations intentionally for interactions and smooth page loads.
- **Clean Backgrounds:** Prefer solid colors or highly subtle gradients over complex overlapping radial gradients and grid overlays.
- **Glassmorphism:** Use sparingly for floating elements (like fixed headers), not for primary content cards or buttons.
- **High Contrast Typography:** Use strong typography (Inter/Poppins) over text gradients.
- **Color Palette:** Use the brand `svh-green` as a deliberate accent color, not as an overarching background.
