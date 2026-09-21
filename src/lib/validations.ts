import { z } from "zod";

// ======================== AUTH SCHEMAS ========================

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password is too long"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;

// ======================== PROFILE SCHEMAS ========================

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  phone: z.string().max(20).optional(),
  language: z.enum(["en", "te", "hi"]).optional(),
  image: z.string().url().optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

// ======================== CONSULTATION SCHEMAS ========================

export const consultationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone number required"),
  type: z.enum(["VIDEO", "VOICE", "CHAT"]),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  goals: z.array(z.string()).optional().default([]),
  message: z.string().optional(),
});

export type ConsultationInput = z.infer<typeof consultationSchema>;

// ======================== CONTACT SCHEMAS ========================

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactInput = z.infer<typeof contactSchema>;

// ======================== AI REQUEST SCHEMAS ========================

const metricValue = z.number().finite().min(0).max(1_000).optional();

export const bodyMetricsSchema = z.object({
  weight: metricValue,
  height: metricValue,
  bmi: metricValue,
  bmr: metricValue,
  bodyFat: metricValue,
  muscleMass: metricValue,
  visceralFat: metricValue,
  subcutaneousFat: metricValue,
  waterPercent: metricValue,
  boneMass: metricValue,
  metabolicAge: z.number().int().min(0).max(150).optional(),
  chronologicalAge: z.number().int().min(0).max(150).optional(),
  healthScore: metricValue,
}).strict();

export const bodyAnalysisRequestSchema = z.object({ metrics: bodyMetricsSchema.default({}) }).strict();
export const healthScoreRequestSchema = bodyAnalysisRequestSchema;
export const bodyMetricCreateSchema = bodyMetricsSchema.extend({
  notes: z.string().trim().max(2_000).optional(),
  source: z.string().trim().min(1).max(50).optional(),
  measuredAt: z.string().datetime().optional(),
}).strict();
export const mealPlanRequestSchema = z.object({
  goal: z.string().trim().min(2).max(100).optional(),
  calories: z.number().int().min(800).max(6_000).optional(),
  bmi: metricValue,
  bodyFat: metricValue,
  activityLevel: z.string().trim().min(2).max(50).optional(),
  allergies: z.array(z.string().trim().min(1).max(50)).max(20).optional(),
  preferences: z.array(z.string().trim().min(1).max(50)).max(20).optional(),
}).strict();
export const recommendationRequestSchema = z.object({
  goals: z.array(z.string().trim().min(1).max(100)).min(1).max(10).optional(),
  bmi: metricValue,
  bodyFat: metricValue,
  concerns: z.array(z.string().trim().min(1).max(100)).max(10).optional(),
}).strict();
export const faqRequestSchema = z.object({ question: z.string().trim().min(2).max(1_000) }).strict();
export const searchRequestSchema = z.object({ query: z.string().trim().min(2).max(300) }).strict();
export const translateRequestSchema = z.object({
  text: z.string().trim().min(1).max(2_000),
  targetLang: z.enum(["en", "te", "hi"]),
}).strict();
export const motivationRequestSchema = z.object({
  progress: z.string().trim().max(500).optional(),
  streak: z.number().int().min(0).max(10_000).optional(),
  recentActivity: z.string().trim().max(500).optional(),
}).strict();
export const reportRequestSchema = z.object({
  metrics: bodyMetricsSchema.default({}),
  healthScore: z.number().finite().min(0).max(100).optional(),
  grade: z.string().trim().max(10).optional(),
  name: z.string().trim().max(100).optional(),
}).strict();
