import React, { useState } from "react";
import { CLINIC_INFO } from "../data/clinicData";

interface ReferenceImageSlotProps {
  label: string;
  sublabel?: string;
  aspectClass?: string;
  className?: string;
  variant?: "light" | "navy";
  slotId: string;
  defaultImageUrl?: string;
  imageObjectPosition?: string;
  imageClassName?: string;
}

export const ReferenceImageSlot: React.FC<ReferenceImageSlotProps> = ({
  label,
  sublabel,
  aspectClass = "aspect-video",
  className = "",
  slotId,
  defaultImageUrl,
  imageObjectPosition = "object-top",
  imageClassName = "",
}) => {
  const [imgError, setImgError] = useState<boolean>(false);
  const activeImageUrl = !imgError ? defaultImageUrl : null;

  return (
    <div
      data-testid={`clinic-photo-${slotId}`}
      className={`relative overflow-hidden rounded-xl bg-[#0B1F3A] border border-slate-200 ${aspectClass} ${className}`}
    >
      {activeImageUrl ? (
        <div className="relative w-full h-full">
          <img
            src={activeImageUrl}
            alt={label}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover ${imageObjectPosition} ${imageClassName}`}
          />
          {sublabel && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B1F3A]/90 via-[#0B1F3A]/45 to-transparent px-4 py-3 text-white">
              <p className="text-xs font-medium text-slate-100 leading-snug">
                {sublabel}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-full p-5 flex flex-col items-center justify-center text-center gap-2 bg-[#0B1F3A] text-white">
          <img
            src={CLINIC_INFO.logoUrl}
            alt={CLINIC_INFO.name}
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-lg object-contain bg-white p-1"
          />
          <p className="text-sm font-semibold tracking-tight">{label}</p>
        </div>
      )}
    </div>
  );
};
