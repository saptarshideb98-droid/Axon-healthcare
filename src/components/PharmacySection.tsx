import React from "react";
import { ShieldCheck, ThermometerSnowflake, Clock, PhoneCall } from "lucide-react";
import { PHARMACY_HIGHLIGHTS, CLINIC_INFO, Language } from "../data/clinicData";
import { ReferenceImageSlot } from "./ReferenceImageSlot";

interface PharmacySectionProps {
  language: Language;
}

export const PharmacySection: React.FC<PharmacySectionProps> = ({
  language,
}) => {
  const isBn = language === "bn";

  return (
    <section
      id="pharmacy"
      className="scroll-mt-16 py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-slate-200">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-[#0891B2] tracking-wide">
              {isBn
                ? "০৩. লাইসেন্সপ্রাপ্ত রিটেল ও ক্লিনিক্যাল ফার্মেসি"
                : "03. Licensed Retail & Clinical Pharmacy"}
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] mt-2 tracking-tight"
              style={{ textWrap: "balance" }}
            >
              {isBn
                ? "অ্যাক্সন হেলথকেয়ার ফার্মেসি — লালা রোড, হাইলাকান্দি"
                : "In-Store Prescription & Clinical Pharmacy"}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              {isBn
                ? "এস.কে. রায় সিভিল হাসপাতালের নিকটে আমাদের ফার্মেসি কাউন্টারে রেজিস্টার্ড ফার্মাসিস্টের তত্ত্বাবধানে সকল প্রকার জীবনরক্ষাকারী ওষুধ, ইনসুলিন, ভ্যাকসিন এবং সার্জিক্যাল সামগ্রী পাওয়া যায়।"
                : "Visit our pharmacy counter on Lala Road, near S.K. Roy Civil Hospital, Hailakandi for genuine, batch-verified medicines, cold-chain insulin & biologicals, and surgical supplies dispensed under registered pharmacist supervision."}
            </p>
          </div>

          <div className="w-full lg:w-96 shrink-0">
            <ReferenceImageSlot
              slotId="pharmacy-counter"
              label={
                isBn
                  ? "অ্যাক্সন ফার্মেসি কাউন্টার ও কোল্ড-চেইন ইনসুলিন স্টোরেজ"
                  : "AXON Pharmacy Dispensing Counter & Cold-Chain Storage"
              }
              sublabel={
                isBn
                  ? "২°C – ৮°C কোল্ড-চেইন রেফ্রিজারেটেড ইনসুলিন ও ওষুধ সংরক্ষণ ব্যবস্থা"
                  : "2°C–8°C Temperature-Monitored Cold-Chain & Prescription Counter"
              }
              defaultImageUrl={CLINIC_INFO.pharmacyImageUrl}
              aspectClass="aspect-[16/9]"
              imageObjectPosition="object-center"
            />
          </div>
        </div>

        {/* Main 12-Col Layout: Left 7 Cols Therapeutic Categories | Right 5 Cols In-Store Dispensing & Cold-Chain Standards */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Available Medicine Categories */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200">
            <div className="pb-4 border-b border-slate-200 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#0B1F3A]">
                  {isBn
                    ? "আমাদের ফার্মেসিতে উপলব্ধ ওষুধের বিভাগসমূহ"
                    : "In-Store Therapeutic & Medicine Divisions"}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {isBn
                    ? "চিকিৎসকের মূল প্রেসক্রিপশন দেখিয়ে সরাসরি কাউন্টার থেকে ওষুধ সংগ্রহ করুন"
                    : "Dispensed directly at our Lala Road clinic counter upon presenting a valid OPD prescription"}
                </p>
              </div>
              <img
                src={CLINIC_INFO.logoUrl}
                alt={CLINIC_INFO.name}
                referrerPolicy="no-referrer"
                className="w-9 h-9 rounded-lg object-contain border border-slate-200 bg-white p-1 shrink-0"
              />
            </div>

            <div className="divide-y divide-slate-200 mt-2">
              {PHARMACY_HIGHLIGHTS.map((item, idx) => (
                <div key={item.id} className="py-4 space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-semibold text-[#0891B2]">
                      0{idx + 1}. {isBn ? item.categoryBn : item.category}
                    </span>
                    <span className="text-slate-500">
                      {item.requiresRx
                        ? isBn
                          ? "চিকিৎসকের প্রেসক্রিপশন আবশ্যক"
                          : "Valid Doctor's Prescription (Rx) Required"
                        : isBn
                        ? "কাউন্টারে উপলব্ধ"
                        : "Available In-Store"}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-[#0B1F3A]">
                    {isBn ? item.nameBn : item.name}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-700">
                    {isBn ? item.compositionBn : item.composition}
                  </p>

                  <p className="text-xs text-slate-500">
                    {isBn ? item.dispensingNoteBn : item.dispensingNote}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right 5 Columns: In-Store Compliance & Direct Pharmacy Helpline */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0B1F3A] text-white rounded-2xl p-6 sm:p-8 border border-[#1E3A5F] space-y-5">
              <div className="flex items-center gap-3">
                <img
                  src={CLINIC_INFO.logoUrl}
                  alt={CLINIC_INFO.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-xl object-contain bg-white p-1 shrink-0"
                />
                <div>
                  <span className="text-xs font-mono-tabular text-[#22D3EE]">
                    {isBn
                      ? "ওষুধের গুণমান ও নিরাপত্তা বিধি"
                      : "Quality & Dispensing Standards"}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-0.5">
                    {isBn
                      ? "কেন অ্যাক্সন ফার্মেসি নির্ভরযোগ্য?"
                      : "Why Patients Trust AXON Pharmacy"}
                  </h3>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-200">
                <div className="flex items-start gap-3">
                  <ThermometerSnowflake className="w-5 h-5 text-[#22D3EE] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">
                      {isBn
                        ? "২৪ ঘণ্টা কোল্ড-চেইন (Cold-Chain) সংরক্ষণ"
                        : "Uninterrupted Cold-Chain Storage"}
                    </p>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      {isBn
                        ? "ইনসুলিন, ভ্যাকসিন এবং তাপমাত্রা-সংবেদনশীল ইঞ্জেকশন নির্ধারিত ২°–৮° সেলসিয়াস তাপমাত্রায় সংরক্ষণ করা হয়।"
                        : "All insulin vials, biologicals, and vaccines are stored strictly between 2°C and 8°C."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#22D3EE] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">
                      {isBn
                        ? "১০০% আসল ও ব্যাচ-পরীক্ষিত ওষুধ"
                        : "100% Authentic & Batch-Verified"}
                    </p>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      {isBn
                        ? "অনুমোদিত ডিস্ট্রিবিউটর থেকে সংগৃহীত আসল ওষুধ রেজিস্টার্ড ফার্মাসিস্ট দ্বারা যাচাইকৃত।"
                        : "Sourced exclusively from authorized pharmaceutical distributors with strict expiry and batch verification."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#22D3EE] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">
                      {isBn
                        ? "প্রতিদিন সকাল ৭:০০ – রাত ১০:৩০ খোলা"
                        : "Open Daily: 7:00 AM – 10:30 PM"}
                    </p>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      {isBn
                        ? "লালা রোড, এস.কে. রায় সিভিল হাসপাতালের নিকটে, হাইলাকান্দি।"
                        : "Conveniently located on Lala Road right next to S.K. Roy Civil Hospital, Hailakandi."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-white/10">
                <p className="text-xs text-slate-300 mb-3">
                  {isBn
                    ? "কোনো নির্দিষ্ট ওষুধের স্টক সম্পর্কে জানতে সরাসরি আমাদের কাউন্টারে কল করুন:"
                    : "To check medicine availability at our counter, call our pharmacy helpline:"}
                </p>
                <a
                  href={`tel:${CLINIC_INFO.primaryPhone}`}
                  className="w-full py-3 px-4 rounded-xl bg-[#22D3EE] hover:bg-[#67E8F9] text-[#0B1F3A] font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0"
                >
                  <PhoneCall className="w-4 h-4" />
                  {isBn
                    ? `ফার্মেসি হেল্পলাইন: +91 ${CLINIC_INFO.primaryPhone}`
                    : `Call Pharmacy Desk: +91 ${CLINIC_INFO.primaryPhone}`}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
