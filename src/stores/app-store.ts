import { create } from "zustand";
import { persist } from "zustand/middleware";

type Language = "en" | "te" | "hi";

interface AppState {
  // Language
  language: Language;
  setLanguage: (lang: Language) => void;

  // Mobile menu
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;

  // AI Assistant panel
  isAIAssistantOpen: boolean;
  setAIAssistantOpen: (open: boolean) => void;
  toggleAIAssistant: () => void;

  // Sidebar (admin/dashboard)
  isSidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Language
      language: "en",
      setLanguage: (language) => set({ language }),

      // Mobile menu
      isMobileMenuOpen: false,
      setMobileMenuOpen: (isMobileMenuOpen) => set({ isMobileMenuOpen }),
      toggleMobileMenu: () =>
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

      // AI Assistant
      isAIAssistantOpen: false,
      setAIAssistantOpen: (isAIAssistantOpen) => set({ isAIAssistantOpen }),
      toggleAIAssistant: () =>
        set((state) => ({ isAIAssistantOpen: !state.isAIAssistantOpen })),

      // Sidebar
      isSidebarCollapsed: false,
      setSidebarCollapsed: (isSidebarCollapsed) => set({ isSidebarCollapsed }),
      toggleSidebar: () =>
        set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
    }),
    {
      name: "svh-app-store",
      partialize: (state) => ({
        language: state.language,
        isSidebarCollapsed: state.isSidebarCollapsed,
      }),
    }
  )
);
