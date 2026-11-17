import React, { useState, useEffect } from "react";
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";
import {
  MapPin,
  Navigation,
  PhoneCall,
  Clock,
  Compass,
  Building2,
  ExternalLink,
  Search,
} from "lucide-react";
import { CLINIC_INFO, Language } from "../data/clinicData";
import {
  GMP_ATTRIBUTION_ID,
  buildGoogleMapsPlaceEmbedUrl,
  getClinicGoogleMapsLinks,
} from "../utils/clinicLogic";

interface LocationMapSectionProps {
  language: Language;
}

type MapDisplayMode = "interactive" | "snapshot" | "embed";

const API_KEY =
  (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined) ||
  (process.env.GOOGLE_MAPS_PLATFORM_API_KEY as string | undefined) ||
  "";

const HAS_VALID_API_KEY =
  Boolean(API_KEY) &&
  API_KEY !== "MY_GOOGLE_MAPS_API_KEY" &&
  API_KEY.trim().length > 5;

const CLINIC_SEARCH_QUERY =
  "Lala Road, Near S.K. Roy Civil Hospital, Hailakandi, Assam 788151";

interface ResolvedClinicPlace {
  location: NonNullable<React.ComponentProps<typeof AdvancedMarker>["position"]>;
  displayName: string;
  formattedAddress: string;
}

const DynamicClinicMarker: React.FC<{ language: Language }> = ({
  language,
}) => {
  const map = useMap();
  const placesLib = useMapsLibrary("places");
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [resolvedPlace, setResolvedPlace] =
    useState<ResolvedClinicPlace | null>(null);
  const [infoOpen, setInfoOpen] = useState<boolean>(true);
  const isBn = language === "bn";

  useEffect(() => {
    if (!placesLib || !map) return;
    let isMounted = true;

    const lookupClinicLocation = async () => {
      try {
        const { places } = await placesLib.Place.searchByText({
          textQuery: CLINIC_SEARCH_QUERY,
          fields: ["location", "displayName", "formattedAddress"],
        });

        const firstPlace = places?.[0];
        if (isMounted && firstPlace?.location) {
          map.panTo(firstPlace.location);
          map.setZoom(16);
          setResolvedPlace({
            location: firstPlace.location,
            displayName: firstPlace.displayName || CLINIC_INFO.name,
            formattedAddress:
              firstPlace.formattedAddress ||
              `${CLINIC_INFO.addressLine1}, ${CLINIC_INFO.addressLine2}`,
          });
        }
      } catch (err: unknown) {
        const msg = String(err);
        if (
          msg.includes("RESOURCE_EXHAUSTED") ||
          msg.includes("OVER_QUERY_LIMIT") ||
          msg.includes("QuotaExceeded") ||
          msg.includes("429")
        ) {
          window.dispatchEvent(new CustomEvent("gmp-quota-exceeded"));
        }
      }
    };

    lookupClinicLocation();
    return () => {
      isMounted = false;
    };
  }, [placesLib, map]);

  if (!resolvedPlace) return null;

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={resolvedPlace.location}
        title={CLINIC_INFO.name}
        onClick={() => setInfoOpen(true)}
      >
        <Pin
          background="#0B1F3A"
          borderColor="#22D3EE"
          glyphColor="#22D3EE"
          scale={1.25}
        />
      </AdvancedMarker>

      {infoOpen && marker && (
        <InfoWindow
          anchor={marker}
          maxWidth={260}
          onCloseClick={() => setInfoOpen(false)}
        >
          <div className="p-1 text-[#0B1F3A] space-y-1">
            <p className="font-bold text-sm">
              {isBn ? CLINIC_INFO.nameBn : CLINIC_INFO.name}
            </p>
            <p className="text-xs text-slate-600 leading-snug">
              {isBn
                ? `${CLINIC_INFO.addressLine1Bn}, ${CLINIC_INFO.addressLine2Bn}`
                : `${CLINIC_INFO.addressLine1}, ${CLINIC_INFO.addressLine2}`}
            </p>
            <p className="text-xs font-mono-tabular font-semibold text-[#0891B2]">
              Tel: +91 {CLINIC_INFO.primaryPhone}
            </p>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export const LocationMapSection: React.FC<LocationMapSectionProps> = ({
  language,
}) => {
  const [mapMode, setMapMode] = useState<MapDisplayMode>(
    HAS_VALID_API_KEY ? "interactive" : "snapshot"
  );
  const [selectedRouteIdx, setSelectedRouteIdx] = useState<number>(0);
  const isBn = language === "bn";

  const mapsLinks = getClinicGoogleMapsLinks(CLINIC_INFO, language);
  const directionsUrl = mapsLinks.directionsUrl;
  const searchUrl = mapsLinks.searchUrl;

  const embedUrl = HAS_VALID_API_KEY
    ? buildGoogleMapsPlaceEmbedUrl(API_KEY, CLINIC_SEARCH_QUERY, language)
    : "";

  const approachLandmarks = [
    {
      titleEn: "From S.K. Roy Civil Hospital Gate",
      titleBn: "এস.কে. রায় সিভিল হাসপাতাল গেট থেকে",
      distanceEn: "1–2 Mins Walk · Direct Lala Road Frontage",
      distanceBn: "১–২ মিনিটের হাঁটা পথ · লালা রোড সংলগ্ন",
      instructionsEn:
        "Exit the main gate of S.K. Roy Civil Hospital onto Lala Road. AXON Healthcare's pharmacy and diagnostic center is located immediately along the Lala Road clinical corridor with prominent navy-and-cyan signage.",
      instructionsBn:
        "এস.কে. রায় সিভিল হাসপাতালের প্রধান গেট থেকে লালা রোডে বের হন। হাসপাতালের ঠিক নিকটেই প্রধান সড়কের পাশে অ্যাক্সন হেলথকেয়ারের ফার্মেসি ও ডায়াগনস্টিক সেন্টার অবস্থিত।",
    },
    {
      titleEn: "From Hailakandi Town / Railway Station",
      titleBn: "হাইলাকান্দি টাউন / রেলওয়ে স্টেশন থেকে",
      distanceEn: "5–8 Mins by Auto-Rickshaw or E-Rickshaw",
      distanceBn: "অটো বা ই-রিকশায় ৫–৮ মিনিট",
      instructionsEn:
        "Take any auto-rickshaw or e-rickshaw heading South along Lala Road toward S.K. Roy Civil Hospital. Ask the driver to drop you at AXON Healthcare right beside Civil Hospital.",
      instructionsBn:
        "হাইলাকান্দি সদর বা স্টেশন রোড থেকে লালা রোড হয়ে এস.কে. রায় সিভিল হাসপাতালগামী যেকোনো অটো বা ই-রিকশায় উঠুন এবং সিভিল হাসপাতালের কাছে অ্যাক্সন হেলথকেয়ারের সামনে নামুন।",
    },
    {
      titleEn: "From Lala / Katlicherra Highway Corridor",
      titleBn: "লালা / কাটলিছড়া সড়ক পথ থেকে",
      distanceEn: "Direct Approach via Lala Road (SH-39)",
      distanceBn: "লালা রোড (SH-39) হয়ে সরাসরি যোগাযোগ",
      instructionsEn:
        "Travel North along the Lala–Hailakandi main road into Hailakandi town. Just before reaching S.K. Roy Civil Hospital, you will find AXON Healthcare with roadside patient drop-off access.",
      instructionsBn:
        "লালা-হাইলাকান্দি প্রধান সড়ক ধরে শহরে প্রবেশ করার পর এস.কে. রায় সিভিল হাসপাতালের ঠিক আগেই প্রধান রাস্তার পাশে অ্যাক্সন হেলথকেয়ারে সরাসরি গাড়ি বা অটো নিয়ে পৌঁছাতে পারবেন।",
    },
  ];

  return (
    <section
      id="location-map"
      className="scroll-mt-16 py-16 lg:py-24 bg-white border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header + Map Mode Selector */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-[#0891B2] tracking-wide">
              {isBn
                ? "০৬. ক্লিনিকের অবস্থান ও ম্যাপ নির্দেশিকা"
                : "06. Clinic Location & Wayfinding Map"}
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] mt-2 tracking-tight"
              style={{ textWrap: "balance" }}
            >
              {isBn
                ? "লালা রোড, এস.কে. রায় সিভিল হাসপাতালের নিকটে, হাইলাকান্দি"
                : "Find AXON Healthcare on Lala Road, Near S.K. Roy Civil Hospital"}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              {isBn
                ? "রোগী এবং স্বজনদের সহজে পৌঁছানোর জন্য নিচে আমাদের ক্লিনিকের ইন্টারঅ্যাক্টিভ গুগল ম্যাপ এবং লালা রোড ও সিভিল হাসপাতাল সংলগ্ন ভিজ্যুয়াল ম্যাপ গাইড দেওয়া হলো।"
                : "Located directly on Lala Road adjacent to S.K. Roy Civil Hospital in Hailakandi, Assam for rapid access to emergency specialist chambers, Digital X-Ray, 3D Sonography, and 24-hour cold-chain pharmacy care."}
            </p>
          </div>

          {/* Interactive View Switcher */}
          <div
            role="group"
            aria-label="Select map view mode"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-200/80 rounded-xl self-start lg:self-auto shrink-0"
          >
            <button
              type="button"
              onClick={() => setMapMode("snapshot")}
              data-testid="map-mode-snapshot"
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                mapMode === "snapshot"
                  ? "bg-[#0B1F3A] text-white shadow-xs"
                  : "text-slate-700 hover:text-[#0B1F3A]"
              }`}
            >
              {isBn ? "ল্যান্ডমার্ক ম্যাপ স্ন্যাপশট" : "Visual Landmark Map"}
            </button>
            <button
              type="button"
              onClick={() => setMapMode("interactive")}
              data-testid="map-mode-interactive"
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                mapMode === "interactive"
                  ? "bg-[#0B1F3A] text-white shadow-xs"
                  : "text-slate-700 hover:text-[#0B1F3A]"
              }`}
            >
              {isBn ? "ইন্টারঅ্যাক্টিভ গুগল ম্যাপ" : "Interactive Google Map"}
            </button>
            {HAS_VALID_API_KEY && (
              <button
                type="button"
                onClick={() => setMapMode("embed")}
                data-testid="map-mode-embed"
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  mapMode === "embed"
                    ? "bg-[#0B1F3A] text-white shadow-xs"
                    : "text-slate-700 hover:text-[#0B1F3A]"
                }`}
              >
                {isBn ? "গুগল প্লেস ভিউ" : "Place Embed View"}
              </button>
            )}
          </div>
        </div>

        {/* Direct Google Maps Redirect Banner: Trace Route, Search & Check Clinic Location */}
        <div
          data-testid="google-maps-redirect-hub"
          className="mt-6 bg-[#F8FAFC] rounded-2xl p-4 sm:p-5 border border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
        >
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#0B1F3A] flex items-center justify-center shrink-0 border border-[#1E3A5F]">
              <MapPin className="w-5 h-5 text-[#22D3EE]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#0891B2]">
                {isBn
                  ? "সরাসরি গুগল ম্যাপ রিডাইরেক্ট (Direct Google Maps Navigation)"
                  : "Direct Google Maps Location & Route Redirect"}
              </p>
              <p className="text-sm sm:text-base font-bold text-[#0B1F3A] mt-0.5">
                {isBn
                  ? "গুগল ম্যাপে ক্লিনিকের অবস্থান খুঁজুন, ট্র্যাক করুন এবং লাইভ রুট দেখুন"
                  : "Click below to open Google Maps to trace your route, search, and check our exact clinic location"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="redirect-google-maps-trace"
              className="px-4 py-2.5 rounded-xl bg-[#0B1F3A] hover:bg-[#16325B] text-white text-xs sm:text-sm font-bold inline-flex items-center gap-2 whitespace-nowrap shrink-0 transition-colors"
            >
              <Navigation className="w-4 h-4 text-[#22D3EE]" />
              <span>{mapsLinks.traceLabel}</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#22D3EE]" />
            </a>

            <a
              href={searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="redirect-google-maps-search"
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-[#0B1F3A] border border-slate-300 text-xs sm:text-sm font-semibold inline-flex items-center gap-2 whitespace-nowrap shrink-0 transition-colors"
            >
              <Search className="w-4 h-4 text-[#0891B2]" />
              <span>{mapsLinks.searchLabel}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Main 12-Col Grid: Left 8 Cols Map Viewport | Right 4 Cols Directions & Landmark Guide */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 8 Columns: Map Surface */}
          <div className="lg:col-span-8 bg-[#F8FAFC] rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between">
            <div className="relative w-full h-[420px] sm:h-[460px] bg-[#0B1F3A]">
              {mapMode === "interactive" && HAS_VALID_API_KEY ? (
                <APIProvider
                  apiKey={API_KEY}
                  region="IN"
                >
                  <GoogleMap
                    mapId="DEMO_MAP_ID"
                    defaultZoom={5}
                    defaultCenter={{ lat: 21.0, lng: 78.0 }}
                    gestureHandling="cooperative"
                    internalUsageAttributionIds={[GMP_ATTRIBUTION_ID]}
                    className="w-full h-full"
                  >
                    <DynamicClinicMarker language={language} />
                  </GoogleMap>
                </APIProvider>
              ) : mapMode === "embed" && HAS_VALID_API_KEY ? (
                <iframe
                  title="AXON Healthcare Location on Google Maps"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "420px" }}
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  src={embedUrl}
                />
              ) : (
                /* Stylized Visual Map Snapshot of Lala Road & S.K. Roy Civil Hospital Corridor */
                <div
                  data-testid="stylized-map-snapshot"
                  className="relative w-full h-full bg-[#0B1F3A] overflow-hidden select-none"
                >
                  {/* Architectural Cartographic Vector SVG of Lala Road & S.K. Roy Civil Hospital, Hailakandi */}
                  <svg
                    viewBox="0 0 800 460"
                    className="w-full h-full object-cover"
                    role="img"
                    aria-label="Stylized map of AXON Healthcare on Lala Road near S.K. Roy Civil Hospital, Hailakandi"
                  >
                    <defs>
                      <pattern
                        id="clinical-grid"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 40 0 L 0 0 0 40"
                          fill="none"
                          stroke="#1E3A5F"
                          strokeWidth="0.75"
                          strokeOpacity="0.55"
                        />
                      </pattern>
                    </defs>

                    {/* Base Dark Navy Map Canvas */}
                    <rect width="800" height="460" fill="#0B1F3A" />
                    <rect width="800" height="460" fill="url(#clinical-grid)" />

                    {/* Urban Blocks & Hospital Campus Zones */}
                    <rect
                      x="55"
                      y="45"
                      width="245"
                      height="155"
                      rx="14"
                      fill="#112A4A"
                      stroke="#1E3A5F"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="55"
                      y="255"
                      width="245"
                      height="155"
                      rx="14"
                      fill="#133055"
                      stroke="#22D3EE"
                      strokeOpacity="0.35"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="430"
                      y="45"
                      width="315"
                      height="140"
                      rx="14"
                      fill="#112A4A"
                      stroke="#1E3A5F"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="430"
                      y="240"
                      width="315"
                      height="170"
                      rx="14"
                      fill="#112A4A"
                      stroke="#1E3A5F"
                      strokeWidth="1.5"
                    />

                    {/* Secondary Connecting Roads (Hospital Gate Road & Civil Line) */}
                    <path
                      d="M 0 225 L 800 225"
                      stroke="#1E3A5F"
                      strokeWidth="26"
                    />
                    <path
                      d="M 0 225 L 800 225"
                      stroke="#38BDF8"
                      strokeOpacity="0.3"
                      strokeWidth="1.5"
                      strokeDasharray="6 6"
                    />

                    {/* Primary Arterial Corridor: LALA ROAD (Vertical North-South Axis) */}
                    <path
                      d="M 365 0 L 365 460"
                      stroke="#163760"
                      strokeWidth="54"
                    />
                    <path
                      d="M 338 0 L 338 460"
                      stroke="#22D3EE"
                      strokeOpacity="0.4"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M 392 0 L 392 460"
                      stroke="#22D3EE"
                      strokeOpacity="0.4"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M 365 0 L 365 460"
                      stroke="#22D3EE"
                      strokeWidth="2"
                      strokeDasharray="10 10"
                    />

                    {/* Road Labels */}
                    <g transform="translate(365, 95) rotate(-90)">
                      <rect
                        x="-68"
                        y="-13"
                        width="136"
                        height="26"
                        rx="6"
                        fill="#0B1F3A"
                        stroke="#22D3EE"
                        strokeOpacity="0.5"
                      />
                      <text
                        x="0"
                        y="4"
                        textAnchor="middle"
                        fill="#22D3EE"
                        fontSize="11"
                        fontWeight="700"
                        letterSpacing="1.2"
                      >
                        LALA ROAD (SH-39)
                      </text>
                    </g>

                    <text
                      x="610"
                      y="229"
                      textAnchor="middle"
                      fill="#94A3B8"
                      fontSize="10"
                      fontWeight="600"
                      letterSpacing="0.8"
                    >
                      CIVIL HOSPITAL APPROACH ROAD
                    </text>

                    {/* North Direction Indicator */}
                    <g transform="translate(735, 65)">
                      <circle
                        cx="0"
                        cy="0"
                        r="20"
                        fill="#0B1F3A"
                        stroke="#1E3A5F"
                        strokeWidth="1.5"
                      />
                      <polygon points="0,-11 -5,5 0,2 5,5" fill="#22D3EE" />
                      <text
                        x="0"
                        y="14"
                        textAnchor="middle"
                        fill="#CBD5E1"
                        fontSize="8"
                        fontWeight="700"
                      >
                        N
                      </text>
                    </g>

                    {/* Landmark 1: S.K. Roy Civil Hospital (Bottom-Left Block) */}
                    <g transform="translate(80, 280)">
                      <rect
                        x="0"
                        y="0"
                        width="195"
                        height="100"
                        rx="10"
                        fill="#0B1F3A"
                        stroke="#38BDF8"
                        strokeOpacity="0.45"
                      />
                      <rect
                        x="14"
                        y="16"
                        width="24"
                        height="24"
                        rx="6"
                        fill="#1E3A5F"
                      />
                      <path
                        d="M 26 21 L 26 35 M 19 28 L 33 28"
                        stroke="#38BDF8"
                        strokeWidth="2.5"
                      />
                      <text
                        x="46"
                        y="26"
                        fill="#38BDF8"
                        fontSize="9"
                        fontWeight="700"
                      >
                        KEY LANDMARK
                      </text>
                      <text
                        x="46"
                        y="41"
                        fill="#FFFFFF"
                        fontSize="12"
                        fontWeight="700"
                      >
                        S.K. Roy Civil Hospital
                      </text>
                      <text
                        x="14"
                        y="64"
                        fill="#94A3B8"
                        fontSize="10"
                      >
                        Hailakandi District Hospital
                      </text>
                      <text
                        x="14"
                        y="82"
                        fill="#22D3EE"
                        fontSize="10"
                        fontWeight="600"
                      >
                        100m from AXON Healthcare →
                      </text>
                    </g>

                    {/* Connecting Walking Path Dashed Arc from Civil Hospital to AXON Healthcare */}
                    <path
                      d="M 275 330 C 335 330, 365 250, 440 165"
                      fill="none"
                      stroke="#22D3EE"
                      strokeWidth="2.5"
                      strokeDasharray="6 5"
                    />

                    {/* Primary Destination Pin: AXON HEALTHCARE (Right of Lala Road Intersection) */}
                    <g transform="translate(445, 72)">
                      <rect
                        x="0"
                        y="0"
                        width="280"
                        height="135"
                        rx="12"
                        fill="#0B1F3A"
                        stroke="#22D3EE"
                        strokeWidth="2"
                      />
                      <text
                        x="18"
                        y="26"
                        fill="#22D3EE"
                        fontSize="10"
                        fontWeight="700"
                        letterSpacing="0.8"
                      >
                        PRIMARY CLINIC LOCATION
                      </text>
                      <text
                        x="18"
                        y="48"
                        fill="#FFFFFF"
                        fontSize="17"
                        fontWeight="800"
                      >
                        AXON Healthcare
                      </text>
                      <text
                        x="18"
                        y="68"
                        fill="#E2E8F0"
                        fontSize="11"
                        fontWeight="500"
                      >
                        Lala Road, Near S.K. Roy Civil Hospital
                      </text>
                      <text
                        x="18"
                        y="85"
                        fill="#94A3B8"
                        fontSize="11"
                      >
                        Hailakandi, Assam – 788151
                      </text>
                      <text
                        x="18"
                        y="111"
                        fill="#22D3EE"
                        fontSize="11"
                        fontWeight="700"
                      >
                        OPD Chambers · Digital X-Ray · 3D USG · Pharmacy
                      </text>
                    </g>

                    {/* Pin Marker Anchor on Lala Road Frontage */}
                    <g transform="translate(415, 145)">
                      <circle
                        cx="0"
                        cy="0"
                        r="18"
                        fill="#22D3EE"
                        fillOpacity="0.2"
                      />
                      <circle
                        cx="0"
                        cy="0"
                        r="9"
                        fill="#22D3EE"
                        stroke="#0B1F3A"
                        strokeWidth="3"
                      />
                    </g>
                  </svg>

                  {/* Floating Bottom Map Legend Bar */}
                  <div className="absolute inset-x-4 bottom-4 bg-[#0B1F3A]/95 backdrop-blur-md border border-white/15 rounded-xl p-3.5 sm:px-5 flex flex-wrap items-center justify-between gap-3 text-xs text-white">
                    <div className="flex items-center gap-3">
                      <img
                        src={CLINIC_INFO.logoUrl}
                        alt={CLINIC_INFO.name}
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-lg object-contain bg-white p-0.5 shrink-0"
                      />
                      <div>
                        <p className="font-bold text-white">
                          {isBn
                            ? "অ্যাক্সন হেলথকেয়ার — লালা রোড, হাইলাকান্দি"
                            : "AXON Healthcare — Lala Road, Hailakandi"}
                        </p>
                        <p className="text-slate-300">
                          {isBn
                            ? "এস.কে. রায় সিভিল হাসপাতালের ঠিক নিকটে · আসাম ৭৮৮১৫১"
                            : "Adjacent to S.K. Roy Civil Hospital · Assam 788151"}
                        </p>
                      </div>
                    </div>

                    <a
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-lg bg-[#22D3EE] hover:bg-[#67E8F9] text-[#0B1F3A] font-bold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      {isBn ? "গুগল ম্যাপে দিকনির্দেশনা" : "Get Directions"}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Map Metadata Bar */}
            <div className="px-5 py-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
              <div className="flex flex-wrap items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0891B2] shrink-0" />
                <span className="font-semibold text-[#0B1F3A]">
                  {isBn
                    ? `${CLINIC_INFO.addressLine1Bn}, ${CLINIC_INFO.addressLine2Bn}`
                    : `${CLINIC_INFO.addressLine1}, ${CLINIC_INFO.addressLine2}`}
                </span>
              </div>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="open-google-maps-directions"
                className="font-bold text-[#0891B2] hover:text-[#0B1F3A] inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
              >
                {isBn
                  ? "গুগল ম্যাপ অ্যাপে খুলুন"
                  : "Open Live Route in Google Maps"}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right 4 Columns: Interactive Step-by-Step Local Approach & Landmark Guide */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-[#0B1F3A] text-white rounded-2xl p-6 sm:p-7 border border-[#1E3A5F]">
            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <img
                  src={CLINIC_INFO.logoUrl}
                  alt={CLINIC_INFO.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-xl object-contain bg-white p-1 shrink-0"
                />
                <div>
                  <span className="text-xs font-mono-tabular text-[#22D3EE]">
                    {isBn ? "রোগীদের যাতায়াত নির্দেশিকা" : "Patient Wayfinding"}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {isBn
                      ? "কীভাবে ক্লিনিকে পৌঁছাবেন"
                      : "How to Reach the Clinic"}
                  </h3>
                </div>
              </div>

              {/* Route Selector Buttons */}
              <div className="space-y-2">
                {approachLandmarks.map((item, idx) => (
                  <button
                    key={item.titleEn}
                    type="button"
                    onClick={() => setSelectedRouteIdx(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-colors cursor-pointer ${
                      selectedRouteIdx === idx
                        ? "bg-white/10 border-[#22D3EE] text-white"
                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-white">
                        0{idx + 1}. {isBn ? item.titleBn : item.titleEn}
                      </span>
                      <Compass className="w-3.5 h-3.5 text-[#22D3EE] shrink-0" />
                    </div>
                    <p className="text-[11px] font-mono-tabular text-[#22D3EE] mt-1">
                      {isBn ? item.distanceBn : item.distanceEn}
                    </p>
                  </button>
                ))}
              </div>

              {/* Active Route Directions Detail */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#22D3EE]">
                  <Building2 className="w-4 h-4 shrink-0" />
                  <span>
                    {isBn
                      ? approachLandmarks[selectedRouteIdx].titleBn
                      : approachLandmarks[selectedRouteIdx].titleEn}
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {isBn
                    ? approachLandmarks[selectedRouteIdx].instructionsBn
                    : approachLandmarks[selectedRouteIdx].instructionsEn}
                </p>
              </div>
            </div>

            {/* Bottom Contact & Hours Box */}
            <div className="pt-5 mt-6 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#22D3EE]" />
                  {isBn ? "খোলা:" : "Open Daily:"}
                </span>
                <span className="font-mono-tabular font-semibold text-white">
                  {isBn ? "সকাল ৭:০০ – রাত ১০:৩০" : "7:00 AM – 10:30 PM"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#22D3EE] hover:bg-[#67E8F9] text-[#0B1F3A] font-bold text-xs inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  {isBn ? "ম্যাপ রুট" : "Google Maps"}
                </a>
                <a
                  href={`tel:${CLINIC_INFO.primaryPhone}`}
                  className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 font-semibold text-xs font-mono-tabular inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#22D3EE]" />
                  {CLINIC_INFO.primaryPhone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
