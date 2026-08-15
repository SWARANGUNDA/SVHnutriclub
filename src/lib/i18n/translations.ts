/**
 * SVH Nutrition Club — Multilingual Translation System
 * Supports: English (en), Telugu (te), Hindi (hi)
 */

export type Language = "en" | "te" | "hi";

export interface TranslationSet {
  // Navigation
  nav_home: string;
  nav_about: string;
  nav_products: string;
  nav_results: string;
  nav_services: string;
  nav_blog: string;
  nav_contact: string;
  nav_consultation: string;
  nav_login: string;
  nav_dashboard: string;

  // Hero
  hero_badge: string;
  hero_title: string;
  hero_subtitle: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;

  // Dashboard
  dash_title: string;
  dash_subtitle: string;
  dash_health_score: string;
  dash_body_metrics: string;
  dash_ai_insights: string;
  dash_recommendations: string;
  dash_edit_metrics: string;
  dash_done: string;
  dash_refresh: string;
  dash_meal_plan: string;

  // Metrics
  metric_weight: string;
  metric_bmi: string;
  metric_body_fat: string;
  metric_muscle_mass: string;
  metric_bmr: string;
  metric_hydration: string;
  metric_visceral_fat: string;
  metric_metabolic_age: string;

  // Meals
  meal_title: string;
  meal_subtitle: string;
  meal_goal: string;
  meal_generate: string;
  meal_tips: string;
  meal_breakfast: string;
  meal_lunch: string;
  meal_dinner: string;

  // Products
  products_title: string;
  products_subtitle: string;
  products_search: string;
  products_all: string;
  products_view: string;
  products_add_cart: string;

  // Voice Assistant
  voice_greeting: string;
  voice_placeholder: string;
  voice_listening: string;
  voice_listen: string;

  // Report
  report_title: string;
  report_generate: string;
  report_download: string;
  report_regenerate: string;

  // Common
  common_loading: string;
  common_error: string;
  common_back: string;
  common_learn_more: string;
  common_book_now: string;
  common_submit: string;
  common_search: string;

  // Footer
  footer_tagline: string;
  footer_newsletter: string;
  footer_email_placeholder: string;
  footer_subscribe: string;
  footer_rights: string;
}

const translations: Record<Language, TranslationSet> = {
  en: {
    // Navigation
    nav_home: "Home",
    nav_about: "About",
    nav_products: "Products",
    nav_results: "Results",
    nav_services: "Services",
    nav_blog: "Blog",
    nav_contact: "Contact",
    nav_consultation: "Free Consultation",
    nav_login: "Login",
    nav_dashboard: "Dashboard",

    // Hero
    hero_badge: "AI-Powered Wellness Platform",
    hero_title: "Transform Your Health with Smart Nutrition",
    hero_subtitle: "Experience the future of wellness with AI body analytics, personalized meal plans, and premium Herbalife nutrition products.",
    hero_cta_primary: "Start Your Journey",
    hero_cta_secondary: "Book Free Consultation",

    // Dashboard
    dash_title: "Your Wellness Overview",
    dash_subtitle: "AI-powered insights based on your body metrics",
    dash_health_score: "Health Score",
    dash_body_metrics: "Body Metrics",
    dash_ai_insights: "AI Insights",
    dash_recommendations: "AI Recommendations",
    dash_edit_metrics: "Edit Metrics",
    dash_done: "Done",
    dash_refresh: "Refresh",
    dash_meal_plan: "Meal Plan",

    // Metrics
    metric_weight: "Weight",
    metric_bmi: "BMI",
    metric_body_fat: "Body Fat",
    metric_muscle_mass: "Muscle Mass",
    metric_bmr: "BMR",
    metric_hydration: "Hydration",
    metric_visceral_fat: "Visceral Fat",
    metric_metabolic_age: "Metabolic Age",

    // Meals
    meal_title: "Personalized Meal Plan",
    meal_subtitle: "AI-generated vegetarian nutrition plan tailored to your goals",
    meal_goal: "Your Goal",
    meal_generate: "Generate Plan",
    meal_tips: "Nutrition Tips",
    meal_breakfast: "Breakfast",
    meal_lunch: "Lunch",
    meal_dinner: "Dinner",

    // Products
    products_title: "Premium Nutrition Products",
    products_subtitle: "Discover our range of AI-recommended wellness products",
    products_search: "Search products...",
    products_all: "All Products",
    products_view: "View Details",
    products_add_cart: "Add to Cart",

    // Voice Assistant
    voice_greeting: "Hi! I'm your SVH Wellness AI. Ask me about nutrition, body metrics, products, or wellness tips! 🌿",
    voice_placeholder: "Ask anything...",
    voice_listening: "Listening...",
    voice_listen: "Listen",

    // Report
    report_title: "Wellness Report",
    report_generate: "Generate AI Report",
    report_download: "Download PDF",
    report_regenerate: "Regenerate",

    // Common
    common_loading: "Loading...",
    common_error: "Something went wrong",
    common_back: "Back",
    common_learn_more: "Learn More",
    common_book_now: "Book Now",
    common_submit: "Submit",
    common_search: "Search...",

    // Footer
    footer_tagline: "Transform your health with AI-powered nutrition insights and premium wellness products.",
    footer_newsletter: "Stay Updated",
    footer_email_placeholder: "Enter your email",
    footer_subscribe: "Subscribe",
    footer_rights: "All rights reserved.",
  },

  te: {
    // Navigation
    nav_home: "హోమ్",
    nav_about: "మా గురించి",
    nav_products: "ఉత్పత్తులు",
    nav_results: "ఫలితాలు",
    nav_services: "సేవలు",
    nav_blog: "బ్లాగ్",
    nav_contact: "సంప్రదించండి",
    nav_consultation: "ఉచిత సంప్రదింపు",
    nav_login: "లాగిన్",
    nav_dashboard: "డాష్‌బోర్డ్",

    // Hero
    hero_badge: "AI-ఆధారిత ఆరోగ్య వేదిక",
    hero_title: "స్మార్ట్ పోషణతో మీ ఆరోగ్యాన్ని మార్చుకోండి",
    hero_subtitle: "AI బాడీ అనాలిటిక్స్, వ్యక్తిగత భోజన ప్రణాళికలు మరియు ప్రీమియం హెర్బలైఫ్ పోషణ ఉత్పత్తులతో ఆరోగ్య భవిష్యత్తును అనుభవించండి.",
    hero_cta_primary: "మీ ప్రయాణాన్ని ప్రారంభించండి",
    hero_cta_secondary: "ఉచిత సంప్రదింపు బుక్ చేయండి",

    // Dashboard
    dash_title: "మీ ఆరోగ్య అవలోకనం",
    dash_subtitle: "మీ శరీర కొలతల ఆధారంగా AI అంతర్దృష్టులు",
    dash_health_score: "ఆరోగ్య స్కోరు",
    dash_body_metrics: "శరీర కొలతలు",
    dash_ai_insights: "AI అంతర్దృష్టులు",
    dash_recommendations: "AI సిఫార్సులు",
    dash_edit_metrics: "కొలతలు మార్చండి",
    dash_done: "పూర్తయింది",
    dash_refresh: "రిఫ్రెష్",
    dash_meal_plan: "భోజన ప్రణాళిక",

    // Metrics
    metric_weight: "బరువు",
    metric_bmi: "BMI",
    metric_body_fat: "శరీర కొవ్వు",
    metric_muscle_mass: "కండర ద్రవ్యరాశి",
    metric_bmr: "BMR",
    metric_hydration: "హైడ్రేషన్",
    metric_visceral_fat: "విసెరల్ ఫ్యాట్",
    metric_metabolic_age: "జీవక్రియ వయసు",

    // Meals
    meal_title: "వ్యక్తిగత భోజన ప్రణాళిక",
    meal_subtitle: "మీ లక్ష్యాలకు అనుగుణంగా AI-రూపొందించిన శాఖాహార పోషణ ప్రణాళిక",
    meal_goal: "మీ లక్ష్యం",
    meal_generate: "ప్రణాళిక రూపొందించు",
    meal_tips: "పోషణ చిట్కాలు",
    meal_breakfast: "అల్పాహారం",
    meal_lunch: "భోజనం",
    meal_dinner: "రాత్రి భోజనం",

    // Products
    products_title: "ప్రీమియం పోషణ ఉత్పత్తులు",
    products_subtitle: "AI-సిఫార్సు చేసిన ఆరోగ్య ఉత్పత్తులను కనుగొనండి",
    products_search: "ఉత్పత్తులను వెతకండి...",
    products_all: "అన్ని ఉత్పత్తులు",
    products_view: "వివరాలు చూడండి",
    products_add_cart: "కార్ట్‌కు జోడించు",

    // Voice Assistant
    voice_greeting: "నమస్కారం! నేను మీ SVH ఆరోగ్య AI. పోషణ, శరీర కొలతలు, ఉత్పత్తులు లేదా ఆరోగ్య చిట్కాల గురించి అడగండి! 🌿",
    voice_placeholder: "ఏదైనా అడగండి...",
    voice_listening: "వింటోంది...",
    voice_listen: "వినండి",

    // Report
    report_title: "ఆరోగ్య నివేదిక",
    report_generate: "AI నివేదిక రూపొందించు",
    report_download: "PDF డౌన్‌లోడ్",
    report_regenerate: "మళ్ళీ రూపొందించు",

    // Common
    common_loading: "లోడ్ అవుతోంది...",
    common_error: "ఏదో తప్పు జరిగింది",
    common_back: "వెనుకకు",
    common_learn_more: "మరింత తెలుసుకోండి",
    common_book_now: "ఇప్పుడు బుక్ చేయండి",
    common_submit: "సమర్పించు",
    common_search: "వెతకండి...",

    // Footer
    footer_tagline: "AI-ఆధారిత పోషణ అంతర్దృష్టులు మరియు ప్రీమియం ఆరోగ్య ఉత్పత్తులతో మీ ఆరోగ్యాన్ని మార్చుకోండి.",
    footer_newsletter: "అప్‌డేట్‌గా ఉండండి",
    footer_email_placeholder: "మీ ఇమెయిల్ నమోదు చేయండి",
    footer_subscribe: "సబ్‌స్క్రైబ్",
    footer_rights: "అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.",
  },

  hi: {
    // Navigation
    nav_home: "होम",
    nav_about: "हमारे बारे में",
    nav_products: "उत्पाद",
    nav_results: "परिणाम",
    nav_services: "सेवाएं",
    nav_blog: "ब्लॉग",
    nav_contact: "संपर्क",
    nav_consultation: "मुफ्त परामर्श",
    nav_login: "लॉगिन",
    nav_dashboard: "डैशबोर्ड",

    // Hero
    hero_badge: "AI-संचालित वेलनेस प्लेटफ़ॉर्म",
    hero_title: "स्मार्ट पोषण से अपने स्वास्थ्य को बदलें",
    hero_subtitle: "AI बॉडी एनालिटिक्स, व्यक्तिगत भोजन योजनाओं और प्रीमियम हर्बालाइफ पोषण उत्पादों के साथ वेलनेस के भविष्य का अनुभव करें।",
    hero_cta_primary: "अपनी यात्रा शुरू करें",
    hero_cta_secondary: "मुफ्त परामर्श बुक करें",

    // Dashboard
    dash_title: "आपका वेलनेस ओवरव्यू",
    dash_subtitle: "आपके शरीर के मापदंडों पर आधारित AI अंतर्दृष्टि",
    dash_health_score: "स्वास्थ्य स्कोर",
    dash_body_metrics: "शरीर मापदंड",
    dash_ai_insights: "AI अंतर्दृष्टि",
    dash_recommendations: "AI सिफारिशें",
    dash_edit_metrics: "मापदंड संपादित करें",
    dash_done: "पूर्ण",
    dash_refresh: "रिफ्रेश",
    dash_meal_plan: "भोजन योजना",

    // Metrics
    metric_weight: "वज़न",
    metric_bmi: "BMI",
    metric_body_fat: "शरीर की चर्बी",
    metric_muscle_mass: "मांसपेशी द्रव्यमान",
    metric_bmr: "BMR",
    metric_hydration: "हाइड्रेशन",
    metric_visceral_fat: "विसरल फैट",
    metric_metabolic_age: "चयापचय आयु",

    // Meals
    meal_title: "व्यक्तिगत भोजन योजना",
    meal_subtitle: "आपके लक्ष्यों के अनुसार AI-जनित शाकाहारी पोषण योजना",
    meal_goal: "आपका लक्ष्य",
    meal_generate: "योजना बनाएं",
    meal_tips: "पोषण सुझाव",
    meal_breakfast: "नाश्ता",
    meal_lunch: "दोपहर का भोजन",
    meal_dinner: "रात का खाना",

    // Products
    products_title: "प्रीमियम पोषण उत्पाद",
    products_subtitle: "AI-अनुशंसित वेलनेस उत्पाद खोजें",
    products_search: "उत्पाद खोजें...",
    products_all: "सभी उत्पाद",
    products_view: "विवरण देखें",
    products_add_cart: "कार्ट में जोड़ें",

    // Voice Assistant
    voice_greeting: "नमस्ते! मैं आपका SVH वेलनेस AI हूं। पोषण, शरीर के मापदंड, उत्पाद या वेलनेस टिप्स के बारे में पूछें! 🌿",
    voice_placeholder: "कुछ भी पूछें...",
    voice_listening: "सुन रहा है...",
    voice_listen: "सुनें",

    // Report
    report_title: "वेलनेस रिपोर्ट",
    report_generate: "AI रिपोर्ट बनाएं",
    report_download: "PDF डाउनलोड",
    report_regenerate: "पुनः बनाएं",

    // Common
    common_loading: "लोड हो रहा है...",
    common_error: "कुछ गलत हो गया",
    common_back: "वापस",
    common_learn_more: "और जानें",
    common_book_now: "अभी बुक करें",
    common_submit: "जमा करें",
    common_search: "खोजें...",

    // Footer
    footer_tagline: "AI-संचालित पोषण अंतर्दृष्टि और प्रीमियम वेलनेस उत्पादों के साथ अपने स्वास्थ्य को बदलें।",
    footer_newsletter: "अपडेट रहें",
    footer_email_placeholder: "अपना ईमेल दर्ज करें",
    footer_subscribe: "सबस्क्राइब",
    footer_rights: "सर्वाधिकार सुरक्षित।",
  },
};

export function t(key: keyof TranslationSet, lang: Language = "en"): string {
  return translations[lang]?.[key] || translations.en[key] || key;
}

export function getTranslations(lang: Language): TranslationSet {
  return translations[lang] || translations.en;
}

export const SUPPORTED_LANGUAGES: { code: Language; label: string; flag: string; nativeName: string }[] = [
  { code: "en", label: "English", flag: "🇺🇸", nativeName: "English" },
  { code: "te", label: "Telugu", flag: "🇮🇳", nativeName: "తెలుగు" },
  { code: "hi", label: "Hindi", flag: "🇮🇳", nativeName: "हिन्दी" },
];
