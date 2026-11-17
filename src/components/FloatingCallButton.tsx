import React from "react";
import { PhoneCall } from "lucide-react";
import { CLINIC_INFO, Language } from "../data/clinicData";
import { getDirectCallLink } from "../utils/clinicLogic";

interface FloatingCallButtonProps {
  language: Language;
}

export const FloatingCallButton: React.FC<FloatingCallButtonProps> = ({
  language,
}) => {
  const callData = getDirectCallLink(CLINIC_INFO.primaryPhone, language);

  return (
    <div className="fixed bottom-5 right-5 z-50 pointer-events-auto">
      <a
        href={callData.href}
        data-testid="floating-call-now-btn"
        aria-label={callData.ariaLabel}
        className="group inline-flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#0B1F3A]/95 hover:bg-[#112A4A] backdrop-blur-md text-white border border-[#22D3EE]/40 shadow-lg transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22D3EE] whitespace-nowrap shrink-0"
      >
        <span className="w-9 h-9 rounded-xl bg-[#22D3EE] group-hover:bg-[#67E8F9] text-[#0B1F3A] flex items-center justify-center shrink-0 transition-colors">
          <PhoneCall className="w-4 h-4 stroke-[2.25]" />
        </span>
        <span className="flex flex-col text-left leading-tight pr-1">
          <span className="text-xs font-bold tracking-wide text-[#22D3EE]">
            {callData.label}
          </span>
          <span className="text-sm font-bold font-mono-tabular text-white">
            {callData.phoneDisplay}
          </span>
        </span>
      </a>
    </div>
  );
};
