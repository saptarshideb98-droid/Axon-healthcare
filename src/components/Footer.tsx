import React from "react";
import { MapPin, Phone, Clock, QrCode, ExternalLink } from "lucide-react";
import {
  CLINIC_INFO,
  DOCTORS_DATA,
  PAYMENT_INFO,
  Language,
} from "../data/clinicData";
import { getClinicGoogleMapsLinks } from "../utils/clinicLogic";

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const isBn = language === "bn";
  const mapsLinks = getClinicGoogleMapsLinks(CLINIC_INFO, language);

  return (
    <footer
      id="contact"
      className="scroll-mt-16 bg-[#0B1F3A] text-slate-300 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Official AXON Healthcare Logo, Brand & Address (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="#home"
              className="inline-flex items-center gap-3 text-xl font-bold tracking-tight text-white"
            >
              <img
                src={CLINIC_INFO.logoUrl}
                alt="AXON Healthcare Logo"
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-xl object-contain bg-white p-1 shrink-0"
              />
              <span>
                {isBn ? (
                  <>
                    অ্যাক্সন <span className="text-[#22D3EE]">হেলথকেয়ার</span>
                  </>
                ) : (
                  <>
                    AXON <span className="text-[#22D3EE]">Healthcare</span>
                  </>
                )}
              </span>
            </a>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              {isBn
                ? "হাইলাকান্দি জেলার একটি বিশ্বস্ত ফার্মেসি, ক্লিনিক্যাল প্যাথলজি ল্যাবরেটরি, ডিজিটাল ইমেজিং সেন্টার এবং বিশেষজ্ঞ চিকিৎসকদের আউটডোর চেম্বার।"
                : "Trusted retail pharmacy, clinical pathology laboratory, digital imaging center, and multi-specialty outpatient chambers serving Hailakandi district, Assam."}
            </p>
            <div className="pt-2 space-y-2.5 text-xs text-slate-200">
              <a
                href={mapsLinks.searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-google-maps-redirect"
                className="flex items-start gap-2 hover:text-[#22D3EE] transition-colors group"
              >
                <MapPin className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                <span className="underline decoration-white/25 group-hover:decoration-[#22D3EE] underline-offset-2">
                  {isBn
                    ? `${CLINIC_INFO.addressLine1Bn}, ${CLINIC_INFO.addressLine2Bn}`
                    : `${CLINIC_INFO.addressLine1}, ${CLINIC_INFO.addressLine2}`}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-[#22D3EE] shrink-0 mt-0.5" />
              </a>
              <p className="flex items-center gap-2 font-mono-tabular text-slate-300">
                <QrCode className="w-4 h-4 text-[#22D3EE] shrink-0" />
                <span>
                  UPI: {PAYMENT_INFO.upiId} ({PAYMENT_INFO.payeeName})
                </span>
              </p>
            </div>
          </div>

          {/* Column 2: Contact Numbers (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm font-bold text-white tracking-tight">
              {isBn ? "ফোন ও চেম্বার ডেস্ক" : "Phone & Chamber Desk"}
            </h3>
            <ul className="space-y-2.5 text-xs font-mono-tabular">
              <li>
                <span className="text-slate-400 font-sans block">
                  {isBn
                    ? "প্রধান রিসেপশন ও ফার্মেসি:"
                    : "Primary Reception & Pharmacy:"}
                </span>
                <a
                  href={`tel:${CLINIC_INFO.primaryPhone}`}
                  className="text-base font-bold text-[#22D3EE] hover:underline inline-flex items-center gap-1.5 mt-0.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  +91 {CLINIC_INFO.primaryPhone}
                </a>
              </li>
              <li>
                <span className="text-slate-400 font-sans block">
                  {isBn
                    ? "ডায়াগনস্টিক ও চেম্বার সিরিয়াল:"
                    : "Diagnostic & OPD Inquiries:"}
                </span>
                <a
                  href="tel:9707916094"
                  className="text-white hover:text-[#22D3EE] font-semibold"
                >
                  +91 9707916094
                </a>
              </li>
              <li>
                <span className="text-slate-400 font-sans block">
                  {isBn
                    ? "জরুরি ও গাইনি চেম্বার অনুসন্ধান:"
                    : "Emergency & Chamber Inquiries:"}
                </span>
                <a
                  href="tel:7002336326"
                  className="text-white hover:text-[#22D3EE] font-semibold"
                >
                  +91 7002336326
                </a>{" "}
                ·{" "}
                <a
                  href="tel:9707169470"
                  className="text-white hover:text-[#22D3EE] font-semibold"
                >
                  +91 9707169470
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Operating Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm font-bold text-white tracking-tight">
              {isBn ? "খোলা থাকার সময়সূচী" : "Operating Hours"}
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">
                    {isBn ? "ফার্মেসি কাউন্টার" : "Pharmacy Counter"}
                  </span>
                  <span className="text-slate-300">
                    {isBn
                      ? CLINIC_INFO.hours.pharmacyBn
                      : CLINIC_INFO.hours.pharmacy}
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">
                    {isBn
                      ? "এক্স-রে, থ্রি-ডি সনোগ্রাফি, ইসিজি ও ব্লাড ল্যাব"
                      : "X-Ray, 3D USG, ECG & Blood Lab"}
                  </span>
                  <span className="text-slate-300">
                    {isBn
                      ? CLINIC_INFO.hours.diagnosticsBn
                      : CLINIC_INFO.hours.diagnostics}
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">
                    {isBn ? "বিশেষজ্ঞ আউটডোর চেম্বার" : "Specialist OPD Chambers"}
                  </span>
                  <span className="text-slate-300">
                    {isBn
                      ? CLINIC_INFO.hours.opdChamberBn
                      : CLINIC_INFO.hours.opdChamber}
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-bold text-white tracking-tight">
              {isBn ? "বিভাগসমূহ" : "Clinic Sections"}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-[#22D3EE] transition-colors">
                  {isBn ? "হোম" : "Home"}
                </a>
              </li>
              <li>
                <a
                  href="#doctors"
                  className="hover:text-[#22D3EE] transition-colors"
                >
                  {isBn
                    ? `চিকিৎসকবৃন্দ (${DOCTORS_DATA.length})`
                    : `Doctors Roster (${DOCTORS_DATA.length})`}
                </a>
              </li>
              <li>
                <a
                  href="#diagnostics"
                  className="hover:text-[#22D3EE] transition-colors"
                >
                  {isBn ? "ডায়াগনস্টিকস হাব" : "Diagnostics Hub"}
                </a>
              </li>
              <li>
                <a
                  href="#pharmacy"
                  className="hover:text-[#22D3EE] transition-colors"
                >
                  {isBn ? "ফার্মেসি সেবা" : "Pharmacy Services"}
                </a>
              </li>
              <li>
                <a
                  href="#payments"
                  className="hover:text-[#22D3EE] transition-colors"
                >
                  {isBn ? "ইউপিআই কিউআর পেমেন্ট" : "UPI QR Payments"}
                </a>
              </li>
              <li>
                <a
                  href="#chamber-schedule"
                  className="hover:text-[#22D3EE] transition-colors"
                >
                  {isBn ? "চেম্বার সময়সূচী" : "Chamber Schedule"}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#22D3EE] transition-colors">
                  {isBn ? "জিজ্ঞাসিত প্রশ্ন (FAQ)" : "Patient FAQ"}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Location Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            {isBn
              ? `© ${new Date().getFullYear()} অ্যাক্সন হেলথকেয়ার, হাইলাকান্দি। সর্বস্বত্ব সংরক্ষিত।`
              : `© ${new Date().getFullYear()} AXON Healthcare, Hailakandi. All rights reserved.`}
          </p>
          <p>
            {isBn
              ? "লালা রোড, এস.কে. রায় সিভিল হাসপাতালের নিকটে, হাইলাকান্দি, আসাম · যোগাযোগ: 8822480027"
              : "Lala Road, Near S.K. Roy Civil Hospital, Hailakandi, Assam · Primary Contact: 8822480027"}
          </p>
        </div>
      </div>
    </footer>
  );
};
