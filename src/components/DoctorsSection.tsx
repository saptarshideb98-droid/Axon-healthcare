import React, { useState } from "react";
import { Calendar, Building2, PhoneCall, FileText, Banknote } from "lucide-react";
import { DOCTORS_DATA, Language } from "../data/clinicData";
import { filterDoctorsBySpecialty } from "../utils/clinicLogic";
import { ReferenceImageSlot } from "./ReferenceImageSlot";

interface DoctorsSectionProps {
  language: Language;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ language }) => {
  const [specialtyFilter, setSpecialtyFilter] = useState<string>("All");
  const isBn = language === "bn";

  const filterTabs: { value: string; labelEn: string; labelBn: string }[] = [
    {
      value: "All",
      labelEn: `All Specialists (${DOCTORS_DATA.length})`,
      labelBn: "সকল বিশেষজ্ঞ (৬)",
    },
    { value: "Emergency Medicine", labelEn: "Emergency & Medicine", labelBn: "ইমার্জেন্সি ও মেডিসিন" },
    { value: "Orthopedic", labelEn: "Orthopedic", labelBn: "অর্থোপেডিক (হাড় ও জয়েন্ট)" },
    { value: "Gynecology", labelEn: "Gynecology (স্ত্রী রোগ)", labelBn: "স্ত্রী রোগ ও প্রসূতি" },
    { value: "Diabetes", labelEn: "Diabetes Specialist", labelBn: "ডায়াবেটিস বিশেষজ্ঞ" },
  ];

  const visibleDoctors = filterDoctorsBySpecialty(
    DOCTORS_DATA,
    specialtyFilter,
    ""
  );

  return (
    <section
      id="doctors"
      className="scroll-mt-16 py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header + Interactive Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-[#0891B2] tracking-wide">
              {isBn
                ? "০১. বিশেষজ্ঞ আউটডোর চেম্বার বিভাগ"
                : "01. Specialist Outpatient Chambers"}
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] mt-2 tracking-tight"
              style={{ textWrap: "balance" }}
            >
              {isBn
                ? "আমাদের বিশেষজ্ঞ চিকিৎসকবৃন্দ"
                : "Consulting Doctors Roster"}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              {isBn
                ? "এস.কে. রায় সিভিল হাসপাতাল, ইএসআইসি হাসপাতাল, এসএমসিএইচ এবং এএমসি-র অভিজ্ঞ বিশেষজ্ঞ চিকিৎসকদের চেম্বার এখন হাইলাকান্দির লালা রোডস্থ অ্যাক্সন হেলথকেয়ারে।"
                : "Consult experienced specialists from S.K. Roy Civil Hospital, ESIC Hospital, SMCH, and AMC right at AXON Healthcare, Lala Road, Hailakandi."}
            </p>
          </div>

          {/* Interactive Specialty Segmented Control */}
          <div
            role="group"
            aria-label="Filter doctors by specialty"
            className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/80 rounded-xl self-start lg:self-auto"
          >
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setSpecialtyFilter(tab.value)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  specialtyFilter === tab.value
                    ? "bg-[#0B1F3A] text-white shadow-xs"
                    : "text-slate-700 hover:text-[#0B1F3A]"
                }`}
              >
                {isBn ? tab.labelBn : tab.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors Roster Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {visibleDoctors.map((doc) => {
            const displayName = isBn ? doc.nameBn : doc.name;
            const displaySpecialty = isBn ? doc.specialtyBn : doc.specialty;
            const displayQualifications = isBn
              ? doc.qualificationsBn
              : doc.qualifications;
            const displayRole = isBn ? doc.roleSummaryBn : doc.roleSummary;
            const displayHospital = isBn ? doc.hospitalBn : doc.hospital;
            const displaySchedule = isBn ? doc.scheduleBn : doc.schedule;
            const displayFocus = isBn ? doc.focusAreasBn : doc.focusAreas;
            const displayFee = isBn ? doc.consultationFeeBn : doc.consultationFee;
            const credentialHref =
              doc.posterUrl ||
              `/assets/aistudio/AXONDOCTORSposters_905267dd.pdf#page=${doc.posterPageNumber}`;

            return (
              <article
                key={doc.id}
                data-testid={`doctor-card-${doc.id}`}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-[#0B1F3A]/40 transition-colors"
              >
                <div className="p-6">
                  {/* Doctor Portrait */}
                  <ReferenceImageSlot
                    slotId={`doctor-${doc.id}`}
                    label={displayName}
                    defaultImageUrl={doc.photoUrl}
                    aspectClass="aspect-[4/3]"
                    imageObjectPosition="object-top"
                    imageClassName={doc.imageClassName}
                  />

                  {/* Unboxed Metadata Line (Specialty & Registration) */}
                  <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-[#0891B2] font-semibold">
                    <span>{displaySpecialty}</span>
                    <span aria-hidden="true" className="text-slate-300">
                      ·
                    </span>
                    <span className="text-slate-500 font-mono-tabular font-normal">
                      {doc.registration}
                    </span>
                  </div>

                  {/* Doctor Name & Qualifications */}
                  <h3 className="text-xl font-bold text-[#0B1F3A] mt-1">
                    {displayName}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-1">
                    {displayQualifications}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{displayRole}</p>

                  {/* Hospital / Affiliation, Visiting Date/Schedule & Consultation Fee */}
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                    <div className="flex items-start gap-2">
                      <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-slate-800">
                          {isBn ? "হাসপাতাল / রেজিস্ট্রেশন:" : "Hospital / Regd.:"}
                        </strong>{" "}
                        {displayHospital}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-[#0891B2] shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-slate-800">
                          {isBn
                            ? "চেম্বারের তারিখ ও সময়সূচী:"
                            : "Date / Visiting Schedule:"}
                        </strong>{" "}
                        {displaySchedule}
                      </span>
                    </div>
                    {displayFee && (
                      <div
                        data-testid={`doctor-fee-${doc.id}`}
                        className="flex items-start gap-2 text-[#0B1F3A]"
                      >
                        <Banknote className="w-4 h-4 text-[#0891B2] shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-slate-800">
                            {isBn ? "পরামর্শ ফি:" : "Consultation Fee:"}
                          </strong>{" "}
                          <span className="font-mono-tabular font-bold text-[#0891B2]">
                            {displayFee}
                          </span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Clinical Focus Areas */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <p className="text-[11px] font-semibold text-slate-700 mb-1">
                      {isBn ? "বিশেষ চিকিৎসা ক্ষেত্র:" : "Expert Care For:"}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {displayFocus.join(" · ")}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Direct Chamber Helpline & Credential View */}
                <div className="px-6 py-4 bg-[#0B1F3A] text-white flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-[11px] text-slate-300 block">
                      {isBn
                        ? "তথ্য ও সিরিয়ালের জন্য কল করুন"
                        : "Call for Date & Chamber Serial"}
                    </span>
                    <span className="text-xs sm:text-sm font-bold font-mono-tabular text-[#22D3EE] truncate block">
                      {doc.contactPhones.join(", ")}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={credentialHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View official credentials for ${doc.name}`}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors"
                      title={
                        isBn
                          ? "চিকিৎসকের তথ্য ও পোস্টার দেখুন"
                          : "View Official Doctor Info / Poster"
                      }
                    >
                      <FileText className="w-4 h-4" />
                    </a>
                    <a
                      href={`tel:${doc.contactPhones[0]}`}
                      className="px-3.5 py-2 rounded-lg bg-[#22D3EE] hover:bg-[#67E8F9] text-[#0B1F3A] text-xs font-bold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      {isBn ? "কল করুন" : "Call Now"}
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
