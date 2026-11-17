import {
  DoctorProfile,
  DiagnosticService,
  FaqItem,
  FaqCategory,
  Language,
} from "../data/clinicData";

/**
 * Validates a 10-digit Indian mobile number (supports optional +91 or 0 prefix).
 */
export function normalizeIndianPhone(rawPhone: string): string {
  const digits = rawPhone.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    return digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith("0")) {
    return digits.slice(1);
  }
  return digits;
}

export function isValidIndianMobile(rawPhone: string): boolean {
  const cleaned = normalizeIndianPhone(rawPhone);
  return /^[6-9]\d{9}$/.test(cleaned);
}

/**
 * Checks if a given YYYY-MM-DD date string matches a doctor's visiting days.
 */
export function getDayAbbreviation(dateStr: string): string | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return null;
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  if (Number.isNaN(dt.getTime())) return null;
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[dt.getUTCDay()];
}

export function checkDoctorScheduleCompatibility(
  doctor: DoctorProfile,
  dateStr: string
): { compatible: boolean; message: string } {
  const dayAbbr = getDayAbbreviation(dateStr);
  if (!dayAbbr) {
    return { compatible: true, message: "" };
  }
  if (!doctor.availableDays.includes(dayAbbr)) {
    return {
      compatible: false,
      message: `${doctor.name} visits on ${doctor.schedule}. Selected date falls on a ${dayAbbr}.`,
    };
  }
  if (doctor.schedule.toLowerCase().includes("contact for information")) {
    return {
      compatible: true,
      message: `Date & Schedule: Contact for information (${doctor.contactPhones[0]}) to confirm ${doctor.name}'s visiting date and chamber serial.`,
    };
  }
  if (doctor.schedule.toLowerCase().includes("call to confirm")) {
    return {
      compatible: true,
      message: `Note: ${doctor.name}'s chamber timings are confirmed via call (8822480027) on the day of visit.`,
    };
  }
  return { compatible: true, message: "" };
}

export interface ConsultationTimeSlot {
  id: string;
  time: string;
  timeBn: string;
  session: "Morning" | "Afternoon" | "Evening";
  sessionBn: string;
  available: boolean;
}

const DEFAULT_CHAMBER_SLOTS: Array<Omit<ConsultationTimeSlot, "available">> = [
  {
    id: "slot-1000",
    time: "10:00 AM – 11:00 AM",
    timeBn: "সকাল ১০:০০ – ১১:০০",
    session: "Morning",
    sessionBn: "সকাল",
  },
  {
    id: "slot-1100",
    time: "11:00 AM – 12:30 PM",
    timeBn: "সকাল ১১:০০ – দুপুর ১২:৩০",
    session: "Morning",
    sessionBn: "সকাল",
  },
  {
    id: "slot-1400",
    time: "02:00 PM – 03:30 PM",
    timeBn: "দুপুর ২:০০ – ৩:৩০",
    session: "Afternoon",
    sessionBn: "দুপুর",
  },
  {
    id: "slot-1630",
    time: "04:30 PM – 06:00 PM",
    timeBn: "বিকাল ৪:৩০ – সন্ধ্যা ৬:০০",
    session: "Evening",
    sessionBn: "সন্ধ্যা",
  },
  {
    id: "slot-1800",
    time: "06:00 PM – 07:30 PM",
    timeBn: "সন্ধ্যা ৬:০০ – ৭:৩০",
    session: "Evening",
    sessionBn: "সন্ধ্যা",
  },
  {
    id: "slot-1930",
    time: "07:30 PM – 08:30 PM",
    timeBn: "সন্ধ্যা ৭:৩০ – রাত ৮:৩০",
    session: "Evening",
    sessionBn: "রাত",
  },
];

export function getDoctorConsultationTimeSlots(
  doctor: DoctorProfile,
  dateStr: string
): ConsultationTimeSlot[] {
  const { compatible } = checkDoctorScheduleCompatibility(doctor, dateStr);
  return DEFAULT_CHAMBER_SLOTS.map((slot) => ({
    ...slot,
    available: compatible,
  }));
}

export function findNextAvailableDateForDoctor(
  doctor: DoctorProfile,
  startDateStr: string
): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startDateStr)) {
    return startDateStr;
  }
  const [y, m, d] = startDateStr.split("-").map(Number);
  const baseUtc = Date.UTC(y, m - 1, d);
  for (let offset = 0; offset <= 14; offset++) {
    const dt = new Date(baseUtc + offset * 86400000);
    const iso = dt.toISOString().slice(0, 10);
    const { compatible } = checkDoctorScheduleCompatibility(doctor, iso);
    if (compatible) {
      return iso;
    }
  }
  return startDateStr;
}

export function filterDoctorsBySpecialty(
  doctors: DoctorProfile[],
  specialtyFilter: string,
  searchQuery: string
): DoctorProfile[] {
  return doctors.filter((doc) => {
    const matchesSpecialty =
      specialtyFilter === "All" ||
      doc.specialtyKey.toLowerCase() === specialtyFilter.toLowerCase() ||
      doc.specialty.toLowerCase().includes(specialtyFilter.toLowerCase());
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      doc.name.toLowerCase().includes(q) ||
      doc.nameBn.toLowerCase().includes(q) ||
      doc.specialty.toLowerCase().includes(q) ||
      doc.specialtyBn.toLowerCase().includes(q) ||
      doc.qualifications.toLowerCase().includes(q) ||
      doc.hospital.toLowerCase().includes(q);
    return matchesSpecialty && matchesQuery;
  });
}

export function filterFaqs(
  faqs: FaqItem[],
  category: FaqCategory,
  searchQuery: string = ""
): FaqItem[] {
  const q = searchQuery.trim().toLowerCase();
  return faqs.filter((item) => {
    const matchesCategory = category === "All" || item.category === category;
    const matchesQuery =
      !q ||
      item.question.toLowerCase().includes(q) ||
      item.questionBn.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q) ||
      item.answerBn.toLowerCase().includes(q) ||
      item.keyTakeaway.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });
}

export function toggleLanguage(current: Language): Language {
  return current === "en" ? "bn" : "en";
}

export type ThemeMode = "light" | "dark";

export function toggleThemeMode(current: ThemeMode): ThemeMode {
  return current === "light" ? "dark" : "light";
}

export function getThemeToggleLabel(
  theme: ThemeMode,
  language: Language = "en"
): {
  label: string;
  ariaLabel: string;
} {
  const isBn = language === "bn";
  const isDark = theme === "dark";
  if (isDark) {
    return {
      label: isBn ? "লাইট মোড" : "Light",
      ariaLabel: isBn
        ? "লাইট মোডে পরিবর্তন করুন"
        : "Switch to light mode",
    };
  }
  return {
    label: isBn ? "ডার্ক মোড" : "Dark",
    ariaLabel: isBn
      ? "রাতের জন্য ডার্ক মোডে পরিবর্তন করুন"
      : "Switch to dark mode for night accessibility",
  };
}

export interface UpiPaymentParams {
  upiId: string;
  payeeName: string;
  note?: string;
}

/**
 * Generates a standard NPCI UPI deep link URI for direct mobile payments.
 */
export function buildUpiPaymentUri({
  upiId,
  payeeName,
  note,
}: UpiPaymentParams): string {
  const params = new URLSearchParams();
  params.set("pa", upiId.trim());
  params.set("pn", payeeName.trim());
  if (note && note.trim().length > 0) {
    params.set("tn", note.trim());
  }
  params.set("cu", "INR");
  return `upi://pay?${params.toString().replace(/\+/g, "%20")}`;
}

export const GMP_ATTRIBUTION_ID = "gmp_mcp_codeassist_v1_aistudio";

export function buildGoogleMapsPlaceEmbedUrl(
  apiKey: string,
  placeQuery: string,
  language: Language = "en"
): string {
  const params = new URLSearchParams({
    key: apiKey.trim(),
    q: placeQuery.trim(),
    language,
    region: "IN",
    solution_id: GMP_ATTRIBUTION_ID,
  });
  return `https://www.google.com/maps/embed/v1/place?${params.toString()}`;
}

export function buildGoogleMapsDirectionsUrl(destinationQuery: string): string {
  const params = new URLSearchParams({
    api: "1",
    destination: destinationQuery.trim(),
  });
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

export function buildGoogleMapsSearchUrl(locationQuery: string): string {
  const params = new URLSearchParams({
    api: "1",
    query: locationQuery.trim(),
  });
  return `https://www.google.com/maps/search/?${params.toString()}`;
}

export function getClinicGoogleMapsLinks(
  clinicInfo: {
    name: string;
    addressLine1: string;
    addressLine2: string;
  },
  language: Language = "en"
): {
  searchUrl: string;
  directionsUrl: string;
  traceLabel: string;
  searchLabel: string;
} {
  const fullQuery = `${clinicInfo.name}, ${clinicInfo.addressLine1}, ${clinicInfo.addressLine2}`;
  const isBn = language === "bn";
  return {
    searchUrl: buildGoogleMapsSearchUrl(fullQuery),
    directionsUrl: buildGoogleMapsDirectionsUrl(fullQuery),
    traceLabel: isBn
      ? "গুগল ম্যাপে রুট ট্র্যাক করুন"
      : "Trace Route on Google Maps",
    searchLabel: isBn
      ? "গুগল ম্যাপে অবস্থান দেখুন"
      : "Check Location on Google Maps",
  };
}

export interface BrandIdentityHeaderData {
  brandNamePrimary: string;
  brandNameSecondary: string;
  headline: string;
  tagline: string;
  descriptor: string;
  addressSummary: string;
  logoUrl: string;
}

export function getBrandIdentityHeader(
  clinicInfo: {
    name: string;
    nameBn: string;
    headline: string;
    headlineBn: string;
    tagline: string;
    taglineBn: string;
    addressLine1: string;
    addressLine1Bn: string;
    addressLine2: string;
    addressLine2Bn: string;
    logoUrl: string;
  },
  language: Language
): BrandIdentityHeaderData {
  const isBn = language === "bn";
  return {
    brandNamePrimary: isBn ? clinicInfo.nameBn : clinicInfo.name,
    brandNameSecondary: isBn ? clinicInfo.name : clinicInfo.nameBn,
    headline: isBn ? clinicInfo.headlineBn : clinicInfo.headline,
    tagline: isBn ? clinicInfo.taglineBn : clinicInfo.tagline,
    descriptor: isBn
      ? "ফার্মেসি · বিশেষজ্ঞ আউটডোর চেম্বার · ক্লিনিক্যাল ডায়াগনস্টিকস"
      : "Pharmacy · Specialist OPD Chambers · Clinical Diagnostics",
    addressSummary: isBn
      ? `${clinicInfo.addressLine1Bn}, ${clinicInfo.addressLine2Bn}`
      : `${clinicInfo.addressLine1}, ${clinicInfo.addressLine2}`,
    logoUrl: clinicInfo.logoUrl,
  };
}

export function getDirectCallLink(
  rawPhone: string,
  language: Language = "en"
): {
  href: string;
  label: string;
  phoneDisplay: string;
  ariaLabel: string;
} {
  const cleaned = normalizeIndianPhone(rawPhone);
  const isBn = language === "bn";
  return {
    href: `tel:${cleaned}`,
    label: isBn ? "এখনই কল করুন" : "Call Now",
    phoneDisplay: cleaned,
    ariaLabel: isBn
      ? `এখনই অ্যাক্সন হেলথকেয়ারে কল করুন: ${cleaned}`
      : `Call Now — AXON Healthcare (${cleaned})`,
  };
}

export type DiagnosticIconKey =
  | "xray-scan"
  | "sonography-waves"
  | "blood-droplets"
  | "ecg-heart-pulse"
  | "orthopedic-bone";

export function getDiagnosticIconKey(serviceId: string): DiagnosticIconKey {
  switch (serviceId) {
    case "digital-x-ray":
      return "xray-scan";
    case "3d-sonography":
      return "sonography-waves";
    case "blood-tests":
      return "blood-droplets";
    case "ecg":
      return "ecg-heart-pulse";
    case "bone-joint-diagnostics":
      return "orthopedic-bone";
    default:
      return "xray-scan";
  }
}

export function filterDiagnosticsByQuery(
  diagnostics: DiagnosticService[],
  searchQuery: string
): DiagnosticService[] {
  const q = searchQuery.trim().toLowerCase();
  if (!q) {
    return diagnostics;
  }

  const normalizedQueryCompact = q.replace(/[\s\-_]+/g, "");

  return diagnostics.filter((service) => {
    const searchableFields = [
      service.id,
      service.name,
      service.nameBn,
      service.category,
      service.categoryBn,
      service.description,
      service.descriptionBn,
      service.preparation,
      service.preparationBn,
      ...service.parameters,
      ...service.parametersBn,
    ]
      .join(" ")
      .toLowerCase();

    if (searchableFields.includes(q)) {
      return true;
    }

    if (normalizedQueryCompact.length > 0) {
      const compactHaystack = searchableFields.replace(/[\s\-_]+/g, "");
      if (compactHaystack.includes(normalizedQueryCompact)) {
        return true;
      }
    }

    return false;
  });
}

export interface PaymentConfirmationInput {
  upiId: string;
  payeeName: string;
  whatsappNumber: string;
  purpose: string;
  specificItem?: string;
  patientName?: string;
  utrReference?: string;
  language?: Language;
}

export function buildPaymentConfirmationSummary(
  input: PaymentConfirmationInput
): {
  upiNote: string;
  upiUri: string;
  whatsappUrl: string;
  summaryLine: string;
} {
  const cleanPatient = (input.patientName || "").trim();
  const cleanItem = (input.specificItem || "").trim();
  const cleanUtr = (input.utrReference || "").trim().replace(/\s+/g, "");
  const isBn = input.language === "bn";

  const noteParts = ["AXON Healthcare", input.purpose];
  if (cleanItem) {
    noteParts.push(cleanItem);
  }
  if (cleanPatient) {
    noteParts.push(cleanPatient);
  }
  const upiNote = noteParts.join(" - ").slice(0, 80);

  const upiUri = buildUpiPaymentUri({
    upiId: input.upiId,
    payeeName: input.payeeName,
    note: upiNote,
  });

  const detailSegmentsEn = [
    `Hello AXON Healthcare, I have completed a UPI payment to ${input.upiId} (${input.payeeName}).`,
    `Purpose: ${input.purpose}${cleanItem ? ` (${cleanItem})` : ""}`,
  ];
  if (cleanPatient) {
    detailSegmentsEn.push(`Patient Name: ${cleanPatient}`);
  }
  if (cleanUtr) {
    detailSegmentsEn.push(`UPI Ref / UTR: ${cleanUtr}`);
  }

  const detailSegmentsBn = [
    `নমস্কার অ্যাক্সন হেলথকেয়ার, আমি অফিশিয়াল UPI ID ${input.upiId} (${input.payeeName})-এ পেমেন্ট সম্পন্ন করেছি।`,
    `বিভাগ: ${input.purpose}${cleanItem ? ` (${cleanItem})` : ""}`,
  ];
  if (cleanPatient) {
    detailSegmentsBn.push(`রোগীর নাম: ${cleanPatient}`);
  }
  if (cleanUtr) {
    detailSegmentsBn.push(`UPI রেফারেন্স / UTR: ${cleanUtr}`);
  }

  const messageText = isBn
    ? detailSegmentsBn.join("\n")
    : detailSegmentsEn.join("\n");

  const whatsappUrl = `https://wa.me/${input.whatsappNumber.replace(
    /\D/g,
    ""
  )}?text=${encodeURIComponent(messageText)}`;

  const summaryLine = `${input.purpose}${
    cleanItem ? ` · ${cleanItem}` : ""
  }${cleanPatient ? ` · ${cleanPatient}` : ""}${
    cleanUtr ? ` · Ref: ${cleanUtr}` : ""
  }`;

  return {
    upiNote,
    upiUri,
    whatsappUrl,
    summaryLine,
  };
}

export interface AppointmentToastInput {
  doctorName: string;
  doctorNameBn: string;
  dateStr: string;
  timeSlot: string;
  timeSlotBn: string;
  patientName?: string;
  contactPhone: string;
  consultationFee?: string;
  consultationFeeBn?: string;
}

export function buildAppointmentSuccessToast(
  input: AppointmentToastInput,
  language: Language = "en"
): {
  title: string;
  message: string;
  subtext: string;
} {
  const isBn = language === "bn";
  const cleanPatient = (input.patientName || "").trim();
  const feeSegmentEn = input.consultationFee
    ? ` · Consultation Fee: ${input.consultationFee}`
    : "";
  const feeSegmentBn = input.consultationFeeBn
    ? ` · পরামর্শ ফি: ${input.consultationFeeBn}`
    : "";

  if (isBn) {
    return {
      title: "অ্যাপয়েন্টমেন্ট স্লট সফলভাবে জমা হয়েছে",
      message: `${
        cleanPatient ? `${cleanPatient}-এর জন্য ` : ""
      }${input.doctorNameBn}-এর সাথে ${input.dateStr} তারিখে (${
        input.timeSlotBn
      }) পরামর্শের স্লট নির্বাচিত হয়েছে${feeSegmentBn}।`,
      subtext: `চূড়ান্ত চেম্বার সিরিয়ালের জন্য কল করুন: ${input.contactPhone}`,
    };
  }

  return {
    title: "Appointment Slot Submitted Successfully",
    message: `${
      cleanPatient ? `Appointment for ${cleanPatient} with ` : "Consultation with "
    }${input.doctorName} on ${input.dateStr} (${input.timeSlot}) is ready${feeSegmentEn}.`,
    subtext: `Call chamber desk at ${input.contactPhone} or send via WhatsApp to finalize serial.`,
  };
}







