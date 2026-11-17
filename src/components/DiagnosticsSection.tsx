import React, { useState, useMemo } from "react";
import {
  PhoneCall,
  Scan,
  Waves,
  Droplets,
  HeartPulse,
  Bone,
  Search,
  X,
} from "lucide-react";
import { DIAGNOSTICS_DATA, CLINIC_INFO, Language } from "../data/clinicData";
import {
  getDiagnosticIconKey,
  DiagnosticIconKey,
  filterDiagnosticsByQuery,
} from "../utils/clinicLogic";
import { ReferenceImageSlot } from "./ReferenceImageSlot";

interface DiagnosticsSectionProps {
  language: Language;
}

const QUICK_SEARCH_KEYWORDS: Array<{
  value: string;
  labelEn: string;
  labelBn: string;
}> = [
  { value: "", labelEn: "All Tests", labelBn: "সব পরীক্ষা" },
  { value: "X-Ray", labelEn: "X-Ray", labelBn: "এক্স-রে (X-Ray)" },
  { value: "Blood", labelEn: "Blood", labelBn: "রক্ত পরীক্ষা (Blood)" },
  { value: "Sonography", labelEn: "Sonography", labelBn: "সনোগ্রাফি" },
  { value: "ECG", labelEn: "ECG", labelBn: "ইসিজি (ECG)" },
];

const renderDiagnosticServiceIcon = (iconKey: DiagnosticIconKey) => {
  switch (iconKey) {
    case "xray-scan":
      return <Scan className="w-5 h-5 text-[#22D3EE]" aria-hidden="true" />;
    case "sonography-waves":
      return <Waves className="w-5 h-5 text-[#22D3EE]" aria-hidden="true" />;
    case "blood-droplets":
      return <Droplets className="w-5 h-5 text-[#22D3EE]" aria-hidden="true" />;
    case "ecg-heart-pulse":
      return (
        <HeartPulse className="w-5 h-5 text-[#22D3EE]" aria-hidden="true" />
      );
    case "orthopedic-bone":
      return <Bone className="w-5 h-5 text-[#22D3EE]" aria-hidden="true" />;
  }
};

export const DiagnosticsSection: React.FC<DiagnosticsSectionProps> = ({
  language,
}) => {
  const isBn = language === "bn";
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = useMemo(
    () => filterDiagnosticsByQuery(DIAGNOSTICS_DATA, searchQuery),
    [searchQuery]
  );

  return (
    <section
      id="diagnostics"
      className="scroll-mt-16 py-16 lg:py-24 bg-white border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-[#0891B2] tracking-wide">
              {isBn
                ? "০২. ক্লিনিক্যাল ইমেজিং ও প্যাথলজি ল্যাবরেটরি"
                : "02. Clinical Imaging & Pathology Laboratory"}
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] mt-2 tracking-tight"
              style={{ textWrap: "balance" }}
            >
              {isBn
                ? "ডায়াগনস্টিক হাব — এখানে সব ধরনের ক্লিনিক্যাল পরীক্ষা করা হয়"
                : "Diagnostics Hub — All Types of Clinical Tests Done Here"}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              {isBn
                ? "বিশেষজ্ঞ চিকিৎসকদের তত্ত্বাবধানে আধুনিক ডিজিটাল এক্স-রে, থ্রি-ডি আল্ট্রাসাউন্ড (সনোগ্রাফি), অটোমেটেড রক্ত পরীক্ষা, ১২-লিড ইসিজি এবং অর্থোপেডিক স্ক্রিনিং সম্পন্ন করা হয়।"
                : "Equipped with high-resolution digital radiography, volumetric 3D ultrasound, automated biochemistry analyzers, 12-lead cardiac ECG recording, and orthopedic joint imaging."}
            </p>
          </div>

          <div className="text-xs text-slate-500 font-mono-tabular shrink-0">
            {isBn
              ? "ল্যাব নমুনা সংগ্রহ: সকাল ৭:৩০ – রাত ৮:৩০"
              : "Lab Sample Collection: 7:30 AM – 8:30 PM"}
          </div>
        </div>

        {/* Top Search & Quick Keyword Filter Bar */}
        <div className="mt-6 bg-[#F8FAFC] rounded-2xl p-4 sm:p-5 border border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Input Box */}
          <div className="relative flex-1 max-w-xl">
            <label htmlFor="diagnostics-search-input" className="sr-only">
              {isBn
                ? "ডায়াগনস্টিক পরীক্ষা খুঁজুন"
                : "Search diagnostic services"}
            </label>
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="diagnostics-search-input"
              data-testid="diagnostics-search-input"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isBn
                  ? "পরীক্ষা খুঁজুন (যেমন: 'X-Ray', 'Blood', 'রক্ত', 'ECG')..."
                  : "Search diagnostic services (e.g., 'X-Ray', 'Blood', 'ECG')..."
              }
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-[#0B1F3A] placeholder:text-slate-400 focus:outline-none focus:border-[#0891B2] focus:ring-2 focus:ring-[#22D3EE]/25 transition-all"
            />
            {searchQuery.trim().length > 0 && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                data-testid="diagnostics-search-clear"
                aria-label={isBn ? "অনুসন্ধান মুছে ফেলুন" : "Clear search"}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-[#0B1F3A] hover:bg-slate-100 inline-flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Keyword Filter Buttons + Live Match Count */}
          <div className="flex flex-wrap items-center justify-between lg:justify-end gap-2">
            <div
              className="flex flex-wrap items-center gap-1.5"
              role="group"
              aria-label={
                isBn
                  ? "দ্রুত ডায়াগনস্টিক ফিল্টার"
                  : "Quick diagnostic keyword filters"
              }
            >
              {QUICK_SEARCH_KEYWORDS.map((kw) => {
                const isSelected =
                  searchQuery.trim().toLowerCase() === kw.value.toLowerCase();
                return (
                  <button
                    key={kw.labelEn}
                    type="button"
                    onClick={() => setSearchQuery(kw.value)}
                    data-testid={`diagnostics-quick-filter-${
                      kw.value ? kw.value.toLowerCase() : "all"
                    }`}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? "bg-[#0B1F3A] text-white"
                        : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-[#0B1F3A]"
                    }`}
                  >
                    {isBn ? kw.labelBn : kw.labelEn}
                  </button>
                );
              })}
            </div>

            <span
              data-testid="diagnostics-result-count"
              className="text-xs font-mono-tabular text-slate-500 pl-1"
            >
              {isBn
                ? `${filteredServices.length}টি পরীক্ষা পাওয়া গেছে`
                : `Showing ${filteredServices.length} of ${DIAGNOSTICS_DATA.length}`}
            </span>
          </div>
        </div>

        {/* Grid Highlighting Digital X-Ray, 3D Sonography, Blood Tests, ECG & Orthopedic Screening (Zero Pricing) */}
        {filteredServices.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredServices.map((service, index) => {
              const displayName = isBn ? service.nameBn : service.name;
              const displayCategory = isBn
                ? service.categoryBn
                : service.category;
              const displayTurnaround = isBn
                ? service.turnaroundTimeBn
                : service.turnaroundTime;
              const displayDescription = isBn
                ? service.descriptionBn
                : service.description;
              const displayParams = isBn
                ? service.parametersBn
                : service.parameters;
              const displayPrep = isBn
                ? service.preparationBn
                : service.preparation;
              const iconKey = getDiagnosticIconKey(service.id);

              return (
                <article
                  key={service.id}
                  data-testid={`diagnostic-card-${service.id}`}
                  className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200 flex flex-col justify-between hover:border-[#0B1F3A]/40 transition-colors"
                >
                  <div>
                    {/* Service Icon & Title Header */}
                    <div className="flex items-start gap-3.5">
                      <div
                        data-testid={`diagnostic-icon-${iconKey}`}
                        className="w-11 h-11 rounded-xl bg-[#0B1F3A] flex items-center justify-center shrink-0 border border-[#1E3A5F]"
                      >
                        {renderDiagnosticServiceIcon(iconKey)}
                      </div>

                      <div className="min-w-0 flex-1">
                        {/* Top Metadata Line (Zero-Pill Unboxed Discipline, Zero Pricing) */}
                        <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                          <span className="truncate">
                            0{index + 1}. {displayCategory}
                          </span>
                          <span className="font-mono-tabular font-semibold text-[#0891B2] shrink-0">
                            {displayTurnaround}
                          </span>
                        </div>

                        {/* Test Title */}
                        <h3 className="mt-1 text-xl font-bold text-[#0B1F3A] leading-snug">
                          {displayName}
                        </h3>
                      </div>
                    </div>

                    {/* Attached Diagnostic Test Photo from PDF */}
                    <div className="mt-4">
                      <ReferenceImageSlot
                        slotId={`diagnostic-${service.id}`}
                        label={displayName}
                        defaultImageUrl={service.photoUrl}
                        aspectClass="aspect-[16/9]"
                        imageObjectPosition="object-center"
                      />
                    </div>

                    <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                      {displayDescription}
                    </p>

                    {/* Key Test Parameters */}
                    <div className="mt-4 pt-4 border-t border-slate-200/80">
                      <p className="text-xs font-semibold text-[#0B1F3A] mb-2">
                        {isBn
                          ? "প্রধান পরীক্ষাসমূহ:"
                          : "Available Investigations:"}
                      </p>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {displayParams.map((param) => (
                          <li key={param} className="flex items-center gap-1.5">
                            <span
                              aria-hidden="true"
                              className="text-[#0891B2] font-bold"
                            >
                              ·
                            </span>
                            <span>{param}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Preparation Note & Direct Phone Inquiry */}
                  <div className="mt-6 pt-4 border-t border-slate-200 space-y-3">
                    <p className="text-xs text-slate-500 leading-relaxed">
                      <span className="font-semibold text-slate-700">
                        {isBn ? "প্রস্তুতি:" : "Prep:"}
                      </span>{" "}
                      {displayPrep}
                    </p>

                    <a
                      href={`tel:${CLINIC_INFO.secondaryPhones[0]}`}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0B1F3A] hover:bg-[#16325B] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-[#22D3EE]" />
                      {isBn
                        ? "ল্যাব তথ্যের জন্য কল করুন: 9707916094"
                        : "Call Lab Desk: 9707916094"}
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div
            data-testid="diagnostics-empty-state"
            className="mt-8 bg-[#F8FAFC] rounded-2xl p-8 border border-slate-200 text-center max-w-xl mx-auto"
          >
            <p className="text-base font-bold text-[#0B1F3A]">
              {isBn
                ? `"${searchQuery}" এর জন্য কোনো পরীক্ষা খুঁজে পাওয়া যায়নি`
                : `No diagnostic services found matching "${searchQuery}"`}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
              {isBn
                ? "অন্য কিওয়ার্ড দিয়ে চেষ্টা করুন অথবা আমাদের ল্যাব হেল্পলাইনে সরাসরি কল করুন।"
                : "Try searching for 'X-Ray', 'Blood', 'Sonography', or 'ECG', or call our lab reception directly."}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="px-4 py-2 rounded-xl bg-[#0B1F3A] hover:bg-[#16325B] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                {isBn ? "সব পরীক্ষা দেখুন" : "Show All Diagnostic Services"}
              </button>
              <a
                href={`tel:${CLINIC_INFO.secondaryPhones[0]}`}
                className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-[#0B1F3A] border border-slate-300 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#0891B2]" />
                {isBn ? "কল করুন: 9707916094" : "Call Lab Desk: 9707916094"}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

