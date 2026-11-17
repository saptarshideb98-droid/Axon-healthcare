import React, { useState } from "react";
import { Menu, X, Globe, MapPin, Sun, Moon } from "lucide-react";
import { CLINIC_INFO, Language } from "../data/clinicData";
import {
  getClinicGoogleMapsLinks,
  ThemeMode,
  getThemeToggleLabel,
} from "../utils/clinicLogic";

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  theme?: ThemeMode;
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onToggleLanguage,
  theme = "light",
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mapsLinks = getClinicGoogleMapsLinks(CLINIC_INFO, language);
  const themeToggleInfo = getThemeToggleLabel(theme, language);
  const isDark = theme === "dark";

  const navItems = [
    { label: language === "en" ? "Doctors" : "চিকিৎসকবৃন্দ", href: "#doctors" },
    { label: language === "en" ? "Diagnostics" : "ডায়াগনস্টিকস", href: "#diagnostics" },
    { label: language === "en" ? "Pharmacy" : "ফার্মেসি", href: "#pharmacy" },
    { label: language === "en" ? "Payments" : "পেমেন্ট", href: "#payments" },
    { label: language === "en" ? "Contact" : "যোগাযোগ", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B1F3A]/95 backdrop-blur-md border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Official AXON Healthcare Logo & Single-Line Wordmark */}
        <a
          href="#home"
          className="inline-flex items-center gap-3 text-lg sm:text-xl font-display font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#22D3EE]"
        >
          <img
            src={CLINIC_INFO.logoUrl}
            alt="AXON Healthcare Logo"
            referrerPolicy="no-referrer"
            className="qr-scan-surface w-10 h-10 rounded-xl object-contain bg-white p-1 border border-white/20 shrink-0"
          />
          <span>
            {language === "en" ? (
              <>
                AXON <span className="text-[#22D3EE]">HEALTHCARE</span>
              </>
            ) : (
              <>
                অ্যাক্সন <span className="text-[#22D3EE]">হেলথকেয়ার</span>
              </>
            )}
          </span>
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-200"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-[#22D3EE] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#22D3EE]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Direct Google Maps Redirect + Global Theme Toggle + Language Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={mapsLinks.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="navbar-google-maps-redirect"
            title={
              language === "en"
                ? "Trace & Check AXON Healthcare Location on Google Maps"
                : "গুগল ম্যাপে অ্যাক্সন হেলথকেয়ারের অবস্থান ও রুট দেখুন"
            }
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/15 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <MapPin className="w-3.5 h-3.5 text-[#22D3EE] shrink-0" />
            <span>{language === "en" ? "Google Maps" : "গুগল ম্যাপ"}</span>
          </a>

          {onToggleTheme && (
            <button
              type="button"
              onClick={onToggleTheme}
              data-testid="navbar-theme-toggle"
              aria-label={themeToggleInfo.ariaLabel}
              aria-pressed={isDark}
              title={themeToggleInfo.ariaLabel}
              className="px-3 py-2 text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/15 rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22D3EE]"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-300 shrink-0" />
              ) : (
                <Moon className="w-4 h-4 text-[#22D3EE] shrink-0" />
              )}
              <span className="hidden sm:inline">{themeToggleInfo.label}</span>
            </button>
          )}

          <button
            type="button"
            onClick={onToggleLanguage}
            data-testid="navbar-language-toggle"
            aria-label={
              language === "en"
                ? "Switch language to Bengali (বাংলা)"
                : "Switch language to English"
            }
            className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-[#0B1F3A] bg-[#22D3EE] hover:bg-[#67E8F9] rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22D3EE]"
          >
            <Globe className="w-4 h-4 shrink-0" />
            <span>{language === "en" ? "বাংলা (Bengali)" : "English"}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={
              mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            className="lg:hidden p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="lg:hidden bg-[#0B1F3A] border-t border-white/10 px-4 pt-3 pb-5 space-y-2"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-100 hover:bg-white/10 hover:text-[#22D3EE] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href={mapsLinks.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-[#22D3EE] bg-white/5 hover:bg-white/10 transition-colors"
          >
            <MapPin className="w-4 h-4 shrink-0" />
            <span>
              {language === "en"
                ? "Trace & Check Location on Google Maps"
                : "গুগল ম্যাপে ক্লিনিকের অবস্থান ট্র্যাক করুন"}
            </span>
          </a>
        </nav>
      )}
    </header>
  );
};


