"use client";

import { useAppStore } from "@/stores/app-store";
import { t, getTranslations, type Language, type TranslationSet } from "./translations";

/**
 * Hook to access translations based on current app language.
 * Usage:
 *   const { t, lang, translations } = useTranslation();
 *   <h1>{t("hero_title")}</h1>
 */
export function useTranslation() {
  const language = useAppStore((s) => s.language) as Language;
  const lang = language || "en";

  return {
    t: (key: keyof TranslationSet) => t(key, lang),
    lang,
    translations: getTranslations(lang),
  };
}

export { type Language, type TranslationSet } from "./translations";
export { SUPPORTED_LANGUAGES } from "./translations";
