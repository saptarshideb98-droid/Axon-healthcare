import React, { useState } from "react";
import { ChevronDown, ArrowUpRight, PhoneCall } from "lucide-react";
import { FAQ_DATA, FaqCategory, CLINIC_INFO, Language } from "../data/clinicData";
import { filterFaqs } from "../utils/clinicLogic";

interface FaqSectionProps {
  language: Language;
  onNavigateSection: (
    sectionId: "doctors" | "pharmacy" | "diagnostics" | "payments" | "contact"
  ) => void;
}

const CATEGORIES: { value: FaqCategory; labelEn: string; labelBn: string }[] = [
  { value: "All", labelEn: "All Topics", labelBn: "সকল বিষয়" },
  {
    value: "Appointment & Chambers",
    labelEn: "Chambers",
    labelBn: "চেম্বার ও সময়সূচী",
  },
  {
    value: "Diagnostic Preparation",
    labelEn: "Diagnostic Prep",
    labelBn: "পরীক্ষার প্রস্তুতি",
  },
  {
    value: "Prescription & Pharmacy",
    labelEn: "Pharmacy",
    labelBn: "ফার্মেসি সেবা",
  },
];

export const FaqSection: React.FC<FaqSectionProps> = ({
  language,
  onNavigateSection,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory>("All");
  const [openIds, setOpenIds] = useState<string[]>([
    FAQ_DATA[0].id,
    FAQ_DATA[2].id,
  ]);
  const isBn = language === "bn";

  const visibleFaqs = filterFaqs(FAQ_DATA, selectedCategory);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const allVisibleOpen =
    visibleFaqs.length > 0 &&
    visibleFaqs.every((item) => openIds.includes(item.id));

  const handleToggleAllVisible = () => {
    if (allVisibleOpen) {
      setOpenIds((prev) =>
        prev.filter((id) => !visibleFaqs.some((v) => v.id === id))
      );
    } else {
      const visibleIds = visibleFaqs.map((v) => v.id);
      setOpenIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
    }
  };

  return (
    <section
      id="faq"
      className="scroll-mt-16 py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header + Category Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-[#0891B2] tracking-wide">
              {isBn
                ? "০৫. রোগীদের সাধারণ জিজ্ঞাসা ও নির্দেশিকা"
                : "05. Patient Guidance & Clinical Protocols"}
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] mt-2 tracking-tight"
              style={{ textWrap: "balance" }}
            >
              {isBn
                ? "সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)"
                : "Frequently Asked Questions"}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              {isBn
                ? "বিশেষজ্ঞ ডাক্তারদের চেম্বারের সময়সূচী, থ্রি-ডি সনোগ্রাফি ও রক্ত পরীক্ষার প্রস্তুতি এবং ফার্মেসি সংক্রান্ত গুরুত্বপূর্ণ তথ্য।"
                : "Clear answers regarding specialist OPD chamber schedules, fasting and bladder preparation for 3D Sonography and Blood Tests, and in-store pharmacy dispensing."}
            </p>
          </div>

          {/* Interactive Category Filter Buttons */}
          <div
            role="group"
            aria-label="Filter FAQ by topic"
            className="inline-flex flex-wrap sm:flex-nowrap items-center gap-1 p-1 bg-slate-200/80 rounded-xl self-start lg:self-auto shrink-0"
          >
            {CATEGORIES.map((category) => (
              <button
                key={category.value}
                type="button"
                onClick={() => setSelectedCategory(category.value)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === category.value
                    ? "bg-[#0B1F3A] text-white shadow-xs"
                    : "text-slate-700 hover:text-[#0B1F3A]"
                }`}
              >
                {isBn ? category.labelBn : category.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Main 12-Col Layout: 8 Cols Accordion List + 4 Cols Direct Support Sidebar */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 8 Columns: Accordion Items */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
              <span>
                {isBn
                  ? `${visibleFaqs.length}টি প্রশ্ন দেখানো হচ্ছে`
                  : `Showing ${visibleFaqs.length} clinical ${
                      visibleFaqs.length === 1 ? "question" : "questions"
                    }`}
              </span>
              <button
                type="button"
                onClick={handleToggleAllVisible}
                className="font-semibold text-[#0B1F3A] hover:text-[#0891B2] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                {allVisibleOpen
                  ? isBn
                    ? "সবগুলো সংকুচিত করুন"
                    : "Collapse All"
                  : isBn
                  ? "সবগুলো প্রসারিত করুন"
                  : "Expand All"}
              </button>
            </div>

            <div className="divide-y divide-slate-200 bg-white rounded-2xl border border-slate-200 overflow-hidden">
              {visibleFaqs.map((item, idx) => {
                const isOpen = openIds.includes(item.id);
                const panelId = `faq-panel-${item.id}`;
                const triggerId = `faq-trigger-${item.id}`;

                return (
                  <div
                    key={item.id}
                    data-testid={`faq-item-${item.id}`}
                    className="transition-colors"
                  >
                    <h3>
                      <button
                        id={triggerId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggleItem(item.id)}
                        className="w-full px-5 sm:px-6 py-5 text-left flex items-start justify-between gap-4 hover:bg-slate-50/80 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#22D3EE]"
                      >
                        <div className="space-y-1 pr-2">
                          <div className="flex items-center gap-2 text-xs text-[#0891B2] font-medium">
                            <span className="font-mono-tabular">
                              0{idx + 1}.
                            </span>
                            <span>
                              {isBn ? item.categoryBn : item.category}
                            </span>
                          </div>
                          <span className="block text-base font-bold text-[#0B1F3A] leading-snug">
                            {isBn ? item.questionBn : item.question}
                          </span>
                        </div>

                        <span
                          className={`mt-1 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isOpen
                              ? "bg-[#0B1F3A] text-[#22D3EE]"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-150 ${
                              isOpen ? "rotate-180" : "rotate-0"
                            }`}
                          />
                        </span>
                      </button>
                    </h3>

                    {isOpen && (
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        className="px-5 sm:px-6 pb-6 pt-1 text-sm text-slate-600 space-y-4 bg-slate-50/40"
                      >
                        <p className="leading-relaxed text-slate-700">
                          {isBn ? item.answerBn : item.answer}
                        </p>

                        <div className="pt-3 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <p className="text-xs text-slate-500">
                            <strong className="text-[#0B1F3A]">
                              {isBn ? "বিশেষ দ্রষ্টব্য:" : "Key Protocol:"}
                            </strong>{" "}
                            {isBn ? item.keyTakeawayBn : item.keyTakeaway}
                          </p>

                          {item.actionLabel && item.actionTarget && (
                            <button
                              type="button"
                              onClick={() =>
                                onNavigateSection(item.actionTarget!)
                              }
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B1F3A] hover:text-[#0891B2] whitespace-nowrap shrink-0 transition-colors cursor-pointer"
                            >
                              {isBn ? item.actionLabelBn : item.actionLabel}
                              <ArrowUpRight className="w-3.5 h-3.5 text-[#0891B2]" />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 4 Columns: Quick Preparation & Reception Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0B1F3A] text-white rounded-2xl p-6 sm:p-7 border border-[#1E3A5F]">
              <p className="text-xs font-mono-tabular text-[#22D3EE]">
                {isBn
                  ? "রোগীদের জন্য চেকলিস্ট"
                  : "Patient Visit Checklist"}
              </p>
              <h3 className="text-lg font-bold text-white mt-1">
                {isBn
                  ? "ক্লিনিকে আসার সময় যা সাথে আনবেন"
                  : "What to Bring to AXON Healthcare"}
              </h3>
              <ul className="mt-4 space-y-3 text-xs text-slate-200 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span aria-hidden="true" className="text-[#22D3EE] font-bold">
                    ·
                  </span>
                  <span>
                    <strong className="text-white">
                      {isBn ? "ডাক্তারের প্রেসক্রিপশন:" : "Valid OPD Prescription:"}
                    </strong>{" "}
                    {isBn
                      ? "থ্রি-ডি সনোগ্রাফি, ডিজিটাল এক্স-রে এবং প্রেসক্রিপশন ওষুধের জন্য আবশ্যক।"
                      : "Required for 3D Sonography, Digital X-Ray, and prescription medicines."}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden="true" className="text-[#22D3EE] font-bold">
                    ·
                  </span>
                  <span>
                    <strong className="text-white">
                      {isBn ? "পূর্ববর্তী টেস্ট রিপোর্ট:" : "Previous Lab Reports:"}
                    </strong>{" "}
                    {isBn
                      ? "পূর্বের রক্ত পরীক্ষা, সুগার বা এক্স-রে রিপোর্ট থাকলে সাথে আনুন।"
                      : "Bring prior blood sugar, thyroid, or orthopedic X-ray films for specialist comparison."}
                  </span>
                </li>
              </ul>

              <div className="mt-6 pt-5 border-t border-white/10">
                <p className="text-xs text-slate-300">
                  {isBn
                    ? "যেকোনো তথ্যের জন্য সরাসরি আমাদের রিসেপশনে কল করুন:"
                    : "Have a specific question about a doctor's chamber or test?"}
                </p>
                <a
                  href={`tel:${CLINIC_INFO.primaryPhone}`}
                  className="mt-3 w-full py-2.5 px-4 rounded-xl bg-[#22D3EE] hover:bg-[#67E8F9] text-[#0B1F3A] font-bold text-xs inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  {isBn
                    ? `কল করুন: ${CLINIC_INFO.primaryPhone}`
                    : `Call Reception: ${CLINIC_INFO.primaryPhone}`}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
