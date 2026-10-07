# SVH Nutrition Club - New Architecture & Build Plan

## The Core Philosophy
SVH is a premium digital wellness platform, not a generic admin template or a random collection of AI tools. 
The application must feel like one continuous, guided wellness journey organized around customer intent.

## The Customer Journey
1. Understand My Body (Upload/Enter metrics)
2. Improve My Nutrition (AI Meal Gen, Food Scanner)
3. Track My Progress (Timeline, Reports)
4. Get Personalized Guidance (AI Coach)
5. Learn (Education)
6. Stay Motivated (Challenges, Transformations)

## UI/UX & Design System
- **Vibe:** Premium, Futuristic, Intelligent, Trustworthy.
- **Colors:** Deep black / dark backgrounds, Emerald green primary accent, soft green glow, white typography, muted grey text.
- **Components:** Generous spacing, large premium typography, subtle borders, careful use of glassmorphism.
- **AI Discovery:** Amazon-style horizontal scrolling carousels for AI feature discovery (slow speed, infinite loop, pause on hover). No massive sidebar menus for these.

## Authentication & Authorization Architecture
Strict Role-Based Access Control (RBAC) with separate portals and login flows:
- **Customer:** `/login` -> `/dashboard/*` (Own data only)
- **Associate:** `/associate/login` -> `/associate/*` (Own data + Downline)
- **Admin:** `/admin/login` -> `/admin/*` (Organization-wide access)

Server-side verification of Identity + Role + Status + Portal before granting access.

## Build Strategy Roadmap

- **PHASE 0:** Design system + application architecture cleanup.
- **PHASE 1:** Authentication from scratch (Customer/Associate/Admin) + Strict RBAC.
- **PHASE 2:** Public website + homepage rebuild.
- **PHASE 3:** Customer wellness home/dashboard rebuild.
- **PHASE 4:** Body Scan + Body Analysis.
- **PHASE 5:** Wellness Score + Goals + Habits.
- **PHASE 6:** 3D Body + Progress.
- **PHASE 7:** Nutrition + Meals + Food Scanner.
- **PHASE 8:** Products + AI Product Matching.
- **PHASE 9:** AI Wellness Intelligence (Contextual AI Layer).
- **PHASE 10:** Challenges + Journal + Education.
- **PHASE 11:** Reports + Transformations.
- **PHASE 12:** Associate Network Portal.
- **PHASE 13:** Admin Portal.
- **PHASE 14:** Hardening + Notifications + Voice + PWA.

*Note: We will reuse the existing PostgreSQL database (`svh`) and Prisma models. The `social_db` will remain untouched.*
