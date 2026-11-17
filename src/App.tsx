/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { DoctorsSection } from "./components/DoctorsSection";
import { DiagnosticsSection } from "./components/DiagnosticsSection";
import { PharmacySection } from "./components/PharmacySection";
import { PaymentSection } from "./components/PaymentSection";
import { BookingSection } from "./components/BookingSection";
import { FaqSection } from "./components/FaqSection";
import { LocationMapSection } from "./components/LocationMapSection";
import { Footer } from "./components/Footer";
import { FloatingCallButton } from "./components/FloatingCallButton";
import { Language } from "./data/clinicData";
import {
  toggleLanguage,
  ThemeMode,
  toggleThemeMode,
} from "./utils/clinicLogic";

export default function App() {
  const [language, setLanguage] = useState<Language>("en");
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("axon-theme-mode");
      if (saved === "dark" || saved === "light") {
        return saved;
      }
    }
    return "light";
  });
  const [gmpQuotaExceeded, setGmpQuotaExceeded] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    root.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem("axon-theme-mode", theme);
    } catch {
      // Ignore storage write errors in restricted browsing modes
    }
  }, [theme]);

  useEffect(() => {
    const handleQuotaExceeded = () => {
      setGmpQuotaExceeded(true);
    };
    window.addEventListener("gmp-quota-exceeded", handleQuotaExceeded);
    return () => {
      window.removeEventListener("gmp-quota-exceeded", handleQuotaExceeded);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleToggleLanguage = () => {
    setLanguage((prev) => toggleLanguage(prev));
  };

  const handleToggleTheme = () => {
    setTheme((prev) => toggleThemeMode(prev));
  };

  return (
    <div
      data-testid="app-theme-root"
      data-theme={theme}
      className="min-h-screen flex flex-col bg-white text-[#0B1F3A] transition-colors duration-200"
    >
      {gmpQuotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{" "}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{" "}
            for instructions to update your account.
          </span>
        </div>
      )}

      <Navbar
        language={language}
        onToggleLanguage={handleToggleLanguage}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main className="flex-1">
        <HeroSection
          language={language}
          onSelectLanguage={setLanguage}
          onExploreDoctors={() => scrollToSection("doctors")}
          onOpenPayments={() => scrollToSection("payments")}
          onOpenLocationMap={() => scrollToSection("location-map")}
        />

        <DoctorsSection language={language} />

        <DiagnosticsSection language={language} />

        <PharmacySection language={language} />

        <PaymentSection language={language} />

        <BookingSection language={language} />

        <FaqSection
          language={language}
          onNavigateSection={scrollToSection}
        />

        <LocationMapSection language={language} />
      </main>

      <Footer language={language} />

      <FloatingCallButton language={language} />
    </div>
  );
}

