export type Language = "en" | "bn";

export interface LocalizedText {
  en: string;
  bn: string;
}

export interface DoctorProfile {
  id: string;
  name: string;
  nameBn: string;
  specialty: string;
  specialtyBn: string;
  specialtyKey: "Emergency Medicine" | "Orthopedic" | "Gynecology" | "Diabetes";
  qualifications: string;
  qualificationsBn: string;
  hospital: string;
  hospitalBn: string;
  schedule: string;
  scheduleBn: string;
  registration: string;
  roleSummary: string;
  roleSummaryBn: string;
  focusAreas: string[];
  focusAreasBn: string[];
  availableDays: string[];
  contactPhones: string[];
  photoUrl: string;
  imageClassName?: string;
  posterPageNumber: number;
  posterUrl?: string;
  consultationFee?: string;
  consultationFeeBn?: string;
}

export interface DiagnosticService {
  id: string;
  name: string;
  nameBn: string;
  category: string;
  categoryBn: string;
  turnaroundTime: string;
  turnaroundTimeBn: string;
  preparation: string;
  preparationBn: string;
  description: string;
  descriptionBn: string;
  parameters: string[];
  parametersBn: string[];
  photoUrl: string;
}

export interface PharmacyCategoryHighlight {
  id: string;
  name: string;
  nameBn: string;
  composition: string;
  compositionBn: string;
  category: string;
  categoryBn: string;
  dispensingNote: string;
  dispensingNoteBn: string;
  requiresRx: boolean;
}

export type FaqCategory =
  | "All"
  | "Appointment & Chambers"
  | "Diagnostic Preparation"
  | "Prescription & Pharmacy";

export interface FaqItem {
  id: string;
  category: Exclude<FaqCategory, "All">;
  categoryBn: string;
  question: string;
  questionBn: string;
  answer: string;
  answerBn: string;
  keyTakeaway: string;
  keyTakeawayBn: string;
  actionLabel?: string;
  actionLabelBn?: string;
  actionTarget?: "doctors" | "pharmacy" | "diagnostics" | "payments" | "contact";
}

export const CLINIC_INFO = {
  name: "AXON Healthcare",
  nameBn: "অ্যাক্সন হেলথকেয়ার",
  tagline: "Health · Care · Trust",
  taglineBn: "স্বাস্থ্য · সেবা · আস্থা",
  headline: "Your Health, Our Priority",
  headlineBn: "আপনার স্বাস্থ্য, আমাদের অগ্রাধিকার",
  addressLine1: "Lala Road, Near S.K. Roy Civil Hospital",
  addressLine1Bn: "লালা রোড, এস.কে. রায় সিভিল হাসপাতালের নিকটে",
  addressLine2: "Hailakandi, Assam – 788151",
  addressLine2Bn: "হাইলাকান্দি, আসাম – ৭৮৮১৫১",
  primaryPhone: "8822480027",
  secondaryPhones: ["9707916094", "7002336326", "9707169470"],
  logoUrl: "/assets/aistudio/WhatsApp_Image_2026-11-16_at_5.19.29_PM_57aff031.jpeg",
  heroImageUrl: "/assets/clinic/hero-diagnostic-wing.jpg",
  pharmacyImageUrl: "/assets/clinic/pharmacy-counter.jpg",
  hours: {
    pharmacy: "7:00 AM – 10:30 PM (Daily)",
    pharmacyBn: "সকাল ৭:০০ – রাত ১০:৩০ (প্রতিদিন)",
    diagnostics: "7:30 AM – 8:30 PM (Mon – Sun)",
    diagnosticsBn: "সকাল ৭:৩০ – রাত ৮:৩০ (সোম – রবি)",
    opdChamber: "9:00 AM – 8:00 PM (As per Doctor Schedule)",
    opdChamberBn: "সকাল ৯:০০ – রাত ৮:০০ (চিকিৎসকের সময়সূচী অনুযায়ী)",
  },
};

export const PAYMENT_INFO = {
  payeeName: "Abdul Jabbar Laskar",
  payeeNameBn: "আব্দুল জব্বার লস্কর",
  payeeInitial: "A",
  upiId: "jabarhkd@okaxis",
  bankHandle: "OKAxis (Google Pay / All UPI Apps)",
  bankHandleBn: "ওকে-অ্যাক্সিস (গুগল পে ও সকল ইউপিআই অ্যাপ)",
  qrCardImageUrl: "/assets/payments/upi-qr-card.jpg",
  qrSquareImageUrl: "/assets/payments/upi-qr-square.jpg",
  qrOriginalImageUrl: "/assets/aistudio/WhatsApp_Image_2026-11-16_at_5.18.00_PM_9ad89ac7.jpeg",
  whatsappNumber: "918822480027",
  supportedApps: ["Google Pay (GPay)", "PhonePe", "Paytm", "BHIM UPI", "Amazon Pay"],
};

export const DOCTORS_DATA: DoctorProfile[] = [
  {
    id: "dr-swarnadeep-dutta",
    name: "Dr. Swarnadeep Dutta",
    nameBn: "ডাঃ স্বর্ণদীপ দত্ত",
    specialty: "Emergency Medicine Specialist",
    specialtyBn: "জরুরি বিভাগ ও মেডিসিন বিশেষজ্ঞ",
    specialtyKey: "Emergency Medicine",
    qualifications: "MBBS, Emergency Medicine",
    qualificationsBn: "এমবিবিএস, ইমার্জেন্সি মেডিসিন",
    hospital: "S.K. Roy Civil Hospital, Hailakandi",
    hospitalBn: "এস.কে. রায় সিভিল হাসপাতাল, হাইলাকান্দি",
    schedule: "Call to confirm",
    scheduleBn: "ফোনে সময় জেনে নিন",
    registration: "Regd. No. : 24470 (AMC)",
    roleSummary: "M & H Officer - I, S.K. Roy Civil Hospital, Hailakandi",
    roleSummaryBn: "এম অ্যান্ড এইচ অফিসার - ১, এস.কে. রায় সিভিল হাসপাতাল, হাইলাকান্দি",
    focusAreas: [
      "Emergency Medicine & Acute Care",
      "Critical Stabilization",
      "General Medical Consultations",
    ],
    focusAreasBn: [
      "জরুরি চিকিৎসা ও ট্রমা কেয়ার",
      "সংকটাপন্ন রোগীর প্রাথমিক চিকিৎসা",
      "জেনারেল মেডিসিন পরামর্শ",
    ],
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    contactPhones: ["8822480027", "7002336326"],
    photoUrl: "/assets/doctors/dr-swarnadeep-dutta.png",
    posterPageNumber: 1,
  },
  {
    id: "dr-mohammad-quasim-laskar",
    name: "Dr. Mohammad Quasim Laskar",
    nameBn: "ডাঃ মোহাম্মদ কাসিম লস্কর",
    specialty: "Orthopedic Specialist",
    specialtyBn: "হাড় ও জয়েন্ট রোগ বিশেষজ্ঞ (অর্থোপেডিক)",
    specialtyKey: "Orthopedic",
    qualifications: "MBBS, MS ORTHO • Specialist",
    qualificationsBn: "এমবিবিএস, এমএস (অর্থো) • বিশেষজ্ঞ",
    hospital: "Regd. No. - 25300 SMCH",
    hospitalBn: "রেজিঃ নং - ২৫৩০০ (এসএমসিএইচ)",
    schedule: "Everyday",
    scheduleBn: "প্রতিদিন রোগী দেখা হয়",
    registration: "Regd. No. - 25300 SMCH",
    roleSummary: "Consultant Orthopedic & Joint Replacement Specialist",
    roleSummaryBn: "কনসালট্যান্ট অর্থোপেডিক ও জয়েন্ট রিপ্লেসমেন্ট বিশেষজ্ঞ",
    focusAreas: [
      "Bone & Joint Problems",
      "Fractures & Trauma",
      "Arthritis & Back Pain",
      "Sports Injuries & Joint Replacement",
    ],
    focusAreasBn: [
      "হাড় ও জয়েন্টের সমস্যা",
      "হাড় ভাঙা ও আঘাতজনিত চিকিৎসা",
      "বাত ও কোমর ব্যথা",
      "স্পোর্টস ইনজুরি ও জয়েন্ট রিপ্লেসমেন্ট",
    ],
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    contactPhones: ["9707916094", "8822480027"],
    photoUrl: "/assets/doctors/dr-mohammad-quasim-laskar.png",
    posterPageNumber: 2,
  },
  {
    id: "dr-achintam-dash",
    name: "Dr. Achintam Dash",
    nameBn: "ডাঃ অচিন্তম দাশ",
    specialty: "Emergency Medicine / Medicine",
    specialtyBn: "ইমার্জেন্সি মেডিসিন ও জেনারেল মেডিসিন",
    specialtyKey: "Emergency Medicine",
    qualifications: "MD (Kayachikitsa) Medicine",
    qualificationsBn: "এমডি (কায়চিকিৎসা) মেডিসিন",
    hospital: "ESIC Hospital, Hailakandi",
    hospitalBn: "ইএসআইসি (ESIC) হাসপাতাল, হাইলাকান্দি",
    schedule: "Everyday",
    scheduleBn: "প্রতিদিন রোগী দেখা হয়",
    registration: "Regd. No. - 0991 SCIM",
    roleSummary: "Medical Health Officer I/C, ESIC Hospital, Hailakandi",
    roleSummaryBn: "মেডিকেল হেলথ অফিসার ইন-চার্জ, ইএসআইসি হাসপাতাল, হাইলাকান্দি",
    focusAreas: [
      "Internal & General Medicine",
      "Chronic Disease Management",
      "Fever, Respiratory & Gastric Care",
    ],
    focusAreasBn: [
      "জেনারেল ও ইন্টারনাল মেডিসিন",
      "দীর্ঘমেয়াদী রোগের চিকিৎসা",
      "জ্বর, শ্বাসকষ্ট ও পেটের সমস্যা",
    ],
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    contactPhones: ["9707916094", "8822480027"],
    photoUrl: "/assets/doctors/dr-achintam-dash.png",
    posterPageNumber: 3,
  },
  {
    id: "dr-g-lansinlu-rongmei",
    name: "Dr. G. Lansinlu Rongmei",
    nameBn: "ডাঃ জি. লানসিনলু রংমেই",
    specialty: "Gynecology & Obstetrics (স্ত্রী রোগ বিশেষজ্ঞ)",
    specialtyBn: "স্ত্রী রোগ ও প্রসূতি বিশেষজ্ঞ (Gyne Doctor)",
    specialtyKey: "Gynecology",
    qualifications: "MBBS, MS, O & G",
    qualificationsBn: "এমবিবিএস, এমএস (ও অ্যান্ড জি)",
    hospital: "S.K. Roy Civil Hospital, Hailakandi",
    hospitalBn: "এস.কে. রায় সিভিল হাসপাতাল, হাইলাকান্দি",
    schedule: "Call to confirm",
    scheduleBn: "ফোনে সময় জেনে নিন",
    registration: "Regd. 27200 (AMC) GMCH",
    roleSummary: "Specialist Gynecology & Obstetrics Doctor (স্ত্রী রোগ বিশেষজ্ঞ)",
    roleSummaryBn: "বিশেষজ্ঞ স্ত্রী রোগ ও প্রসূতি চিকিৎসক",
    focusAreas: [
      "Pregnancy & Antenatal Checkups",
      "High-Risk Obstetrics Care",
      "Gynecological Disorders & PCOD",
      "Women's Reproductive Health",
    ],
    focusAreasBn: [
      "গর্ভকালীন ও প্রসূতি সেবা",
      "ঝুঁকিপূর্ণ গর্ভধারণের বিশেষ পরিচর্যা",
      "স্ত্রী রোগ ও হরমোনজনিত সমস্যা",
      "মহিলাদের স্বাস্থ্য ও বন্ধ্যাত্ব পরামর্শ",
    ],
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    contactPhones: ["9707916094", "9707169470"],
    photoUrl: "/assets/doctors/dr-g-lansinlu-rongmei.png",
    posterPageNumber: 4,
  },
  {
    id: "dr-diadel-wasim-anzum-laskar",
    name: "Dr. Wasim Anzum Laskar",
    nameBn: "ডাঃ ওয়াসিম আনজুম লস্কর",
    specialty: "Emergency Medicine & Diabetes Specialist",
    specialtyBn: "ইমার্জেন্সি মেডিসিন ও ডায়াবেটিস বিশেষজ্ঞ",
    specialtyKey: "Diabetes",
    qualifications: "MBBS, MEM, Dip. in Diabetes",
    qualificationsBn: "এমবিবিএস, এমইএম, ডিপ্লোমা ইন ডায়াবেটিস",
    hospital: "Regd. No. - 22802 AMC",
    hospitalBn: "রেজিঃ নং - ২২৮০২ (এএমসি)",
    schedule: "Wednesday, Friday, and Saturday",
    scheduleBn: "বুধবার, শুক্রবার এবং শনিবার",
    registration: "Regd. No. - 22802 AMC",
    roleSummary: "Emergency Medicine & Diabetes Specialist",
    roleSummaryBn: "ইমার্জেন্সি মেডিসিন ও ডায়াবেটিস বিশেষজ্ঞ",
    focusAreas: [
      "Type 1 & Type 2 Diabetes Management",
      "Blood Sugar & Insulin Titration",
      "Diabetic Neuropathy & Foot Care",
      "Hypertension & Emergency Medicine",
    ],
    focusAreasBn: [
      "টাইপ ১ ও টাইপ ২ ডায়াবেটিস নিয়ন্ত্রণ",
      "ব্লাড সুগার ও ইনসুলিন পরামর্শ",
      "ডায়াবেটিক স্নায়ু ও পায়ের যত্ন",
      "উচ্চ রক্তচাপ ও জরুরি চিকিৎসা",
    ],
    availableDays: ["Wed", "Fri", "Sat"],
    contactPhones: ["9707916094", "8822480027"],
    photoUrl: "/assets/doctors/dr-diadel-wasim-anzum-laskar.png",
    posterPageNumber: 5,
  },
  {
    id: "dr-haneef-mohammed",
    name: "Dr. Haneef Mohammed",
    nameBn: "ডাঃ হানিফ মোহাম্মদ",
    specialty: "Obstetrics & Gynaecology (স্ত্রী ও প্রসূতি রোগ বিশেষজ্ঞ)",
    specialtyBn: "প্রসূতি ও স্ত্রী রোগ বিশেষজ্ঞ (Obstetrics & Gynaecology)",
    specialtyKey: "Gynecology",
    qualifications: "MBBS, PGDMCH (GMCH), PGDMH (TMCH)",
    qualificationsBn: "এমবিবিএস, পিজিডিএমসিএইচ (জিএমসিএইচ), পিজিডিএমএইচ (টিএমসিএইচ)",
    hospital: "S.K. Roy Civil Hospital, Hailakandi · Ex-CDMO, BGR Hospital, Indian Oil Corporation Ltd",
    hospitalBn: "এস.কে. রায় সিভিল হাসপাতাল, হাইলাকান্দি · প্রাক্তন সিডিএমও, বিজিআর হাসপাতাল, ইন্ডিয়ান অয়েল কর্পোরেশন লিঃ",
    schedule: "Contact for information",
    scheduleBn: "তথ্যের জন্য যোগাযোগ করুন",
    registration: "Regd. No. AMC-22188",
    roleSummary: "Senior Medical & Health Officer, S.K. Roy Civil Hospital, Hailakandi (Ex-CDMO, BGR Hospital, IOCL)",
    roleSummaryBn: "সিনিয়র মেডিকেল অ্যান্ড হেলথ অফিসার, এস.কে. রায় সিভিল হাসপাতাল, হাইলাকান্দি (প্রাক্তন সিডিএমও, বিজিআর হাসপাতাল, আইওসিএল)",
    focusAreas: [
      "Obstetrics & Gynaecology Care",
      "Antenatal, Pregnancy & Maternal Health",
      "High-Risk Obstetrics & Postnatal Care",
      "Gynaecological Disorders & Women's Health",
    ],
    focusAreasBn: [
      "প্রসূতি ও স্ত্রী রোগ বিশেষজ্ঞ চিকিৎসা",
      "গর্ভকালীন ও প্রসূতি মাতৃস্বাস্থ্য সেবা",
      "ঝুঁকিপূর্ণ গর্ভধারণ ও প্রসব-পরবর্তী পরিচর্যা",
      "স্ত্রী রোগ ও মহিলাদের স্বাস্থ্য পরামর্শ",
    ],
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    contactPhones: ["8822480027", "9707916094"],
    photoUrl: "/assets/aistudio/Screenshot_2026-11-17_030953_55749339.png",
    imageClassName: "scale-[1.68] origin-[center_26%]",
    posterUrl: "/assets/aistudio/WhatsApp_Image_2026-11-16_at_6.01.24_PM_c011513f.jpeg",
    posterPageNumber: 6,
    consultationFee: "₹500 (500 Rupees)",
    consultationFeeBn: "₹৫০০ (৫০০ টাকা)",
  },
];

export const DIAGNOSTICS_DATA: DiagnosticService[] = [
  {
    id: "digital-x-ray",
    name: "Digital X-Ray",
    nameBn: "ডিজিটাল এক্স-রে (Digital X-Ray)",
    category: "Radiology & Chest/Bone Imaging",
    categoryBn: "রেডিওলজি ও ইমেজিং",
    turnaroundTime: "Report in 30 Mins",
    turnaroundTimeBn: "৩০ মিনিটে রিপোর্ট প্রদান",
    preparation: "Remove metallic jewelry or accessories over the target scan region.",
    preparationBn: "এক্স-রে করার স্থানে কোনো ধাতব গহনা বা বস্তু থাকলে খুলে রাখুন।",
    description:
      "High-definition, low-radiation computed digital radiography for chest, spine, orthopedic fractures, and joint evaluations.",
    descriptionBn:
      "বুক, মেরুদণ্ড, হাড় ভাঙা এবং জয়েন্টের নিখুঁত পরীক্ষার জন্য আধুনিক ও স্বল্প-রেডিয়েশন ডিজিটাল এক্স-রে ব্যবস্থা।",
    parameters: [
      "Chest PA / AP View",
      "Cervical & Lumbar Spine",
      "Limb & Joint Trauma Series",
      "Printed Film + Digital Report",
    ],
    parametersBn: [
      "চেস্ট (বুক) পিএ / এপি ভিউ",
      "ঘাড় ও কোমরের মেরুদণ্ডের এক্স-রে",
      "হাত-পা ও জয়েন্টের ট্রমা এক্স-রে",
      "প্রিন্টেড ফিল্ম ও ডিজিটাল রিপোর্ট",
    ],
    photoUrl: "/assets/diagnostics/digital-x-ray.png",
  },
  {
    id: "3d-sonography",
    name: "3D Sonography",
    nameBn: "থ্রি-ডি সনোগ্রাফি (3D Sonography / USG)",
    category: "Ultrasound & Fetal Imaging",
    categoryBn: "আল্ট্রাসাউন্ড ও প্রসূতি ইমেজিং",
    turnaroundTime: "Same-Day Reporting",
    turnaroundTimeBn: "একই দিনে রিপোর্ট প্রদান",
    preparation:
      "Full bladder required for pelvic/obstetric scans; 6-hour fasting for upper abdomen.",
    preparationBn:
      "তলপেট বা প্রেগন্যান্সি স্ক্যানের জন্য প্রস্রাবের চাপ থাকা প্রয়োজন; পেটের উপরিভাগের স্ক্যানের জন্য ৬ ঘণ্টা খালি পেটে থাকুন।",
    description:
      "Volumetric 3D ultrasound and color Doppler studies for obstetric fetal well-being, abdominal organs, and pelvic diagnostics.",
    descriptionBn:
      "গর্ভস্থ শিশুর শারীরিক গঠন, পেটের অভ্যন্তরীণ অঙ্গ এবং স্ত্রী রোগ নির্ণয়ের জন্য অত্যাধুনিক থ্রি-ডি আল্ট্রাসাউন্ড ও কালার ডপলার।",
    parameters: [
      "Obstetric Fetal Well-being & 3D Scan",
      "Whole Abdomen & Pelvis USG",
      "Color Doppler Study",
      "Follicular & Gynecological Scan",
    ],
    parametersBn: [
      "গর্ভস্থ শিশুর থ্রি-ডি স্ক্যান",
      "হোল অ্যাবডোমেন ও পেলভিস আল্ট্রাসাউন্ড",
      "কালার ডপলার স্টাডি",
      "ফলিকুলার ও গাইনি আল্ট্রাসাউন্ড",
    ],
    photoUrl: "/assets/diagnostics/3d-sonography.png",
  },
  {
    id: "blood-tests",
    name: "Blood Tests",
    nameBn: "রক্ত পরীক্ষা (Blood Tests & Pathology)",
    category: "Clinical Pathology & Biochemistry",
    categoryBn: "ক্লিনিক্যাল প্যাথলজি ও বায়োকেমিস্ট্রি",
    turnaroundTime: "2 – 6 Hours",
    turnaroundTimeBn: "২ – ৬ ঘণ্টার মধ্যে রিপোর্ট",
    preparation:
      "8–10 hours overnight fasting required for Fasting Blood Sugar & Lipid Profile.",
    preparationBn:
      "ফাস্টিং ব্লাড সুগার এবং লিপিড প্রোফাইল পরীক্ষার জন্য রাতে ৮–১০ ঘণ্টা খালি পেটে থাকা আবশ্যক।",
    description:
      "Automated hematology, HbA1c diabetes profiling, thyroid function panels, liver/kidney function tests, and complete fever panels.",
    descriptionBn:
      "অটোমেটেড মেশিনে সিবিসি, ডায়াবেটিস (HbA1c), থাইরয়েড, লিভার ও কিডনি ফাংশন টেস্ট এবং সব ধরনের রক্ত পরীক্ষা করা হয়।",
    parameters: [
      "Complete Blood Count (CBC & ESR)",
      "HbA1c & Fasting/PP Blood Glucose",
      "Lipid, Liver (LFT) & Renal (KFT) Panels",
      "Thyroid Profile (T3, T4, TSH)",
    ],
    parametersBn: [
      "কমপ্লিট ব্লাড কাউন্ট (CBC ও ESR)",
      "ডায়াবেটিস পরীক্ষা (HbA1c ও ব্লাড সুগার)",
      "লিপিড প্রোফাইল, লিভার (LFT) ও কিডনি (KFT) টেস্ট",
      "থাইরয়েড হরমোন পরীক্ষা (T3, T4, TSH)",
    ],
    photoUrl: "/assets/diagnostics/blood-tests.png",
  },
  {
    id: "ecg",
    name: "ECG",
    nameBn: "ইসিজি (12-Lead Digital ECG)",
    category: "Cardiology Screening",
    categoryBn: "হৃদরোগ ও কার্ডিয়াক স্ক্রিনিং",
    turnaroundTime: "Instant Printout (15 Mins)",
    turnaroundTimeBn: "১৫ মিনিটে তাৎক্ষণিক রিপোর্ট",
    preparation:
      "Rest quietly for 10 minutes prior to recording; avoid heavy exertion immediately before test.",
    preparationBn:
      "ইসিজি করার আগে অন্তত ১০ মিনিট বিশ্রামে থাকুন এবং অতিরিক্ত শারীরিক পরিশ্রম এড়িয়ে চলুন।",
    description:
      "12-lead resting digital electrocardiography for rapid assessment of cardiac rhythm, chest pain, hypertension, and pre-operative fitness.",
    descriptionBn:
      "বুকে ব্যথা, উচ্চ রক্তচাপ ও হৃদস্পন্দনের ছন্দ পরীক্ষার জন্য নিখুঁত ১২-লিড ডিজিটাল ইলেকট্রোকার্ডিওগ্রাফি (ECG)।",
    parameters: [
      "12-Lead Resting ECG",
      "Rhythm & Arrhythmia Strip",
      "Immediate Emergency Physician Review",
      "Standardized Thermal Graph Output",
    ],
    parametersBn: [
      "১২-লিড রেস্টিং ইসিজি",
      "হার্ট রিদম ও অ্যারিথমিয়া স্ট্রিপ",
      "ইমার্জেন্সি চিকিৎসকের তাৎক্ষণিক পর্যবেক্ষণ",
      "স্ট্যান্ডার্ড থার্মাল গ্রাফ প্রিন্টআউট",
    ],
    photoUrl: "/assets/diagnostics/ecg.png",
  },
  {
    id: "bone-joint-diagnostics",
    name: "Orthopedic & Joint Diagnostics",
    nameBn: "হাড়, জয়েন্ট ও বাত পরীক্ষা (Orthopedic Screening)",
    category: "Orthopedic & Trauma Evaluation",
    categoryBn: "অর্থোপেডিক ও ট্রমা মূল্যায়ন",
    turnaroundTime: "Same-Day Assessment",
    turnaroundTimeBn: "একই দিনে রিপোর্ট ও মূল্যায়ন",
    preparation:
      "Bring any prior orthopedic X-ray films or discharge summaries for comparison.",
    preparationBn:
      "পূর্ববর্তী কোনো এক্স-রে ফিল্ম বা প্রেসক্রিপশন থাকলে সাথে নিয়ে আসুন।",
    description:
      "Specialized radiographic joint views, uric acid, rheumatoid factor (RA), serum calcium, and Vitamin D3 testing for bone and joint care.",
    descriptionBn:
      "হাড়ের ক্ষয়, বাত, ইউরিক অ্যাসিড, ক্যালসিয়াম ও ভিটামিন ডি-৩ পরীক্ষা এবং জয়েন্টের বিশেষ ডিজিটাল ইমেজিং।",
    parameters: [
      "Knee, Hip & Shoulder Joint Views",
      "Serum Calcium, Phosphorus & Vitamin D3",
      "Rheumatoid Factor (RA) & CRP",
      "Serum Uric Acid (Gout Screening)",
    ],
    parametersBn: [
      "হাঁটু, কোমর ও কাঁধের জয়েন্ট এক্স-রে",
      "ক্যালসিয়াম ও ভিটামিন ডি-৩ পরীক্ষা",
      "রিউমাটয়েড ফ্যাক্টর (RA) ও সিআরপি",
      "সিরাম ইউরিক অ্যাসিড পরীক্ষা",
    ],
    photoUrl: "/assets/diagnostics/bone-joint-scan.png",
  },
];

export const PHARMACY_HIGHLIGHTS: PharmacyCategoryHighlight[] = [
  {
    id: "pharm-diabetes-insulin",
    name: "Diabetes & Cold-Chain Insulin Care",
    nameBn: "ডায়াবেটিস ও ইনসুলিন সংরক্ষণ ব্যবস্থা",
    composition: "Oral Anti-Diabetics, Human Insulins, Pen Needles & Glucometer Strips",
    compositionBn: "ডায়াবেটিসের ওষুধ, ইনসুলিন ভায়েল/পেন এবং গ্লুকোমিটার স্ট্রিপ",
    category: "Metabolic & Endocrine",
    categoryBn: "ডায়াবেটিস ও হরমোন বিভাগ",
    dispensingNote: "Maintained under continuous 2°C–8°C refrigerator cold-chain storage.",
    dispensingNoteBn: "২°–৮° সেলসিয়াস তাপমাত্রায় সম্পূর্ণ কোল্ড-চেইন পদ্ধতিতে সংরক্ষিত।",
    requiresRx: true,
  },
  {
    id: "pharm-ortho-pain",
    name: "Orthopedic, Bone & Joint Formulations",
    nameBn: "হাড়, জয়েন্ট ও ব্যথানাশক ওষুধ",
    composition: "Calcium + Cholecalciferol, Disease-Modifying Anti-Rheumatics, Ortho Supports",
    compositionBn: "ক্যালসিয়াম, ভিটামিন ডি-৩, জয়েন্ট সাপ্লিমেন্ট ও অর্থোপেডিক বেল্ট/ক্রেপ ব্যান্ডেজ",
    category: "Orthopedic Care",
    categoryBn: "অর্থোপেডিক ও ট্রমা কেয়ার",
    dispensingNote: "Available directly at our Lala Road clinic pharmacy counter.",
    dispensingNoteBn: "আমাদের লালা রোড ফার্মেসি কাউন্টারে সর্বদা পাওয়া যায়।",
    requiresRx: false,
  },
  {
    id: "pharm-maternal-gyne",
    name: "Maternal, Antenatal & Gynecology Medicines",
    nameBn: "প্রসূতি ও স্ত্রী রোগের যাবতীয় ওষুধ",
    composition: "Liposomal Iron, Folic Acid, Progesterone Support & Obstetric Care Essentials",
    compositionBn: "আয়রন, ফলিক অ্যাসিড, ক্যালসিয়াম ও গর্ভকালীন প্রয়োজনীয় ওষুধসমূহ",
    category: "Obstetrics & Gynecology",
    categoryBn: "স্ত্রী রোগ ও প্রসূতি বিভাগ",
    dispensingNote: "Authentic batch-verified medicines dispensed as per specialist prescription.",
    dispensingNoteBn: "বিশেষজ্ঞ চিকিৎসকের প্রেসক্রিপশন অনুযায়ী ১০০% আসল ওষুধ প্রদান।",
    requiresRx: true,
  },
  {
    id: "pharm-emergency-cardiac",
    name: "Emergency, Cardiac, Gastric & Acute Care",
    nameBn: "জরুরি বিভাগ, হৃদরোগ ও জেনারেল মেডিসিন",
    composition: "Anti-Hypertensives, Antibiotics, Gastro-Resistant PPIs & Nebulization Respules",
    compositionBn: "রক্তচাপের ওষুধ, অ্যান্টিবায়োটিক, গ্যাস্ট্রিক ও শ্বাসকষ্টের নেবুলাইজার ওষুধ",
    category: "Emergency & Internal Medicine",
    categoryBn: "জরুরি ও জেনারেল মেডিসিন",
    dispensingNote: "Supervised by registered pharmacists from 7:00 AM to 10:30 PM daily.",
    dispensingNoteBn: "রেজিস্টার্ড ফার্মাসিস্টের তত্ত্বাবধানে প্রতিদিন সকাল ৭টা থেকে রাত ১০:৩০টা পর্যন্ত খোলা।",
    requiresRx: true,
  },
];

export const FAQ_DATA: FaqItem[] = [
  {
    id: "faq-booking-confirm-schedule",
    category: "Appointment & Chambers",
    categoryBn: "চেম্বার ও অ্যাপয়েন্টমেন্ট",
    question: "How do I get a serial number or confirm chamber timings for doctors?",
    questionBn: "চিকিৎসকদের সিরিয়াল বা চেম্বারের সময়সূচী কীভাবে জানবো?",
    answer:
      "You can visit AXON Healthcare directly on Lala Road (near S.K. Roy Civil Hospital, Hailakandi) or call our reception desk at 8822480027, 9707916094, or 7002336326 to confirm exact chamber hours and register your patient serial.",
    answerBn:
      "আপনি সরাসরি হাইলাকান্দির লালা রোডে (এস.কে. রায় সিভিল হাসপাতালের নিকটে) আমাদের ক্লিনিকে আসতে পারেন অথবা 8822480027, 9707916094 বা 7002336326 নম্বরে কল করে ডাক্তারবাবুদের চেম্বারের সঠিক সময় জেনে সিরিয়াল লেখাতে পারেন।",
    keyTakeaway:
      "For Dr. G. Lansinlu Rongmei (Gynecology), you can also call 9707916094 or 9707169470 directly.",
    keyTakeawayBn:
      "স্ত্রী রোগ বিশেষজ্ঞ ডাঃ জি. লানসিনলু রংমেই-এর অ্যাপয়েন্টমেন্টের জন্য 9707916094 বা 9707169470 নম্বরে কল করুন।",
    actionLabel: "View Doctors Roster",
    actionLabelBn: "বিশেষজ্ঞ চিকিৎসকদের তালিকা দেখুন",
    actionTarget: "doctors",
  },
  {
    id: "faq-booking-visiting-days",
    category: "Appointment & Chambers",
    categoryBn: "চেম্বার ও অ্যাপয়েন্টমেন্ট",
    question: "Which days do the specialists sit at AXON Healthcare?",
    questionBn: "কোন কোন দিন বিশেষজ্ঞ চিকিৎসকরা চেম্বারে বসেন?",
    answer:
      "Dr. Mohammad Quasim Laskar (Orthopedic Specialist) and Dr. Achintam Dash (Emergency Medicine / Medicine) see patients Everyday. Dr. Wasim Anzum Laskar (Emergency Medicine & Diabetes Specialist) sits every Wednesday, Friday, and Saturday. For Dr. Haneef Mohammed (Obstetrics & Gynaecology, Consultation Fee: ₹500 — Contact for information), Dr. Swarnadeep Dutta, and Dr. G. Lansinlu Rongmei, please contact reception to confirm visiting date and chamber timings.",
    answerBn:
      "ডাঃ মোহাম্মদ কাসিম লস্কর (অর্থোপেডিক বিশেষজ্ঞ) এবং ডাঃ অচিন্তম দাশ (মেডিসিন বিশেষজ্ঞ) প্রতিদিন রোগী দেখেন। ডাঃ ওয়াসিম আনজুম লস্কর (ডায়াবেটিস ও ইমার্জেন্সি মেডিসিন বিশেষজ্ঞ) প্রতি বুধবার, শুক্রবার এবং শনিবার বসেন। ডাঃ হানিফ মোহাম্মদ (প্রসূতি ও স্ত্রী রোগ বিশেষজ্ঞ, পরামর্শ ফি: ₹৫০০ — তথ্যের জন্য যোগাযোগ করুন), ডাঃ স্বর্ণদীপ দত্ত এবং ডাঃ জি. লানসিনলু রংমেই-এর তারিখ ও সময়ের জন্য অনুগ্রহ করে ফোনে যোগাযোগ করুন।",
    keyTakeaway:
      "All chambers are located at AXON Healthcare, Lala Road, near S.K. Roy Civil Hospital, Hailakandi.",
    keyTakeawayBn:
      "সকল চেম্বার স্থান: অ্যাক্সন হেলথকেয়ার, লালা রোড, এস.কে. রায় সিভিল হাসপাতালের নিকটে, হাইলাকান্দি।",
    actionLabel: "Contact Reception Desk",
    actionLabelBn: "রিসেপশনে যোগাযোগ করুন",
    actionTarget: "contact",
  },
  {
    id: "faq-diagnostic-sonography-prep",
    category: "Diagnostic Preparation",
    categoryBn: "পরীক্ষার প্রস্তুতি",
    question: "What preparation is required before a 3D Sonography or Whole Abdomen Ultrasound?",
    questionBn: "থ্রি-ডি সনোগ্রাফি (3D Sonography) বা আল্ট্রাসাউন্ড করার আগে কী প্রস্তুতি নিতে হবে?",
    answer:
      "For Upper Abdomen or Whole Abdomen 3D Sonography, patients should fast for 6 to 8 hours prior to the scan (plain water is allowed). For Pelvic, Gynecology, or early Obstetric scans, please drink 4–5 glasses of water 45 minutes before your test so your urinary bladder is comfortably full.",
    answerBn:
      "পেটের উপরিভাগ বা হোল অ্যাবডোমেন আল্ট্রাসাউন্ডের জন্য পরীক্ষার আগে ৬ থেকে ৮ ঘণ্টা খালি পেটে থাকতে হবে (সাধারণ জল খাওয়া যাবে)। তলপেট, গাইনি বা প্রেগন্যান্সি সনোগ্রাফির জন্য পরীক্ষার ৪৫ মিনিট আগে ৪–৫ গ্লাস জল পান করুন যাতে প্রস্রাবের থলি পূর্ণ থাকে।",
    keyTakeaway:
      "Same-day ultrasound reporting is available at our diagnostic wing.",
    keyTakeawayBn:
      "আমাদের ডায়াগনস্টিক সেন্টারে একই দিনে সনোগ্রাফি রিপোর্ট প্রদান করা হয়।",
    actionLabel: "Explore Diagnostics Hub",
    actionLabelBn: "ডায়াগনস্টিক বিভাগ দেখুন",
    actionTarget: "diagnostics",
  },
  {
    id: "faq-diagnostic-blood-xray-ecg",
    category: "Diagnostic Preparation",
    categoryBn: "পরীক্ষার প্রস্তুতি",
    question: "Do I need overnight fasting for Blood Tests, Digital X-Ray, or 12-Lead ECG?",
    questionBn: "রক্ত পরীক্ষা, ডিজিটাল এক্স-রে বা ইসিজি (ECG)-এর জন্য কি খালি পেটে থাকতে হয়?",
    answer:
      "Overnight fasting of 8 to 10 hours is required only for Fasting Blood Sugar (FBS) and Lipid Profile tests. Complete Blood Count (CBC), HbA1c, and Thyroid (TSH) tests can be done at any time of day. Digital X-Ray only requires removing metallic items over the scan area, and 12-Lead ECG requires 10 minutes of quiet rest prior to recording.",
    answerBn:
      "শুধুমাত্র ফাস্টিং ব্লাড সুগার (FBS) এবং লিপিড প্রোফাইল পরীক্ষার জন্য রাতে ৮–১০ ঘণ্টা খালি পেটে থাকা প্রয়োজন। সিবিসি (CBC), HbA1c এবং থাইরয়েড পরীক্ষা দিনের যেকোনো সময় করা যায়। ডিজিটাল এক্স-রে করার সময় ধাতব গহনা খুলে রাখতে হয় এবং ইসিজি করার আগে ১০ মিনিট বিশ্রাম নেওয়া প্রয়োজন।",
    keyTakeaway:
      "Lab sample collection is open daily from 7:30 AM to 8:30 PM.",
    keyTakeawayBn:
      "রক্ত ও ল্যাব নমুনা সংগ্রহ প্রতিদিন সকাল ৭:৩০টা থেকে রাত ৮:৩০টা পর্যন্ত খোলা থাকে।",
    actionLabel: "View All Clinical Tests",
    actionLabelBn: "সকল ল্যাব টেস্ট দেখুন",
    actionTarget: "diagnostics",
  },
  {
    id: "faq-pharmacy-in-store",
    category: "Prescription & Pharmacy",
    categoryBn: "প্রেসক্রিপশন ও ফার্মেসি",
    question: "How do I obtain prescription medicines from AXON Healthcare Pharmacy?",
    questionBn: "অ্যাক্সন হেলথকেয়ার ফার্মেসি থেকে ওষুধ সংগ্রহের নিয়ম কী?",
    answer:
      "Please bring your doctor's original OPD prescription directly to our pharmacy counter on Lala Road, near S.K. Roy Civil Hospital. Our registered pharmacists verify all prescriptions and dispense genuine, batch-checked medicines and cold-chain biologicals.",
    answerBn:
      "অনুগ্রহ করে চিকিৎসকের মূল প্রেসক্রিপশনটি সাথে নিয়ে আমাদের লালা রোডের (এস.কে. রায় সিভিল হাসপাতালের নিকটে) ফার্মেসি কাউন্টারে আসুন। আমাদের রেজিস্টার্ড ফার্মাসিস্ট প্রেসক্রিপশন যাচাই করে সঠিক মাত্রা ও ব্যাচ-পরীক্ষিত আসল ওষুধ প্রদান করেন।",
    keyTakeaway:
      "For medicine stock inquiries, call our pharmacy desk at +91 8822480027 (7:00 AM – 10:30 PM).",
    keyTakeawayBn:
      "ওষুধের স্টক সম্পর্কে জানতে কল করুন: +91 8822480027 (সকাল ৭:০০ – রাত ১০:৩০)।",
    actionLabel: "View Pharmacy Services",
    actionLabelBn: "ফার্মেসি সেবা দেখুন",
    actionTarget: "pharmacy",
  },
];
