import React, { useState, useMemo } from "react";
import {
  PhoneCall,
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  User,
  MessageSquare,
} from "lucide-react";
import { DOCTORS_DATA, CLINIC_INFO, Language } from "../data/clinicData";
import {
  checkDoctorScheduleCompatibility,
  getDoctorConsultationTimeSlots,
  findNextAvailableDateForDoctor,
  getDayAbbreviation,
  isValidIndianMobile,
  buildAppointmentSuccessToast,
} from "../utils/clinicLogic";
import { ToastNotification } from "./ToastNotification";

interface BookingSectionProps {
  language: Language;
}

const getTodayIsoDate = (): string => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const getUpcomingDates = (startIso: string, count: number = 6) => {
  const [y, m, d] = startIso.split("-").map(Number);
  const baseUtc = Date.UTC(y, m - 1, d);
  const shortMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const result: Array<{
    iso: string;
    dayAbbr: string;
    shortDate: string;
  }> = [];

  for (let i = 0; i < count; i++) {
    const dt = new Date(baseUtc + i * 86400000);
    const iso = dt.toISOString().slice(0, 10);
    const dayAbbr = getDayAbbreviation(iso) || "";
    const shortDate = `${shortMonths[dt.getUTCMonth()]} ${dt.getUTCDate()}`;
    result.push({ iso, dayAbbr, shortDate });
  }
  return result;
};

export const BookingSection: React.FC<BookingSectionProps> = ({ language }) => {
  const isBn = language === "bn";
  const todayIso = useMemo(() => getTodayIsoDate(), []);
  const upcomingDates = useMemo(() => getUpcomingDates(todayIso, 6), [todayIso]);

  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(
    DOCTORS_DATA[0].id
  );
  const [selectedDate, setSelectedDate] = useState<string>(todayIso);
  const [selectedSlotId, setSelectedSlotId] = useState<string>("slot-1000");
  const [patientName, setPatientName] = useState<string>("");
  const [patientPhone, setPatientPhone] = useState<string>("");
  const [slotConfirmed, setSlotConfirmed] = useState<boolean>(false);
  const [toastOpen, setToastOpen] = useState<boolean>(false);

  const selectedDoctor = useMemo(
    () =>
      DOCTORS_DATA.find((d) => d.id === selectedDoctorId) || DOCTORS_DATA[0],
    [selectedDoctorId]
  );

  const scheduleCheck = useMemo(
    () => checkDoctorScheduleCompatibility(selectedDoctor, selectedDate),
    [selectedDoctor, selectedDate]
  );

  const timeSlots = useMemo(
    () => getDoctorConsultationTimeSlots(selectedDoctor, selectedDate),
    [selectedDoctor, selectedDate]
  );

  const selectedSlot = useMemo(
    () => timeSlots.find((s) => s.id === selectedSlotId) || timeSlots[0],
    [timeSlots, selectedSlotId]
  );

  const toastContent = useMemo(
    () =>
      buildAppointmentSuccessToast(
        {
          doctorName: selectedDoctor.name,
          doctorNameBn: selectedDoctor.nameBn,
          dateStr: selectedDate,
          timeSlot: selectedSlot.time,
          timeSlotBn: selectedSlot.timeBn,
          patientName,
          contactPhone: selectedDoctor.contactPhones[0],
          consultationFee: selectedDoctor.consultationFee,
          consultationFeeBn: selectedDoctor.consultationFeeBn,
        },
        language
      ),
    [selectedDoctor, selectedDate, selectedSlot, patientName, language]
  );

  const handleSelectDoctor = (docId: string) => {
    setSelectedDoctorId(docId);
    setSlotConfirmed(false);
    setToastOpen(false);
  };

  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
    setSlotConfirmed(false);
    setToastOpen(false);
  };

  const handleJumpToNextAvailableDate = () => {
    const nextIso = findNextAvailableDateForDoctor(selectedDoctor, selectedDate);
    setSelectedDate(nextIso);
    setSlotConfirmed(false);
    setToastOpen(false);
  };

  const phoneTrimmed = patientPhone.trim();
  const isPhoneValid =
    phoneTrimmed.length === 0 || isValidIndianMobile(phoneTrimmed);

  const whatsappRequestUrl = useMemo(() => {
    const docName = isBn ? selectedDoctor.nameBn : selectedDoctor.name;
    const slotLabel = isBn ? selectedSlot.timeBn : selectedSlot.time;
    const feeLabel = isBn
      ? selectedDoctor.consultationFeeBn
      : selectedDoctor.consultationFee;
    const lines = [
      isBn
        ? "নমস্কার অ্যাক্সন হেলথকেয়ার, আমি ডাক্তারের পরামর্শের জন্য একটি সময় স্লট বুক করতে চাই:"
        : "Hello AXON Healthcare, I would like to request a doctor consultation slot:",
      `${isBn ? "চিকিৎসক" : "Doctor"}: ${docName}`,
      `${isBn ? "তারিখ" : "Preferred Date"}: ${selectedDate}`,
      `${isBn ? "পছন্দের সময়" : "Preferred Time Slot"}: ${slotLabel}`,
    ];
    if (feeLabel) {
      lines.push(`${isBn ? "পরামর্শ ফি" : "Consultation Fee"}: ${feeLabel}`);
    }
    if (patientName.trim()) {
      lines.push(
        `${isBn ? "রোগীর নাম" : "Patient Name"}: ${patientName.trim()}`
      );
    }
    if (phoneTrimmed) {
      lines.push(`${isBn ? "মোবাইল" : "Mobile"}: ${phoneTrimmed}`);
    }
    return `https://wa.me/91${CLINIC_INFO.primaryPhone}?text=${encodeURIComponent(
      lines.join("\n")
    )}`;
  }, [
    isBn,
    selectedDoctor,
    selectedDate,
    selectedSlot,
    patientName,
    phoneTrimmed,
  ]);

  return (
    <section
      id="chamber-schedule"
      className="scroll-mt-16 py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="pb-8 border-b border-slate-200 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-[#0891B2] tracking-wide">
              {isBn
                ? "০৫. আউটডোর চেম্বার অ্যাপয়েন্টমেন্ট ও সময়সূচী"
                : "05. Consultation Slot Scheduler & Chamber Directory"}
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] mt-2 tracking-tight"
              style={{ textWrap: "balance" }}
            >
              {isBn
                ? "পছন্দের তারিখ ও সময় স্লট নির্বাচন করুন"
                : "Select Consultation Date & Preferred Time Slot"}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              {isBn
                ? "আপনার পছন্দের বিশেষজ্ঞ চিকিৎসক, তারিখ এবং উপলব্ধ চেম্বার টাইম স্লট নির্বাচন করে সিরিয়াল নিশ্চিত করুন।"
                : "Choose a specialist doctor, pick your consultation date using the interactive calendar, and select your preferred chamber time slot."}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <img
              src={CLINIC_INFO.logoUrl}
              alt={CLINIC_INFO.name}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-xl object-contain border border-slate-200 bg-white p-1 shrink-0"
            />
            <div className="text-xs">
              <p className="font-bold text-[#0B1F3A]">
                {isBn ? "চেম্বার সিরিয়াল ডেস্ক" : "Chamber Serial Desk"}
              </p>
              <p className="font-mono-tabular text-[#0891B2] font-semibold">
                +91 {CLINIC_INFO.primaryPhone}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Interactive Date Picker & Consultation Time Slots Selector */}
          <div
            data-testid="consultation-slot-scheduler"
            className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-6"
          >
            {/* Step 1: Select Consulting Doctor */}
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label
                  htmlFor="booking-doctor-select"
                  className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider"
                >
                  {isBn
                    ? "১. বিশেষজ্ঞ চিকিৎসক নির্বাচন করুন"
                    : "1. Select Consulting Specialist"}
                </label>
                <span className="text-xs font-semibold text-[#0891B2]">
                  {isBn ? selectedDoctor.scheduleBn : selectedDoctor.schedule}
                  {selectedDoctor.consultationFee && (
                    <span className="ml-1.5 font-mono-tabular text-[#0B1F3A]">
                      ·{" "}
                      {isBn
                        ? `পরামর্শ ফি: ${selectedDoctor.consultationFeeBn}`
                        : `Fee: ${selectedDoctor.consultationFee}`}
                    </span>
                  )}
                </span>
              </div>

              <select
                id="booking-doctor-select"
                data-testid="booking-doctor-select"
                value={selectedDoctorId}
                onChange={(e) => handleSelectDoctor(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-slate-300 text-sm font-semibold text-[#0B1F3A] focus:outline-none focus:border-[#0891B2] focus:ring-2 focus:ring-[#22D3EE]/25"
              >
                {DOCTORS_DATA.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {isBn
                      ? `${doc.nameBn} — ${doc.specialtyBn}${
                          doc.consultationFeeBn
                            ? ` (ফি: ${doc.consultationFeeBn})`
                            : ""
                        }`
                      : `${doc.name} — ${doc.specialty}${
                          doc.consultationFee
                            ? ` (Fee: ${doc.consultationFee})`
                            : ""
                        }`}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Interactive Date Picker + Quick Upcoming Dates */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label
                  htmlFor="booking-date-picker"
                  className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider inline-flex items-center gap-1.5"
                >
                  <Calendar className="w-4 h-4 text-[#0891B2]" />
                  {isBn
                    ? "২. পরামর্শের তারিখ নির্বাচন করুন"
                    : "2. Pick Consultation Date"}
                </label>

                <input
                  id="booking-date-picker"
                  data-testid="booking-date-picker"
                  type="date"
                  min={todayIso}
                  value={selectedDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-[#F8FAFC] border border-slate-300 text-xs sm:text-sm font-mono-tabular font-semibold text-[#0B1F3A] focus:outline-none focus:border-[#0891B2] focus:ring-2 focus:ring-[#22D3EE]/25 cursor-pointer"
                />
              </div>

              {/* 6-Day Quick Date Selector Strip */}
              <div
                className="grid grid-cols-3 sm:grid-cols-6 gap-2"
                role="group"
                aria-label={
                  isBn ? "দ্রুত তারিখ নির্বাচন" : "Quick consultation date selector"
                }
              >
                {upcomingDates.map((d) => {
                  const isSelected = selectedDate === d.iso;
                  const isDocVisiting = selectedDoctor.availableDays.includes(
                    d.dayAbbr
                  );
                  return (
                    <button
                      key={d.iso}
                      type="button"
                      onClick={() => handleDateChange(d.iso)}
                      data-testid={`quick-date-btn-${d.iso}`}
                      className={`p-2.5 rounded-xl border text-center transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-[#0B1F3A] border-[#0B1F3A] text-white"
                          : isDocVisiting
                          ? "bg-[#F8FAFC] border-slate-200 text-[#0B1F3A] hover:border-[#0891B2]"
                          : "bg-slate-100/70 border-slate-200 text-slate-400 hover:border-slate-300"
                      }`}
                    >
                      <span
                        className={`block text-[11px] font-bold uppercase ${
                          isSelected ? "text-[#22D3EE]" : "text-slate-500"
                        }`}
                      >
                        {d.dayAbbr}
                      </span>
                      <span className="block text-xs font-mono-tabular font-bold mt-0.5">
                        {d.shortDate}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Doctor Schedule Compatibility Status Banner */}
              {!scheduleCheck.compatible ? (
                <div
                  data-testid="schedule-incompatibility-alert"
                  className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900"
                >
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      {isBn
                        ? `${selectedDoctor.nameBn} শুধুমাত্র ${selectedDoctor.scheduleBn} রোগী দেখেন। অনুগ্রহ করে উপযুক্ত তারিখ নির্বাচন করুন।`
                        : scheduleCheck.message}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleJumpToNextAvailableDate}
                    data-testid="jump-next-available-date"
                    className="px-3 py-1.5 rounded-lg bg-amber-900 hover:bg-amber-800 text-white font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer"
                  >
                    {isBn ? "পরবর্তী উপলব্ধ তারিখ" : "Next Available Date"}
                  </button>
                </div>
              ) : (
                scheduleCheck.message && (
                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#0891B2] shrink-0" />
                    <span>
                      {isBn
                        ? selectedDoctor.schedule
                            .toLowerCase()
                            .includes("contact for information")
                          ? `তারিখ ও সময়সূচী: ${selectedDoctor.nameBn}-এর চেম্বারের তারিখ ও তথ্যের জন্য যোগাযোগ করুন (${selectedDoctor.contactPhones[0]})।`
                          : `দ্রষ্টব্য: ${selectedDoctor.nameBn}-এর চেম্বারের সময় ভিজিটের দিন ফোনে (8822480027) নিশ্চিত করা হয়।`
                        : scheduleCheck.message}
                    </span>
                  </p>
                )
              )}
            </div>

            {/* Step 3: Available Consultation Time Slots */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#0891B2]" />
                  {isBn
                    ? "৩. উপলব্ধ চেম্বার টাইম স্লট নির্বাচন করুন"
                    : "3. Available Consultation Time Slots"}
                </span>
                <span
                  data-testid="selected-slot-label"
                  className="text-xs font-mono-tabular font-semibold text-[#0891B2]"
                >
                  {isBn ? selectedSlot.timeBn : selectedSlot.time}
                </span>
              </div>

              <div
                data-testid="time-slots-grid"
                role="group"
                aria-label={
                  isBn
                    ? "ডাক্তারের পরামর্শের সময় স্লট"
                    : "Available doctor consultation time slots"
                }
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5"
              >
                {timeSlots.map((slot) => {
                  const isSelected = selectedSlotId === slot.id;
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={!slot.available}
                      aria-pressed={isSelected}
                      onClick={() => {
                        setSelectedSlotId(slot.id);
                        setSlotConfirmed(false);
                      }}
                      data-testid={`time-slot-${slot.id}`}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        !slot.available
                          ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60"
                          : isSelected
                          ? "bg-[#0B1F3A] border-[#0B1F3A] text-white shadow-xs cursor-pointer"
                          : "bg-[#F8FAFC] border-slate-200 text-[#0B1F3A] hover:border-[#0891B2] hover:bg-white cursor-pointer"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1.5">
                        <span
                          className={`text-[11px] font-semibold ${
                            isSelected ? "text-[#22D3EE]" : "text-slate-500"
                          }`}
                        >
                          {isBn ? slot.sessionBn : slot.session}
                        </span>
                        {isSelected && slot.available && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#22D3EE] shrink-0" />
                        )}
                      </div>
                      <span className="text-xs sm:text-sm font-mono-tabular font-bold mt-1 block">
                        {isBn ? slot.timeBn : slot.time}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Optional Patient Info & Slot Confirmation */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="booking-patient-name"
                    className="block text-xs font-semibold text-slate-700 mb-1"
                  >
                    {isBn ? "রোগীর নাম (ঐচ্ছিক)" : "Patient Name (Optional)"}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="booking-patient-name"
                      data-testid="booking-patient-name"
                      type="text"
                      value={patientName}
                      onChange={(e) => {
                        setPatientName(e.target.value);
                        setSlotConfirmed(false);
                      }}
                      placeholder={
                        isBn ? "রোগীর পূর্ণ নাম লিখুন" : "Enter patient full name"
                      }
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#F8FAFC] border border-slate-300 text-xs sm:text-sm text-[#0B1F3A] placeholder:text-slate-400 focus:outline-none focus:border-[#0891B2]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="booking-patient-phone"
                    className="block text-xs font-semibold text-slate-700 mb-1"
                  >
                    {isBn
                      ? "মোবাইল নম্বর (ঐচ্ছিক)"
                      : "10-Digit Mobile (Optional)"}
                  </label>
                  <input
                    id="booking-patient-phone"
                    data-testid="booking-patient-phone"
                    type="tel"
                    value={patientPhone}
                    onChange={(e) => {
                      setPatientPhone(e.target.value);
                      setSlotConfirmed(false);
                    }}
                    placeholder={isBn ? "১০ সংখ্যার মোবাইল নম্বর" : "e.g. 9876543210"}
                    className={`w-full px-3 py-2 rounded-xl bg-[#F8FAFC] border text-xs sm:text-sm font-mono-tabular text-[#0B1F3A] placeholder:text-slate-400 focus:outline-none ${
                      isPhoneValid
                        ? "border-slate-300 focus:border-[#0891B2]"
                        : "border-red-400 focus:border-red-500"
                    }`}
                  />
                </div>
              </div>

              {/* Action Buttons: Confirm Slot + Call / WhatsApp */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  disabled={!scheduleCheck.compatible || !isPhoneValid}
                  onClick={() => {
                    setSlotConfirmed(true);
                    setToastOpen(true);
                  }}
                  data-testid="confirm-slot-btn"
                  className="px-5 py-2.5 rounded-xl bg-[#0B1F3A] hover:bg-[#16325B] disabled:bg-slate-300 text-white text-xs sm:text-sm font-bold inline-flex items-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#22D3EE]" />
                  {isBn
                    ? "পছন্দের টাইম স্লট নিশ্চিত করুন"
                    : "Select & Confirm Preferred Slot"}
                </button>

                <a
                  href={whatsappRequestUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="booking-whatsapp-slot-link"
                  className="px-4 py-2.5 rounded-xl bg-[#ECFEFF] hover:bg-[#CFFAFE] text-[#0B1F3A] border border-[#A5F3FC] text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-[#0891B2]" />
                  {isBn
                    ? "হোয়াটসঅ্যাপে স্লট পাঠান"
                    : "Send Slot via WhatsApp"}
                </a>
              </div>

              {/* Confirmation Feedback Card */}
              {slotConfirmed && scheduleCheck.compatible && (
                <div
                  data-testid="slot-confirmation-banner"
                  className="bg-[#ECFEFF] border border-[#67E8F9] rounded-xl p-4 text-xs sm:text-sm text-[#0B1F3A] space-y-1.5"
                >
                  <p className="font-bold flex items-center gap-1.5 text-[#0E7490]">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    {isBn
                      ? "পছন্দের পরামর্শের স্লট প্রস্তুত করা হয়েছে"
                      : "Preferred Consultation Slot Selected"}
                  </p>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong>{isBn ? "চিকিৎসক:" : "Doctor:"}</strong>{" "}
                    {isBn ? selectedDoctor.nameBn : selectedDoctor.name} ·{" "}
                    <strong>{isBn ? "তারিখ:" : "Date:"}</strong> {selectedDate} ·{" "}
                    <strong>{isBn ? "সময়:" : "Time Slot:"}</strong>{" "}
                    {isBn ? selectedSlot.timeBn : selectedSlot.time}
                    {selectedDoctor.consultationFee && (
                      <>
                        {" "}
                        ·{" "}
                        <strong>
                          {isBn ? "পরামর্শ ফি:" : "Consultation Fee:"}
                        </strong>{" "}
                        <span className="font-mono-tabular font-bold text-[#0891B2]">
                          {isBn
                            ? selectedDoctor.consultationFeeBn
                            : selectedDoctor.consultationFee}
                        </span>
                      </>
                    )}
                  </p>
                  <p className="text-xs text-slate-600">
                    {isBn
                      ? `চূড়ান্ত সিরিয়াল নম্বরের জন্য অনুগ্রহ করে ${selectedDoctor.contactPhones[0]} নম্বরে কল করুন বা হোয়াটসঅ্যাপে স্লট পাঠান।`
                      : `Call ${selectedDoctor.contactPhones[0]} or tap "Send Slot via WhatsApp" above to register your chamber serial number at reception.`}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right 5 Columns: Doctor Visiting Days Directory & Telephone Inquiry Desk */}
          <div className="lg:col-span-5 space-y-6">
            {/* Compact Doctor Visiting Directory */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <h3 className="text-base font-bold text-[#0B1F3A] pb-3 border-b border-slate-200">
                {isBn
                  ? "ডাক্তারদের রোগী দেখার সময়সূচী"
                  : "Doctor Visiting Days Directory"}
              </h3>
              <div className="mt-2 divide-y divide-slate-200">
                {DOCTORS_DATA.map((doc) => {
                  const isActive = doc.id === selectedDoctorId;
                  return (
                    <div
                      key={doc.id}
                      onClick={() => handleSelectDoctor(doc.id)}
                      className={`py-3 px-2 -mx-2 rounded-xl flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                        isActive ? "bg-[#F0F9FF]" : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-[#0B1F3A] truncate">
                          {isBn ? doc.nameBn : doc.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          {isBn ? doc.scheduleBn : doc.schedule}
                          {doc.consultationFee && (
                            <span className="font-mono-tabular font-semibold text-[#0891B2]">
                              {" "}
                              ·{" "}
                              {isBn
                                ? `ফি: ${doc.consultationFeeBn}`
                                : `Fee: ${doc.consultationFee}`}
                            </span>
                          )}
                        </p>
                      </div>

                      <a
                        href={`tel:${doc.contactPhones[0]}`}
                        onClick={(e) => e.stopPropagation()}
                        className="px-2.5 py-1.5 rounded-lg bg-[#0B1F3A] hover:bg-[#16325B] text-white text-xs font-mono-tabular font-semibold inline-flex items-center gap-1 shrink-0 transition-colors"
                      >
                        <PhoneCall className="w-3 h-3 text-[#22D3EE]" />
                        {doc.contactPhones[0]}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Walk-In & Telephone Inquiry Desk */}
            <div className="bg-[#0B1F3A] text-white rounded-2xl p-6 sm:p-7 border border-[#1E3A5F]">
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
                      ? "সরাসরি চেম্বার ও ল্যাব ডেস্ক"
                      : "Direct Chamber & Diagnostic Assistance"}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    {isBn
                      ? "ফোনে যোগাযোগ ও ক্লিনিকের ঠিকানা"
                      : "Walk-In & Telephone Inquiry Desk"}
                  </h3>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 space-y-3 font-mono-tabular text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-300 font-sans">
                    {isBn ? "প্রধান হেল্পলাইন নম্বর:" : "Primary Clinic Helpline:"}
                  </span>
                  <a
                    href={`tel:${CLINIC_INFO.primaryPhone}`}
                    className="font-bold text-[#22D3EE] hover:underline inline-flex items-center gap-1.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    +91 {CLINIC_INFO.primaryPhone}
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-300 font-sans">
                    {isBn ? "চেম্বার ও টেস্ট সিরিয়াল:" : "Chamber & Test Desk:"}
                  </span>
                  <a
                    href="tel:9707916094"
                    className="font-semibold text-white hover:text-[#22D3EE]"
                  >
                    +91 9707916094
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-300 font-sans">
                    {isBn ? "জরুরি চেম্বার লাইন:" : "Emergency Chamber Line:"}
                  </span>
                  <a
                    href="tel:7002336326"
                    className="font-semibold text-white hover:text-[#22D3EE]"
                  >
                    +91 7002336326
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-300 font-sans">
                    {isBn ? "গাইনি বিভাগ হেল্পলাইন:" : "Gynecology Desk Line:"}
                  </span>
                  <a
                    href="tel:9707169470"
                    className="font-semibold text-white hover:text-[#22D3EE]"
                  >
                    +91 9707169470
                  </a>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 space-y-2 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                  <span>
                    {isBn
                      ? `${CLINIC_INFO.addressLine1Bn}, ${CLINIC_INFO.addressLine2Bn}`
                      : `${CLINIC_INFO.addressLine1}, ${CLINIC_INFO.addressLine2}`}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                  <span>
                    {isBn
                      ? CLINIC_INFO.hours.pharmacyBn
                      : CLINIC_INFO.hours.pharmacy}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reusable Toast Notification on Appointment Submission */}
      <ToastNotification
        isOpen={toastOpen}
        onClose={() => setToastOpen(false)}
        title={toastContent.title}
        message={toastContent.message}
        subtext={toastContent.subtext}
        variant="success"
        actionLabel={
          isBn ? "হোয়াটসঅ্যাপে স্লট পাঠান" : "Send on WhatsApp"
        }
        actionHref={whatsappRequestUrl}
      />
    </section>
  );
};

