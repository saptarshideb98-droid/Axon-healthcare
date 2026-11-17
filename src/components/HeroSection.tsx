import React from "react";
import {
  PhoneCall,
  MapPin,
  Clock,
  ArrowRight,
  QrCode,
  Navigation,
  ExternalLink,
} from "lucide-react";
import { CLINIC_INFO, PAYMENT_INFO, Language } from "../data/clinicData";
import {
  getBrandIdentityHeader,
  getClinicGoogleMapsLinks,
} from "../utils/clinicLogic";
import { ReferenceImageSlot } from "./ReferenceImageSlot";

interface HeroSectionProps {
  language: Language;
  onSelectLanguage: (lang: Language) => void;
  onExploreDoctors: () => void;
  onOpenPayments: () => void;
  onOpenLocationMap?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onSelectLanguage,
  onExploreDoctors,
  onOpenPayments,
  onOpenLocationMap,
}) => {
  const isBn = language === "bn";
  const brandHeader = getBrandIdentityHeader(CLINIC_INFO, language);
  const mapsLinks = getClinicGoogleMapsLinks(CLINIC_INFO, language);

  return (
    <section
      id="home"
      className="scroll-mt-16 relative bg-white pt-6 pb-14 lg:pt-8 lg:pb-20 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Opening Page Brand Identity Masthead: Official AXON Healthcare Logo & Brand Name */}
        <div
          data-testid="opening-brand-masthead"
          className="bg-[#F4F7FA] rounded-2xl p-5 sm:p-7 mb-7 border border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
        >
          {/* Left: Prominent Official Logo + Brand Name Lockup */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border border-slate-200 p-2 flex items-center justify-center shrink-0">
              <img
                src={brandHeader.logoUrl}
                alt={`${CLINIC_INFO.name} Official Logo`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-[#0B1F3A]">
                  {isBn ? (
                    <>
                      অ্যাক্সন{" "}
                      <span className="text-[#0891B2]">হেলথকেয়ার</span>
                    </>
                  ) : (
                    <>
                      AXON <span className="text-[#0891B2]">HEALTHCARE</span>
                    </>
                  )}
                </span>
                <span aria-hidden="true" className="text-slate-300 text-lg">
                  ·
                </span>
                <span className="text-sm sm:text-base font-semibold text-slate-600">
                  {brandHeader.brandNameSecondary}
                </span>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-[#0891B2]">
                {brandHeader.descriptor}
              </p>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-slate-600 pt-0.5">
                <a
                  href={mapsLinks.searchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="masthead-google-maps-link"
                  className="inline-flex items-center gap-1.5 font-medium text-[#0B1F3A] hover:text-[#0891B2] transition-colors group"
                >
                  <MapPin className="w-4 h-4 text-[#0891B2] shrink-0" />
                  <span className="underline decoration-slate-300 group-hover:decoration-[#0891B2] underline-offset-2">
                    {brandHeader.addressSummary}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#0891B2] shrink-0" />
                </a>
                <span
                  aria-hidden="true"
                  className="hidden sm:inline text-slate-300"
                >
                  ·
                </span>
                <span className="inline-flex items-center gap-1.5 text-slate-600">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  {isBn
                    ? "প্রতিদিন খোলা: সকাল ৭:০০ – রাত ১০:৩০"
                    : "Open Daily: 7:00 AM – 10:30 PM"}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Direct Reception Helpline & Bilingual Language Switcher */}
          <div className="flex flex-wrap sm:flex-nowrap lg:flex-col items-start lg:items-end justify-between gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-200 shrink-0">
            <div className="flex items-center gap-2 font-mono-tabular">
              <span className="text-xs sm:text-sm text-slate-500 font-sans">
                {isBn ? "প্রধান হেল্পলাইন:" : "24/7 Clinic Helpline:"}
              </span>
              <a
                href={`tel:${CLINIC_INFO.primaryPhone}`}
                className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#0B1F3A] hover:text-[#0891B2] transition-colors whitespace-nowrap shrink-0"
              >
                <PhoneCall className="w-4 h-4 text-[#0891B2]" />
                +91 {CLINIC_INFO.primaryPhone}
              </a>
            </div>

            {/* Segmented Language Selector (English / বাংলা) */}
            <div
              role="group"
              aria-label="Select Website Language"
              className="inline-flex items-center p-1 bg-white rounded-lg border border-slate-200"
            >
              <button
                type="button"
                onClick={() => onSelectLanguage("en")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  language === "en"
                    ? "bg-[#0B1F3A] text-white"
                    : "text-slate-600 hover:text-[#0B1F3A]"
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => onSelectLanguage("bn")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  language === "bn"
                    ? "bg-[#0B1F3A] text-white"
                    : "text-slate-600 hover:text-[#0B1F3A]"
                }`}
              >
                বাংলা
              </button>
            </div>
          </div>
        </div>

        {/* Asymmetric Bento Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Primary Brand Proposition Card in Midnight Navy + Two Sub-Bento Cards */}
          <div className="lg:col-span-6 flex flex-col gap-6 justify-between">
            {/* Upper Brand & Proposition Card in Midnight Navy */}
            <div className="bg-[#0B1F3A] text-white rounded-2xl p-6 sm:p-9 border border-[#1E3A5F] flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={CLINIC_INFO.logoUrl}
                    alt={`${CLINIC_INFO.name} Emblem`}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-contain bg-white p-1.5 shrink-0"
                  />
                  <div>
                    <p className="text-sm sm:text-base font-display font-bold tracking-tight text-white">
                      {isBn ? "অ্যাক্সন হেলথকেয়ার" : "AXON Healthcare"}
                      <span className="text-[#22D3EE] font-normal ml-2 text-xs sm:text-sm">
                        · {brandHeader.tagline}
                      </span>
                    </p>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {isBn
                        ? "লালা রোড, এস.কে. রায় সিভিল হাসপাতালের নিকটে, হাইলাকান্দি"
                        : "Lala Road, Near S.K. Roy Civil Hospital, Hailakandi"}
                    </p>
                  </div>
                </div>

                <h1
                  className="font-display font-bold tracking-tight text-white leading-[1.14]"
                  style={{
                    fontSize: "clamp(2.25rem, 3.8vw, 3.35rem)",
                    textWrap: "balance",
                  }}
                >
                  {isBn
                    ? "অ্যাক্সন হেলথকেয়ার — আপনার স্বাস্থ্য, আমাদের অগ্রাধিকার"
                    : "AXON Healthcare — Your Health, Our Priority"}
                </h1>

                <p className="text-slate-300 text-base leading-relaxed max-w-xl">
                  {isBn
                    ? "হাইলাকান্দির লালা রোডে (এস.কে. রায় সিভিল হাসপাতালের নিকটে) অভিজ্ঞ বিশেষজ্ঞ চিকিৎসকদের পরামর্শ, আধুনিক ডিজিটাল এক্স-রে, থ্রি-ডি সনোগ্রাফি, ইসিজি, রক্ত পরীক্ষা এবং নির্ভরযোগ্য ফার্মেসি সেবা।"
                    : "Comprehensive outpatient consultations with senior specialists from S.K. Roy Civil Hospital, ESIC, SMCH & AMC, paired with in-store pharmacy care and high-precision diagnostic imaging on Lala Road, Hailakandi."}
                </p>
              </div>

              {/* Primary Navigation Actions */}
              <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={onExploreDoctors}
                  className="px-4 py-2.5 rounded-xl bg-[#22D3EE] hover:bg-[#67E8F9] text-[#0B1F3A] font-semibold text-xs sm:text-sm inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22D3EE]"
                >
                  {isBn ? "বিশেষজ্ঞ চিকিৎসক দেখুন" : "View Specialist Doctors"}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onOpenPayments}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs sm:text-sm inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <QrCode className="w-4 h-4 text-[#22D3EE]" />
                  {isBn ? "ইউপিআই কিউআর পেমেন্ট" : "Scan & Pay via UPI"}
                </button>

                <a
                  href={mapsLinks.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="hero-google-maps-redirect"
                  className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs sm:text-sm inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#22D3EE]" />
                  {isBn ? "গুগল ম্যাপে ট্র্যাক করুন" : "Trace on Google Maps"}
                  <ExternalLink className="w-3 h-3 text-[#22D3EE]" />
                </a>

                {onOpenLocationMap && (
                  <button
                    type="button"
                    onClick={onOpenLocationMap}
                    className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-200 border border-white/15 font-semibold text-xs sm:text-sm inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#22D3EE]" />
                    {isBn ? "ক্লিনিকের ম্যাপ" : "Location Map"}
                  </button>
                )}
              </div>
            </div>

            {/* Bottom Two Bento Summary Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-[#F4F7FA] rounded-2xl p-5 sm:p-6 border border-slate-200 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    {isBn ? "ক্লিনিক্যাল ডায়াগনস্টিকস" : "Clinical Diagnostics"}
                  </p>
                  <h2 className="text-lg font-bold text-[#0B1F3A] mt-1">
                    {isBn
                      ? "সকল প্রকার ল্যাব ও ইমেজিং পরীক্ষা"
                      : "All Types of Clinical Tests Done Here"}
                  </h2>
                </div>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {isBn
                    ? "ডিজিটাল এক্স-রে · থ্রি-ডি সনোগ্রাফি · রক্ত পরীক্ষা · ইসিজি"
                    : "Digital X-Ray · 3D Sonography · Blood Tests · 12-Lead ECG"}
                </p>
              </div>

              <div className="bg-[#ECFEFF] rounded-2xl p-5 sm:p-6 border border-[#A5F3FC] flex flex-col justify-between">
                <div>
                  <p className="text-xs font-medium text-[#0E7490]">
                    {isBn ? "ডিজিটাল পেমেন্ট ডেস্ক" : "Instant UPI QR Payment"}
                  </p>
                  <p className="text-lg sm:text-xl font-bold font-mono-tabular text-[#0B1F3A] mt-1 truncate">
                    {PAYMENT_INFO.upiId}
                  </p>
                </div>
                <p className="text-xs text-[#155E75] mt-3 leading-relaxed">
                  {isBn
                    ? `প্রাপক: ${PAYMENT_INFO.payeeNameBn} · গুগল পে ও সকল ইউপিআই`
                    : `Payee: ${PAYMENT_INFO.payeeName} · GPay, PhonePe & Paytm`}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Clinic Diagnostic Wing Photography + Official Brand Lockup & Frosted Overlay Card */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-[#F4F7FA] rounded-2xl p-5 sm:p-7 border border-slate-200 relative overflow-hidden">
            <div className="mb-4 flex items-center justify-between gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-3">
                <img
                  src={CLINIC_INFO.logoUrl}
                  alt={CLINIC_INFO.name}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-lg object-contain bg-white border border-slate-200 p-1 shrink-0"
                />
                <div>
                  <p className="font-bold text-sm text-[#0B1F3A]">
                    {isBn
                      ? "অ্যাক্সন হেলথকেয়ার — ক্লিনিক ও ডায়াগনস্টিকস"
                      : "AXON Healthcare — Clinic & Diagnostics"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {isBn
                      ? "হাইলাকান্দি · এস.কে. রায় সিভিল হাসপাতালের নিকটে"
                      : "Hailakandi · Near S.K. Roy Civil Hospital"}
                  </p>
                </div>
              </div>
              <span className="font-mono-tabular font-semibold text-[#0891B2] whitespace-nowrap">
                PIN 788151
              </span>
            </div>

            {/* Clinic & Diagnostic Wing Photograph */}
            <div className="flex-1 flex flex-col min-h-[260px]">
              <ReferenceImageSlot
                slotId="hero-clinic"
                label={
                  isBn
                    ? "অ্যাক্সন হেলথকেয়ার ডায়াগনস্টিক ও আউটডোর চেম্বার"
                    : "AXON Healthcare Outpatient Chamber & Diagnostic Wing"
                }
                sublabel={
                  isBn
                    ? "ডিজিটাল এক্স-রে, থ্রি-ডি আল্ট্রাসাউন্ড এবং বিশেষজ্ঞ আউটডোর চেম্বার বিভাগ — লালা রোড, হাইলাকান্দি"
                    : "Outpatient Specialist Consultation Chambers & Digital Imaging Wing — Lala Road, Hailakandi"
                }
                defaultImageUrl={CLINIC_INFO.heroImageUrl}
                aspectClass="w-full h-full min-h-[260px] flex-1"
                imageObjectPosition="object-center"
              />
            </div>

            {/* Frosted-Glass Floating Trust Bar */}
            <div className="mt-5 bg-[#0B1F3A]/95 backdrop-blur-md text-white rounded-xl p-4 sm:p-5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={CLINIC_INFO.logoUrl}
                  alt={CLINIC_INFO.name}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-lg object-contain bg-white p-1 shrink-0"
                />
                <div>
                  <p className="text-xs text-[#22D3EE] font-medium">
                    {isBn
                      ? "সরাসরি চেম্বার ও ল্যাব সহায়তা ডেস্ক"
                      : "Direct Chamber & Diagnostic Test Desk"}
                  </p>
                  <p className="text-sm sm:text-base font-semibold mt-0.5">
                    {isBn
                      ? "ডিজিটাল এক্স-রে, থ্রি-ডি সনোগ্রাফি, রক্ত পরীক্ষা ও ইসিজি"
                      : "Same-Day Digital X-Ray, 3D USG, ECG & Blood Tests"}
                  </p>
                </div>
              </div>
              <a
                href={`tel:${CLINIC_INFO.primaryPhone}`}
                className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono-tabular font-semibold text-[#22D3EE] whitespace-nowrap shrink-0 text-center transition-colors"
              >
                {isBn
                  ? `কল করুন ${CLINIC_INFO.primaryPhone}`
                  : `Call ${CLINIC_INFO.primaryPhone}`}
              </a>
            </div>
          </div>
        </div>

        {/* Full-Width Clinical Proof & Standards Strip Below the Hero Split */}
        <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-xs font-medium text-slate-500">
              {isBn ? "আউটডোর চেম্বার" : "Outpatient Chambers"}
            </p>
            <p className="text-2xl font-bold font-mono-tabular text-[#0B1F3A] mt-1">
              {isBn ? "৬ জন বিশেষজ্ঞ" : "6 Specialists"}
            </p>
            <p className="text-xs text-slate-600 mt-1">
              {isBn
                ? "এস.কে. রায় সিভিল হাসপাতাল, ইএসআইসি, এসএমসিএইচ ও এএমসি-র বিশেষজ্ঞবৃন্দ"
                : "Senior specialists from S.K. Roy Civil Hospital, ESIC, SMCH & AMC"}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500">
              {isBn ? "ডায়াগনস্টিক রিপোর্ট" : "Diagnostic Turnaround"}
            </p>
            <p className="text-2xl font-bold font-mono-tabular text-[#0B1F3A] mt-1">
              {isBn ? "১৫ – ৩০ মিনিট" : "15 – 30 Mins"}
            </p>
            <p className="text-xs text-slate-600 mt-1">
              {isBn
                ? "ডিজিটাল এক্স-রে ফিল্ম এবং ১২-লিড ইসিজি গ্রাফ দ্রুত প্রদান"
                : "Rapid reporting for Digital X-Ray films and 12-Lead resting ECG"}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500">
              {isBn ? "ওষুধ সংরক্ষণ" : "Pharmacy Dispensing"}
            </p>
            <p className="text-2xl font-bold font-mono-tabular text-[#0B1F3A] mt-1">
              {isBn ? "১০০% কোল্ড-চেইন" : "100% Cold-Chain"}
            </p>
            <p className="text-xs text-slate-600 mt-1">
              {isBn
                ? "নিরাপদ তাপমাত্রায় ইনসুলিন, ভ্যাকসিন এবং জীবনরক্ষাকারী ওষুধ সংরক্ষণ"
                : "Temperature-monitored insulin, vaccines & authentic prescription drugs"}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500">
              {isBn ? "সরাসরি যোগাযোগ" : "Direct Chamber Support"}
            </p>
            <p className="text-2xl font-bold font-mono-tabular text-[#0B1F3A] mt-1">
              8822480027
            </p>
            <p className="text-xs text-slate-600 mt-1">
              {isBn
                ? "অন্যান্য নম্বর: 9707916094 · 7002336326 · 9707169470"
                : "Additional lines: 9707916094 · 7002336326 · 9707169470"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
