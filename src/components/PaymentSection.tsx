import React, { useState } from "react";
import {
  Copy,
  Check,
  Smartphone,
  ShieldCheck,
  Download,
  Maximize2,
  X,
  MessageSquare,
  QrCode,
  PhoneCall,
} from "lucide-react";
import {
  CLINIC_INFO,
  PAYMENT_INFO,
  DOCTORS_DATA,
  DIAGNOSTICS_DATA,
  Language,
} from "../data/clinicData";
import { buildPaymentConfirmationSummary } from "../utils/clinicLogic";

interface PaymentSectionProps {
  language: Language;
}

type QrViewMode = "card" | "square" | "original";

export const PaymentSection: React.FC<PaymentSectionProps> = ({ language }) => {
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedPayee, setCopiedPayee] = useState(false);
  const [copiedSlip, setCopiedSlip] = useState(false);
  const [qrViewMode, setQrViewMode] = useState<QrViewMode>("card");
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [paymentPurpose, setPaymentPurpose] = useState<string>(
    "OPD Chamber Consultation"
  );
  const [selectedDoctorOrTest, setSelectedDoctorOrTest] = useState<string>(
    DOCTORS_DATA[0].name
  );
  const [patientName, setPatientName] = useState<string>("");
  const [utrReference, setUtrReference] = useState<string>("");

  const isBn = language === "bn";

  const purposeOptions = [
    {
      value: "OPD Chamber Consultation",
      labelEn: "Doctor Chamber Serial",
      labelBn: "ডাক্তার চেম্বার সিরিয়াল",
    },
    {
      value: "Diagnostic Lab Test",
      labelEn: "Diagnostic Test (X-Ray / USG / Blood / ECG)",
      labelBn: "ডায়াগনস্টিক টেস্ট (এক্স-রে / সনোগ্রাফি / রক্ত / ইসিজি)",
    },
    {
      value: "Pharmacy Counter",
      labelEn: "In-Store Pharmacy Medicines",
      labelBn: "ফার্মেসি কাউন্টার ওষুধ",
    },
  ];

  const handlePurposeChange = (nextPurpose: string) => {
    setPaymentPurpose(nextPurpose);
    if (nextPurpose === "OPD Chamber Consultation") {
      setSelectedDoctorOrTest(DOCTORS_DATA[0].name);
    } else if (nextPurpose === "Diagnostic Lab Test") {
      setSelectedDoctorOrTest(DIAGNOSTICS_DATA[0].name);
    } else {
      setSelectedDoctorOrTest("Prescription Medicines");
    }
  };

  const handleCopyUpi = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(PAYMENT_INFO.upiId);
      }
    } catch {
      // Ignore clipboard permission errors in sandboxed frames
    }
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleCopyPayee = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(PAYMENT_INFO.payeeName);
      }
    } catch {
      // Ignore clipboard permission errors
    }
    setCopiedPayee(true);
    setTimeout(() => setCopiedPayee(false), 2500);
  };

  const paymentSummary = buildPaymentConfirmationSummary({
    upiId: PAYMENT_INFO.upiId,
    payeeName: PAYMENT_INFO.payeeName,
    whatsappNumber: PAYMENT_INFO.whatsappNumber,
    purpose: paymentPurpose,
    specificItem: selectedDoctorOrTest,
    patientName,
    utrReference,
    language,
  });

  const handleCopySlip = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(
          `AXON Healthcare UPI Payment | Payee: ${PAYMENT_INFO.payeeName} (${PAYMENT_INFO.upiId}) | ${paymentSummary.summaryLine}`
        );
      }
    } catch {
      // Ignore clipboard permission errors
    }
    setCopiedSlip(true);
    setTimeout(() => setCopiedSlip(false), 2500);
  };

  const activeQrImage =
    qrViewMode === "card"
      ? PAYMENT_INFO.qrCardImageUrl
      : qrViewMode === "square"
      ? PAYMENT_INFO.qrSquareImageUrl
      : PAYMENT_INFO.qrOriginalImageUrl;

  return (
    <section
      id="payments"
      className="scroll-mt-16 py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-slate-200">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-[#0891B2] tracking-wide">
              {isBn
                ? "০৪. সরাসরি ডিজিটাল ইউপিআই (UPI) ও কিউআর কোড পেমেন্ট ডেস্ক"
                : "04. Instant UPI & QR Code Payment Desk"}
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] mt-2 tracking-tight"
              style={{ textWrap: "balance" }}
            >
              {isBn
                ? "অফিশিয়াল ইউপিআই কিউআর স্ক্যান ও পেমেন্ট ডেস্ক"
                : "Official Clinic UPI QR Scanner & Payment Desk"}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              {isBn
                ? "যেকোনো ইউপিআই অ্যাপ (Google Pay, PhonePe, Paytm, BHIM) দিয়ে অফিশিয়াল কিউআর কোডটি স্ক্যান করুন, অথবা ইউপিআই আইডি কপি করে ডাক্তার চেম্বার, ল্যাব টেস্ট বা ফার্মেসি পেমেন্ট সম্পন্ন করুন।"
                : "Scan our verified Google Pay / OKAxis QR standee using any UPI app (Google Pay, PhonePe, Paytm, BHIM), copy the official UPI ID, or generate a pre-filled payment confirmation slip for reception."}
            </p>
          </div>

          {/* Verified Merchant Summary Lockup */}
          <div className="bg-white rounded-xl px-4 py-3 border border-slate-200 flex items-center gap-3.5 shrink-0">
            <img
              src={CLINIC_INFO.logoUrl}
              alt={CLINIC_INFO.name}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-lg object-contain border border-slate-200 bg-white p-1 shrink-0"
            />
            <div className="text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#0B1F3A]">
                <ShieldCheck className="w-4 h-4 text-[#0891B2] shrink-0" />
                <span>
                  {isBn
                    ? `প্রাপক: ${PAYMENT_INFO.payeeNameBn}`
                    : `Verified Payee: ${PAYMENT_INFO.payeeName}`}
                </span>
              </div>
              <p className="font-mono-tabular font-semibold text-[#0891B2] mt-0.5">
                UPI ID: {PAYMENT_INFO.upiId}
              </p>
            </div>
          </div>
        </div>

        {/* Main 12-Column Split: Left 5 Cols Tabletop QR Scanner Standee | Right 7 Cols Interactive Payment & Receipt Desk */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 5 Columns: Official Tabletop QR Scanner Standee */}
          <div className="lg:col-span-5 bg-[#0B1F3A] text-white rounded-2xl p-5 sm:p-7 border border-[#1E3A5F] flex flex-col justify-between">
            <div>
              {/* Top Standee Brand Header & View Mode Switcher */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <img
                    src={CLINIC_INFO.logoUrl}
                    alt={CLINIC_INFO.name}
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-lg object-contain bg-white p-1 shrink-0"
                  />
                  <div>
                    <p className="text-xs font-bold tracking-tight text-white">
                      AXON <span className="text-[#22D3EE]">HEALTHCARE</span>
                    </p>
                    <p className="text-[11px] text-slate-300">
                      {PAYMENT_INFO.payeeName}
                    </p>
                  </div>
                </div>

                <div
                  role="group"
                  aria-label="QR Code display view"
                  className="inline-flex items-center p-1 bg-white/10 rounded-lg border border-white/10"
                >
                  <button
                    type="button"
                    onClick={() => setQrViewMode("card")}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      qrViewMode === "card"
                        ? "bg-[#22D3EE] text-[#0B1F3A]"
                        : "text-slate-200 hover:text-white"
                    }`}
                  >
                    {isBn ? "পূর্ণ কার্ড" : "Full Card"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setQrViewMode("square")}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      qrViewMode === "square"
                        ? "bg-[#22D3EE] text-[#0B1F3A]"
                        : "text-slate-200 hover:text-white"
                    }`}
                  >
                    {isBn ? "জুম কিউআর" : "Zoom QR"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setQrViewMode("original")}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      qrViewMode === "original"
                        ? "bg-[#22D3EE] text-[#0B1F3A]"
                        : "text-slate-200 hover:text-white"
                    }`}
                  >
                    {isBn ? "মূল ছবি" : "Original"}
                  </button>
                </div>
              </div>

              {/* High-Contrast White QR Stage */}
              <div className="qr-scan-surface bg-white text-[#0B1F3A] rounded-2xl p-4 sm:p-5 border border-slate-200 flex flex-col items-center justify-center relative">
                <div className="w-full flex items-center justify-between text-xs text-slate-500 pb-3 mb-3 border-b border-slate-100">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[#0B1F3A]">
                    <span className="w-5 h-5 rounded-full bg-[#3B5949] text-white font-bold text-[11px] inline-flex items-center justify-center shrink-0">
                      {PAYMENT_INFO.payeeInitial}
                    </span>
                    {PAYMENT_INFO.payeeName}
                  </span>
                  <span className="font-mono-tabular font-semibold text-[#0891B2]">
                    OKAxis Verified
                  </span>
                </div>

                <img
                  src={activeQrImage}
                  alt={`Official UPI QR Code for ${PAYMENT_INFO.payeeName} (${PAYMENT_INFO.upiId})`}
                  referrerPolicy="no-referrer"
                  className="w-full max-w-[290px] max-h-[340px] object-contain rounded-lg"
                />

                <div className="mt-3 pt-3 border-t border-slate-100 w-full flex items-center justify-between gap-2 text-xs">
                  <span className="font-mono-tabular font-bold text-[#0B1F3A]">
                    UPI ID: {PAYMENT_INFO.upiId}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQrModalOpen(true)}
                    data-testid="open-qr-fullscreen-btn"
                    className="inline-flex items-center gap-1 font-semibold text-[#0891B2] hover:text-[#0B1F3A] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    {isBn ? "বড় করে দেখুন" : "Enlarge QR"}
                  </button>
                </div>
              </div>
            </div>

            {/* Standee Footer: Supported UPI Apps + Save QR for "Scan from Gallery" */}
            <div className="mt-5 pt-4 border-t border-white/10 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
                <span>
                  {isBn ? "সমর্থিত অ্যাপ:" : "Supported Apps:"}
                </span>
                <span className="font-semibold text-white">
                  GPay · PhonePe · Paytm · BHIM
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setQrModalOpen(true)}
                  className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <QrCode className="w-3.5 h-3.5 text-[#22D3EE]" />
                  {isBn ? "ফুলস্ক্রিন কিউআর" : "Fullscreen QR"}
                </button>

                <a
                  href={PAYMENT_INFO.qrOriginalImageUrl}
                  download="AXON-Healthcare-UPI-QR-jabarhkd-okaxis.jpeg"
                  className="px-3 py-2.5 rounded-xl bg-[#22D3EE]/15 hover:bg-[#22D3EE]/25 text-[#22D3EE] border border-[#22D3EE]/30 text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  {isBn ? "কিউআর ডাউনলোড" : "Download QR"}
                </a>
              </div>
            </div>
          </div>

          {/* Right 7 Columns: Verified Account Details + Interactive Payment Purpose & Receipt Confirmation Builder */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Top Verified Payee & UPI ID Copy Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Account Holder Name Card */}
                <div className="bg-[#F8FAFC] rounded-xl p-4 border border-slate-200 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-medium text-slate-500">
                        {isBn
                          ? "অ্যাকাউন্ট হোল্ডারের নাম (Payee Name)"
                          : "Account Holder / Payee Name"}
                      </p>
                      <h3 className="text-base sm:text-lg font-bold text-[#0B1F3A] mt-1">
                        {PAYMENT_INFO.payeeName}
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {PAYMENT_INFO.payeeNameBn}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyPayee}
                      className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-[#0B1F3A] border border-slate-200 text-xs font-semibold inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {copiedPayee ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{isBn ? "কপি হয়েছে" : "Copied"}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>{isBn ? "নাম কপি" : "Copy"}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-slate-500 mt-3 pt-2.5 border-t border-slate-200/80">
                    {isBn
                      ? "অ্যাক্সন হেলথকেয়ার ভেরিফাইড ব্যাংক হিসাব"
                      : "Verified AXON Healthcare Reception Account"}
                  </p>
                </div>

                {/* Official UPI ID Card */}
                <div className="bg-[#ECFEFF] rounded-xl p-4 border border-[#A5F3FC] flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold text-[#0E7490]">
                        {isBn
                          ? "অফিশিয়াল ইউপিআই আইডি"
                          : "Official UPI ID"}
                      </p>
                      <p
                        data-testid="recognized-upi-id"
                        className="text-base sm:text-lg font-bold font-mono-tabular text-[#0B1F3A] mt-1 break-all"
                      >
                        {PAYMENT_INFO.upiId}
                      </p>
                      <p className="text-xs text-[#0E7490] mt-0.5">
                        Google Pay · PhonePe · Paytm
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      data-testid="copy-upi-id"
                      className="px-2.5 py-1.5 rounded-lg bg-[#0B1F3A] hover:bg-[#16325B] text-white text-xs font-bold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
                    >
                      {copiedUpi ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#22D3EE]" />
                          <span>{isBn ? "কপি হয়েছে!" : "Copied!"}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#22D3EE]" />
                          <span>{isBn ? "কপি আইডি" : "Copy ID"}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-[#155E75] mt-3 pt-2.5 border-t border-[#A5F3FC]/70">
                    {isBn ? PAYMENT_INFO.bankHandleBn : PAYMENT_INFO.bankHandle}
                  </p>
                </div>
              </div>

              {/* Interactive Payment Purpose & Patient Slip Customizer */}
              <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-slate-200 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold text-[#0891B2]">
                      {isBn
                        ? "পেমেন্ট স্লিপ ও ইউপিআই নোট তৈরি করুন"
                        : "Customize Payment Purpose & Confirmation Slip"}
                    </p>
                    <h4 className="text-sm sm:text-base font-bold text-[#0B1F3A]">
                      {isBn
                        ? "কোন সেবার জন্য পেমেন্ট করছেন নির্বাচন করুন"
                        : "Select Department, Doctor/Test & Patient Reference"}
                    </h4>
                  </div>
                  <span className="text-xs font-mono-tabular text-slate-500">
                    {isBn ? "তাৎক্ষণিক রসিদ যাচাই" : "Instant Desk Verification"}
                  </span>
                </div>

                {/* Step 1: Purpose Segmented Buttons */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    {isBn
                      ? "১. পেমেন্টের বিভাগ নির্বাচন করুন:"
                      : "1. Select Payment Department:"}
                  </label>
                  <div
                    role="group"
                    aria-label="Select payment purpose"
                    className="flex flex-wrap gap-2"
                  >
                    {purposeOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handlePurposeChange(option.value)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          paymentPurpose === option.value
                            ? "bg-[#0B1F3A] text-white"
                            : "bg-white text-slate-700 border border-slate-200 hover:border-[#0B1F3A]/40"
                        }`}
                      >
                        {isBn ? option.labelBn : option.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Specific Doctor/Test + Patient Name + Optional UTR */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div>
                    <label
                      htmlFor="payment-specific-item"
                      className="block text-xs font-semibold text-slate-700 mb-1"
                    >
                      {paymentPurpose === "OPD Chamber Consultation"
                        ? isBn
                          ? "চিকিৎসকের নাম"
                          : "Consulting Doctor"
                        : paymentPurpose === "Diagnostic Lab Test"
                        ? isBn
                          ? "পরীক্ষার নাম"
                          : "Diagnostic Test"
                        : isBn
                        ? "ফার্মেসি বিভাগ"
                        : "Pharmacy Item"}
                    </label>
                    {paymentPurpose === "OPD Chamber Consultation" ? (
                      <select
                        id="payment-specific-item"
                        value={selectedDoctorOrTest}
                        onChange={(e) =>
                          setSelectedDoctorOrTest(e.target.value)
                        }
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-medium text-[#0B1F3A] focus:outline-2 focus:outline-[#0891B2]"
                      >
                        {DOCTORS_DATA.map((doc) => (
                          <option key={doc.id} value={doc.name}>
                            {isBn
                              ? `${doc.nameBn}${
                                  doc.consultationFeeBn
                                    ? ` — পরামর্শ ফি: ${doc.consultationFeeBn}`
                                    : ""
                                }`
                              : `${doc.name}${
                                  doc.consultationFee
                                    ? ` — Fee: ${doc.consultationFee}`
                                    : ""
                                }`}
                          </option>
                        ))}
                      </select>
                    ) : paymentPurpose === "Diagnostic Lab Test" ? (
                      <select
                        id="payment-specific-item"
                        value={selectedDoctorOrTest}
                        onChange={(e) =>
                          setSelectedDoctorOrTest(e.target.value)
                        }
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-medium text-[#0B1F3A] focus:outline-2 focus:outline-[#0891B2]"
                      >
                        {DIAGNOSTICS_DATA.map((testItem) => (
                          <option key={testItem.id} value={testItem.name}>
                            {isBn ? testItem.nameBn : testItem.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id="payment-specific-item"
                        type="text"
                        value={selectedDoctorOrTest}
                        onChange={(e) =>
                          setSelectedDoctorOrTest(e.target.value)
                        }
                        placeholder={
                          isBn ? "প্রেসক্রিপশন ওষুধ" : "Prescription Medicines"
                        }
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-medium text-[#0B1F3A] focus:outline-2 focus:outline-[#0891B2]"
                      />
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="payment-patient-name"
                      className="block text-xs font-semibold text-slate-700 mb-1"
                    >
                      {isBn
                        ? "রোগীর নাম (ঐচ্ছিক)"
                        : "Patient Name (Optional)"}
                    </label>
                    <input
                      id="payment-patient-name"
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder={
                        isBn ? "যেমন: রাহুল দাস" : "e.g. Patient Full Name"
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-[#0B1F3A] placeholder:text-slate-400 focus:outline-2 focus:outline-[#0891B2]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="payment-utr-ref"
                      className="block text-xs font-semibold text-slate-700 mb-1"
                    >
                      {isBn
                        ? "UPI রেফারেন্স / UTR (ঐচ্ছিক)"
                        : "UPI Ref / UTR No. (Optional)"}
                    </label>
                    <input
                      id="payment-utr-ref"
                      type="text"
                      value={utrReference}
                      onChange={(e) => setUtrReference(e.target.value)}
                      placeholder={
                        isBn ? "১২ সংখ্যার UTR নম্বর" : "12-digit UTR / Ref ID"
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-mono-tabular text-[#0B1F3A] placeholder:text-slate-400 focus:outline-2 focus:outline-[#0891B2]"
                    />
                  </div>
                </div>

                {/* Live Generated UPI Note Preview */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 border-t border-slate-200/80">
                  <div className="truncate">
                    <span className="font-semibold text-[#0B1F3A]">
                      {isBn ? "ইউপিআই নোট:" : "Auto UPI Remark:"}
                    </span>{" "}
                    <span
                      data-testid="live-upi-note-preview"
                      className="font-mono-tabular text-slate-700"
                    >
                      {paymentSummary.upiNote}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopySlip}
                    className="font-semibold text-[#0891B2] hover:text-[#0B1F3A] inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {copiedSlip ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{isBn ? "স্লিপ কপি হয়েছে" : "Slip Copied"}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>
                          {isBn ? "পেমেন্ট তথ্য কপি করুন" : "Copy Payment Slip"}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Action Bar: Direct Mobile UPI App Trigger + WhatsApp Receipt Verification */}
            <div className="pt-6 mt-6 border-t border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <a
                  href={paymentSummary.upiUri}
                  data-testid="direct-upi-pay-link"
                  className="flex-1 py-3.5 px-5 rounded-xl bg-[#0B1F3A] hover:bg-[#16325B] text-white font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0"
                >
                  <Smartphone className="w-4 h-4 text-[#22D3EE] shrink-0" />
                  {isBn
                    ? "ইউপিআই অ্যাপ দিয়ে সরাসরি পেমেন্ট করুন"
                    : "Pay Now via UPI App (GPay / PhonePe)"}
                </a>

                <a
                  href={paymentSummary.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="whatsapp-payment-confirm-link"
                  className="py-3.5 px-5 rounded-xl bg-[#22D3EE] hover:bg-[#67E8F9] text-[#0B1F3A] font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  {isBn
                    ? "হোয়াটসঅ্যাপে রসিদ পাঠান"
                    : "Share Receipt on WhatsApp"}
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <span>
                  {isBn
                    ? "১. QR স্ক্যান করুন · ২. নাম যাচাই করুন (Abdul Jabbar Laskar) · ৩. কাউন্টারে বা হোয়াটসঅ্যাপে রসিদ দেখান"
                    : "1. Scan QR or Copy ID · 2. Verify 'Abdul Jabbar Laskar' · 3. Share receipt on WhatsApp or at reception"}
                </span>
                <a
                  href={`tel:${CLINIC_INFO.primaryPhone}`}
                  className="font-mono-tabular font-semibold text-[#0B1F3A] hover:text-[#0891B2] inline-flex items-center gap-1 whitespace-nowrap shrink-0"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#0891B2]" />
                  {isBn ? "সহায়তা:" : "Billing Help:"} {CLINIC_INFO.primaryPhone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen High-Contrast QR Code Lightbox Modal */}
      {qrModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Official AXON Healthcare UPI QR Code"
          className="fixed inset-0 z-50 bg-[#0B1F3A]/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setQrModalOpen(false)}
        >
          <div
            className="bg-white text-[#0B1F3A] rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <img
                  src={CLINIC_INFO.logoUrl}
                  alt={CLINIC_INFO.name}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-lg object-contain border border-slate-200 p-0.5 shrink-0"
                />
                <div>
                  <h3 className="text-base font-bold text-[#0B1F3A]">
                    {PAYMENT_INFO.payeeName}
                  </h3>
                  <p className="text-xs font-mono-tabular text-[#0891B2] font-semibold">
                    UPI ID: {PAYMENT_INFO.upiId}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setQrModalOpen(false)}
                aria-label="Close fullscreen QR modal"
                className="p-2 rounded-lg text-slate-500 hover:text-[#0B1F3A] hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#F8FAFC] rounded-xl p-4 border border-slate-200 flex flex-col items-center">
              <img
                src={PAYMENT_INFO.qrOriginalImageUrl}
                alt={`Fullscreen UPI QR Code for ${PAYMENT_INFO.payeeName}`}
                referrerPolicy="no-referrer"
                className="w-full max-h-[420px] object-contain rounded-lg"
              />
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handleCopyUpi}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#0B1F3A] hover:bg-[#16325B] text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-[#22D3EE]" />
                {copiedUpi ? "Copied: jabarhkd@okaxis" : "Copy UPI ID"}
              </button>

              <button
                type="button"
                onClick={() => setQrModalOpen(false)}
                className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0B1F3A] text-xs font-semibold transition-colors cursor-pointer"
              >
                {isBn ? "বন্ধ করুন" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
