import test from "node:test";
import assert from "node:assert/strict";
import {
  normalizeIndianPhone,
  isValidIndianMobile,
  checkDoctorScheduleCompatibility,
  getDoctorConsultationTimeSlots,
  findNextAvailableDateForDoctor,
  filterDoctorsBySpecialty,
  filterFaqs,
  toggleLanguage,
  toggleThemeMode,
  getThemeToggleLabel,
  buildUpiPaymentUri,
  buildGoogleMapsPlaceEmbedUrl,
  buildGoogleMapsDirectionsUrl,
  buildGoogleMapsSearchUrl,
  getClinicGoogleMapsLinks,
  getBrandIdentityHeader,
  getDirectCallLink,
  getDiagnosticIconKey,
  filterDiagnosticsByQuery,
  buildPaymentConfirmationSummary,
  buildAppointmentSuccessToast,
  GMP_ATTRIBUTION_ID,
} from "./clinicLogic";
import {
  DOCTORS_DATA,
  DIAGNOSTICS_DATA,
  FAQ_DATA,
  CLINIC_INFO,
  PAYMENT_INFO,
} from "../data/clinicData";

test("normalizeIndianPhone and isValidIndianMobile handle Indian phone numbers accurately", () => {
  assert.equal(normalizeIndianPhone("+91 88224-80027"), "8822480027");
  assert.equal(normalizeIndianPhone("09707916094"), "9707916094");
  assert.equal(isValidIndianMobile("8822480027"), true);
  assert.equal(isValidIndianMobile("+91 70023 36326"), true);
  assert.equal(isValidIndianMobile("1234567890"), false);
  assert.equal(isValidIndianMobile("88224"), false);
});

test("checkDoctorScheduleCompatibility enforces Wed, Fri, Sat schedule for Dr. Wasim Anzum Laskar", () => {
  const drWasim = DOCTORS_DATA.find((d) => d.name.includes("Wasim Anzum"))!;
  // 2026-11-18 is a Wednesday
  const wedResult = checkDoctorScheduleCompatibility(drWasim, "2026-11-18");
  assert.equal(wedResult.compatible, true);

  // 2026-11-16 is a Monday
  const monResult = checkDoctorScheduleCompatibility(drWasim, "2026-11-16");
  assert.equal(monResult.compatible, false);
  assert.match(monResult.message, /Wednesday, Friday, and Saturday/);
});

test("DOCTORS_DATA and DIAGNOSTICS_DATA contain official photos, Dr. Haneef Mohammed credentials, and consultation fee", () => {
  assert.equal(DOCTORS_DATA.length, 6);
  for (const doc of DOCTORS_DATA) {
    assert.ok(
      doc.photoUrl.startsWith("/assets/doctors/") ||
        doc.photoUrl.startsWith("/assets/aistudio/")
    );
    assert.ok(doc.nameBn.length > 0);
  }

  const drHaneef = DOCTORS_DATA.find((d) => d.id === "dr-haneef-mohammed")!;
  assert.ok(drHaneef);
  assert.equal(drHaneef.name, "Dr. Haneef Mohammed");
  assert.equal(drHaneef.qualifications, "MBBS, PGDMCH (GMCH), PGDMH (TMCH)");
  assert.equal(drHaneef.registration, "Regd. No. AMC-22188");
  assert.equal(drHaneef.schedule, "Contact for information");
  assert.equal(drHaneef.consultationFee, "₹500 (500 Rupees)");
  assert.equal(drHaneef.consultationFeeBn, "₹৫০০ (৫০০ টাকা)");
  assert.equal(
    drHaneef.photoUrl,
    "/assets/aistudio/Screenshot_2026-11-17_030953_55749339.png"
  );

  const haneefSched = checkDoctorScheduleCompatibility(drHaneef, "2026-11-18");
  assert.equal(haneefSched.compatible, true);
  assert.match(haneefSched.message, /Contact for information/);

  assert.equal(DIAGNOSTICS_DATA.length, 5);
  for (const testItem of DIAGNOSTICS_DATA) {
    assert.ok(testItem.photoUrl.startsWith("/assets/diagnostics/"));
    assert.ok(testItem.nameBn.length > 0);
  }
});

test("filterDoctorsBySpecialty filters the 6 AXON Healthcare doctors in both English and Bengali", () => {
  const all = filterDoctorsBySpecialty(DOCTORS_DATA, "All", "");
  assert.equal(all.length, 6);

  const emergency = filterDoctorsBySpecialty(DOCTORS_DATA, "Emergency Medicine", "");
  assert.equal(emergency.length, 3);

  const gyne = filterDoctorsBySpecialty(DOCTORS_DATA, "Gynecology", "");
  assert.equal(gyne.length, 2);

  const haneefSearch = filterDoctorsBySpecialty(DOCTORS_DATA, "All", "Haneef");
  assert.equal(haneefSearch.length, 1);
  assert.equal(haneefSearch[0].name, "Dr. Haneef Mohammed");
});

test("filterFaqs and toggleLanguage support bilingual English and Bengali workflows", () => {
  const allFaqs = filterFaqs(FAQ_DATA, "All");
  assert.equal(allFaqs.length, 5);

  const prepFaqs = filterFaqs(FAQ_DATA, "Diagnostic Preparation");
  assert.equal(prepFaqs.length, 2);

  const bnSearch = filterFaqs(FAQ_DATA, "All", "সনোগ্রাফি");
  assert.equal(bnSearch.length, 1);
  assert.equal(bnSearch[0].id, "faq-diagnostic-sonography-prep");

  assert.equal(toggleLanguage("en"), "bn");
  assert.equal(toggleLanguage("bn"), "en");
});

test("PAYMENT_INFO and buildUpiPaymentUri recognize Abdul Jabbar Laskar (jabarhkd@okaxis) and official logo", () => {
  assert.equal(PAYMENT_INFO.payeeName, "Abdul Jabbar Laskar");
  assert.equal(PAYMENT_INFO.upiId, "jabarhkd@okaxis");
  assert.ok(CLINIC_INFO.logoUrl.includes("WhatsApp_Image_2026-11-16_at_5.19.29_PM"));
  assert.ok(CLINIC_INFO.heroImageUrl.startsWith("/assets/clinic/"));
  assert.ok(CLINIC_INFO.pharmacyImageUrl.startsWith("/assets/clinic/"));

  const uri = buildUpiPaymentUri({
    upiId: PAYMENT_INFO.upiId,
    payeeName: PAYMENT_INFO.payeeName,
    note: "AXON Healthcare Consultation",
  });
  assert.equal(
    uri,
    "upi://pay?pa=jabarhkd%40okaxis&pn=Abdul%20Jabbar%20Laskar&tn=AXON%20Healthcare%20Consultation&cu=INR"
  );
});

test("buildGoogleMapsPlaceEmbedUrl and buildGoogleMapsDirectionsUrl enforce gmp_mcp_codeassist_v1_aistudio attribution", () => {
  assert.equal(GMP_ATTRIBUTION_ID, "gmp_mcp_codeassist_v1_aistudio");
  const embedUrl = buildGoogleMapsPlaceEmbedUrl(
    "TEST_KEY",
    "Lala Road, Near S.K. Roy Civil Hospital, Hailakandi, Assam",
    "bn"
  );
  assert.ok(embedUrl.includes("solution_id=gmp_mcp_codeassist_v1_aistudio"));
  assert.ok(embedUrl.includes("language=bn"));
  assert.ok(embedUrl.includes("region=IN"));

  const dirUrl = buildGoogleMapsDirectionsUrl(
    "AXON Healthcare, Lala Road, Near S.K. Roy Civil Hospital, Hailakandi, Assam"
  );
  assert.ok(dirUrl.startsWith("https://www.google.com/maps/dir/?api=1&destination="));

  const searchUrl = buildGoogleMapsSearchUrl(
    "AXON Healthcare, Lala Road, Near S.K. Roy Civil Hospital, Hailakandi, Assam"
  );
  assert.ok(searchUrl.startsWith("https://www.google.com/maps/search/?api=1&query="));

  const links = getClinicGoogleMapsLinks(CLINIC_INFO, "en");
  assert.ok(links.searchUrl.includes("Hailakandi"));
  assert.ok(links.directionsUrl.includes("Hailakandi"));
  assert.equal(links.traceLabel, "Trace Route on Google Maps");
});

test("getBrandIdentityHeader returns bilingual AXON Healthcare brand name and official logo for the opening page", () => {
  const enBrand = getBrandIdentityHeader(CLINIC_INFO, "en");
  assert.equal(enBrand.brandNamePrimary, "AXON Healthcare");
  assert.equal(enBrand.brandNameSecondary, "অ্যাক্সন হেলথকেয়ার");
  assert.equal(enBrand.headline, "Your Health, Our Priority");
  assert.equal(
    enBrand.logoUrl,
    "/assets/aistudio/WhatsApp_Image_2026-11-16_at_5.19.29_PM_57aff031.jpeg"
  );

  const bnBrand = getBrandIdentityHeader(CLINIC_INFO, "bn");
  assert.equal(bnBrand.brandNamePrimary, "অ্যাক্সন হেলথকেয়ার");
  assert.equal(bnBrand.brandNameSecondary, "AXON Healthcare");
  assert.equal(bnBrand.headline, "আপনার স্বাস্থ্য, আমাদের অগ্রাধিকার");
});

test("getDirectCallLink generates tel:8822480027 link and bilingual Call Now label", () => {
  const enCall = getDirectCallLink(CLINIC_INFO.primaryPhone, "en");
  assert.equal(enCall.href, "tel:8822480027");
  assert.equal(enCall.label, "Call Now");
  assert.equal(enCall.phoneDisplay, "8822480027");

  const bnCall = getDirectCallLink(CLINIC_INFO.primaryPhone, "bn");
  assert.equal(bnCall.href, "tel:8822480027");
  assert.equal(bnCall.label, "এখনই কল করুন");
});

test("getDiagnosticIconKey maps each diagnostic service to a distinct icon key", () => {
  assert.equal(getDiagnosticIconKey("digital-x-ray"), "xray-scan");
  assert.equal(getDiagnosticIconKey("3d-sonography"), "sonography-waves");
  assert.equal(getDiagnosticIconKey("blood-tests"), "blood-droplets");
  assert.equal(getDiagnosticIconKey("ecg"), "ecg-heart-pulse");
  assert.equal(getDiagnosticIconKey("bone-joint-diagnostics"), "orthopedic-bone");

  const uniqueIcons = new Set(DIAGNOSTICS_DATA.map((d) => getDiagnosticIconKey(d.id)));
  assert.equal(uniqueIcons.size, DIAGNOSTICS_DATA.length);
});

test("buildPaymentConfirmationSummary constructs dynamic UPI notes and WhatsApp confirmation links", () => {
  const res = buildPaymentConfirmationSummary({
    upiId: PAYMENT_INFO.upiId,
    payeeName: PAYMENT_INFO.payeeName,
    whatsappNumber: PAYMENT_INFO.whatsappNumber,
    purpose: "Diagnostic Lab Test",
    specificItem: "Digital X-Ray",
    patientName: "Rahul Das",
    utrReference: "432109876543",
    language: "en",
  });

  assert.equal(
    res.upiNote,
    "AXON Healthcare - Diagnostic Lab Test - Digital X-Ray - Rahul Das"
  );
  assert.ok(res.upiUri.includes("pa=jabarhkd%40okaxis"));
  assert.ok(res.upiUri.includes("Digital%20X-Ray"));
  assert.ok(res.whatsappUrl.startsWith("https://wa.me/918822480027?text="));
  assert.match(res.summaryLine, /Diagnostic Lab Test · Digital X-Ray · Rahul Das · Ref: 432109876543/);
});

test("filterDiagnosticsByQuery filters diagnostic services by keywords like X-Ray and Blood", () => {
  const all = filterDiagnosticsByQuery(DIAGNOSTICS_DATA, "");
  assert.equal(all.length, 5);

  const xrayMatches = filterDiagnosticsByQuery(DIAGNOSTICS_DATA, "X-Ray");
  assert.equal(xrayMatches.length, 2);
  assert.equal(xrayMatches[0].id, "digital-x-ray");
  assert.equal(xrayMatches[1].id, "bone-joint-diagnostics");

  const bloodMatches = filterDiagnosticsByQuery(DIAGNOSTICS_DATA, "Blood");
  assert.equal(bloodMatches.length, 1);
  assert.equal(bloodMatches[0].id, "blood-tests");

  const bnBloodMatches = filterDiagnosticsByQuery(DIAGNOSTICS_DATA, "রক্ত পরীক্ষা");
  assert.equal(bnBloodMatches.length, 1);
  assert.equal(bnBloodMatches[0].id, "blood-tests");

  const noMatches = filterDiagnosticsByQuery(DIAGNOSTICS_DATA, "nonexistent-test-xyz");
  assert.equal(noMatches.length, 0);
});

test("getDoctorConsultationTimeSlots and findNextAvailableDateForDoctor handle doctor consultation schedules", () => {
  const drWasim = DOCTORS_DATA.find((d) => d.name.includes("Wasim Anzum"))!;
  // 2026-11-16 is Monday (incompatible for Dr. Wasim)
  const monSlots = getDoctorConsultationTimeSlots(drWasim, "2026-11-16");
  assert.equal(monSlots.length, 6);
  assert.equal(monSlots.every((s) => !s.available), true);

  // Next available date from Monday 2026-11-16 for Dr. Wasim is Wednesday 2026-11-18
  const nextAvail = findNextAvailableDateForDoctor(drWasim, "2026-11-16");
  assert.equal(nextAvail, "2026-11-18");

  const wedSlots = getDoctorConsultationTimeSlots(drWasim, nextAvail);
  assert.equal(wedSlots.length, 6);
  assert.equal(wedSlots.every((s) => s.available), true);
  assert.equal(wedSlots[0].time, "10:00 AM – 11:00 AM");
});

test("toggleThemeMode and getThemeToggleLabel handle light and dark mode switching", () => {
  assert.equal(toggleThemeMode("light"), "dark");
  assert.equal(toggleThemeMode("dark"), "light");

  const lightInfoEn = getThemeToggleLabel("light", "en");
  assert.equal(lightInfoEn.label, "Dark");
  assert.match(lightInfoEn.ariaLabel, /Switch to dark mode/);

  const darkInfoEn = getThemeToggleLabel("dark", "en");
  assert.equal(darkInfoEn.label, "Light");
  assert.match(darkInfoEn.ariaLabel, /Switch to light mode/);

  const lightInfoBn = getThemeToggleLabel("light", "bn");
  assert.equal(lightInfoBn.label, "ডার্ক মোড");
});

test("buildAppointmentSuccessToast formats bilingual appointment confirmation toast messages", () => {
  const enToast = buildAppointmentSuccessToast(
    {
      doctorName: "Dr. Haneef Mohammed",
      doctorNameBn: "ডাঃ হানিফ মোহাম্মদ",
      dateStr: "2026-11-18",
      timeSlot: "10:00 AM – 11:00 AM",
      timeSlotBn: "সকাল ১০:০০ – ১১:০০",
      patientName: "Ananya Roy",
      contactPhone: "8822480027",
      consultationFee: "₹500 (500 Rupees)",
      consultationFeeBn: "₹৫০০ (৫০০ টাকা)",
    },
    "en"
  );
  assert.equal(enToast.title, "Appointment Slot Submitted Successfully");
  assert.match(enToast.message, /Ananya Roy/);
  assert.match(enToast.message, /Dr\. Haneef Mohammed/);
  assert.match(enToast.message, /₹500 \(500 Rupees\)/);

  const bnToast = buildAppointmentSuccessToast(
    {
      doctorName: "Dr. Haneef Mohammed",
      doctorNameBn: "ডাঃ হানিফ মোহাম্মদ",
      dateStr: "2026-11-18",
      timeSlot: "10:00 AM – 11:00 AM",
      timeSlotBn: "সকাল ১০:০০ – ১১:০০",
      contactPhone: "8822480027",
      consultationFee: "₹500 (500 Rupees)",
      consultationFeeBn: "₹৫০০ (৫০০ টাকা)",
    },
    "bn"
  );
  assert.equal(bnToast.title, "অ্যাপয়েন্টমেন্ট স্লট সফলভাবে জমা হয়েছে");
  assert.match(bnToast.message, /ডাঃ হানিফ মোহাম্মদ/);
  assert.match(bnToast.message, /₹৫০০/);
});










