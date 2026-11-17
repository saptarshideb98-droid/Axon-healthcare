import React, { useEffect } from "react";
import { CheckCircle2, Info, AlertCircle, X, ExternalLink } from "lucide-react";

export type ToastVariant = "success" | "info" | "warning";

export interface ToastNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  subtext?: string;
  variant?: ToastVariant;
  autoHideDuration?: number;
  actionLabel?: string;
  actionHref?: string;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  isOpen,
  onClose,
  title,
  message,
  subtext,
  variant = "success",
  autoHideDuration = 6000,
  actionLabel,
  actionHref,
}) => {
  useEffect(() => {
    if (!isOpen || autoHideDuration <= 0) return;
    const timer = window.setTimeout(() => {
      onClose();
    }, autoHideDuration);
    return () => {
      window.clearTimeout(timer);
    };
  }, [isOpen, autoHideDuration, onClose]);

  if (!isOpen) return null;

  const renderIcon = () => {
    switch (variant) {
      case "warning":
        return <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />;
      case "info":
        return <Info className="w-5 h-5 text-[#22D3EE] shrink-0" />;
      case "success":
      default:
        return <CheckCircle2 className="w-5 h-5 text-[#22D3EE] shrink-0" />;
    }
  };

  return (
    <div
      role="status"
      aria-live="polite"
      data-testid="toast-notification"
      className="fixed bottom-5 left-4 sm:left-6 z-50 max-w-md w-[calc(100vw-2rem)] sm:w-full bg-[#0B1F3A]/95 backdrop-blur-md text-white rounded-2xl p-4 sm:p-5 border border-[#22D3EE]/50 shadow-2xl transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0 mt-0.5">
            {renderIcon()}
          </div>

          <div className="space-y-1">
            <h4
              data-testid="toast-title"
              className="text-sm font-bold text-white leading-snug"
            >
              {title}
            </h4>
            <p
              data-testid="toast-message"
              className="text-xs text-slate-200 leading-relaxed"
            >
              {message}
            </p>
            {subtext && (
              <p className="text-[11px] font-mono-tabular text-[#22D3EE] pt-0.5">
                {subtext}
              </p>
            )}

            {actionLabel && actionHref && (
              <div className="pt-2">
                <a
                  href={actionHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#22D3EE] hover:bg-[#67E8F9] text-[#0B1F3A] text-xs font-bold transition-colors"
                >
                  <span>{actionLabel}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          data-testid="toast-close-btn"
          aria-label="Close notification"
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
