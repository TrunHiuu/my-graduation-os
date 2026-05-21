import React from "react";

type UploadImageTemplateProps = {
  previewUrl?: string | null;
  onFileSelect?: (file: File | null) => void;
  isSubmitting?: boolean;
  isDisabled?: boolean;
  isSubmitted?: boolean;
  onReview?: () => void;
  onSubmit?: () => void;
};

export default function UploadImageTemplate({
  previewUrl = null,
  onFileSelect,
  isSubmitting = false,
  isDisabled = false,
  isSubmitted = false,
  onReview,
  onSubmit,
}: UploadImageTemplateProps) {
  // enable Review button when already submitted even if parent `isDisabled`.
  // Disabled when submitting, or when there's no preview and not yet submitted.
  const submitDisabled = isSubmitting || (!previewUrl && !isSubmitted) || (isDisabled && !isSubmitted);

  return (
    <div
      className="bg-slate-50 border-2 border-slate-300 rounded text-slate-700 max-w-full"
      style={{
        height: "175px",
        overflowY: "auto",
        padding: "10px",
      }}
    >
      <div className="mb-2 border-b border-slate-200 pb-2 flex items-start justify-between gap-2">
        {/* header left (title) */}
        <div
          style={{
            opacity: isDisabled ? 0.35 : 1,
            filter: isDisabled ? "grayscale(60%) brightness(0.85)" : undefined,
            pointerEvents: isDisabled ? "none" : "auto",
          }}
          aria-disabled={isDisabled}
        >
          <p className="text-[13px] font-bold tracking-[1px] text-sky-800 uppercase leading-tight">Mission 4</p>
          <p className="text-[13px] font-extrabold text-slate-900 leading-tight">Photographic Finale</p>
        </div>

        {/* submitted badge (dim if disabled) */}
        {isSubmitted ? (
          <div
            style={{
              opacity: isDisabled ? 0.35 : 1,
              filter: isDisabled ? "grayscale(60%) brightness(0.85)" : undefined,
            }
            }
            className="text-sm font-bold text-green-700 mr-2"
            aria-disabled={isDisabled}
          >
            SUBMITTED
          </div>
        ) : null}

        {/* main action button (Submit or Review). keep enabled for REVIEW even if submitted, but respect isDisabled/isSubmitting */}
        <button
          type="button"
          disabled={submitDisabled}
          onClick={isSubmitted ? onReview : onSubmit}
          className="disabled:cursor-not-allowed shrink-0"
          style={{
            minWidth: "80px",
            padding: "5px 10px",
            borderRadius: "5px",
            border: "1px solid",
            borderColor: "#4a8ace #0a2a6a #0a2a6a #4a8ace",
            // Use same styling for REVIEW as for SUBMIT (only label changes)
            backgroundColor: isSubmitting ? "#7aa6d3" : "#1e5aa8",
            color: "#ffffff",
            fontFamily: "Arial Black, monospace",
            fontSize: "11px",
            letterSpacing: "1px",
            boxShadow: "inset 1px 1px 0 #6aadee, inset -1px -1px 0 #000000",
            opacity: submitDisabled ? 0.6 : 1,
            lineHeight: 1,
            pointerEvents: (isDisabled && !isSubmitted) ? "none" : "auto",
          }}
        >
          {isSubmitted ? "REVIEW" : (isSubmitting ? "SAVING" : "SUBMIT")}
        </button>
      </div>

      <p
        className="text-[13px] font-bold leading-snug text-slate-800"
        style={{
          opacity: isDisabled ? 0.35 : 1,
          filter: isDisabled ? "grayscale(60%) brightness(0.85)" : undefined,
          pointerEvents: isDisabled ? "none" : "auto",
        }}
      >
        Upload a photo with me to finish the final mission.
      </p>

      <label
        className="mt-2 block rounded border border-dashed border-slate-300 bg-white p-2 text-center text-[13px] font-semibold"
        style={{
          opacity: isDisabled ? 0.35 : 1,
          filter: isDisabled ? "grayscale(60%) brightness(0.85)" : undefined,
          pointerEvents: isDisabled ? "none" : "auto",
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          color: isDisabled ? '#9ca3af' : undefined
        }}
        aria-disabled={isDisabled}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={isDisabled || isSubmitted}
          onChange={(event) => onFileSelect?.(event.target.files?.[0] ?? null)}
        />
        Choose an image
      </label>

      {previewUrl ? (
        <div className="mt-2 overflow-hidden rounded border border-slate-300 bg-white p-1.5">
          {/* preview stays fully visible even when card is dimmed */}
          <img src={previewUrl} alt="Upload preview" className="h-24 w-full rounded object-cover" style={{ opacity: 1 }} />
        </div>
      ) : null}
    </div>
  );
}
