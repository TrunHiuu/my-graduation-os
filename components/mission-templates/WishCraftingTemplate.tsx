import React from "react";

type WishCraftingTemplateProps = {
  wish?: string;
  onWishChange?: (wish: string) => void;
  isSubmitting?: boolean;
  isDisabled?: boolean;
  isSubmitted?: boolean;
  onSubmit?: () => void;
};

export default function WishCraftingTemplate({
  wish = "",
  onWishChange,
  isSubmitting = false,
  isDisabled = false,
  isSubmitted = false,
  onSubmit,
}: WishCraftingTemplateProps) {
  const submitDisabled = isSubmitting || isDisabled || wish.trim().length === 0;

  return (
    <div
      className="bg-slate-50 border-2 border-slate-300 rounded text-slate-700 max-w-full"
      style={{
        height: "175px",
        overflowY: "auto",
        padding: "10px",
        opacity: isDisabled ? 0.55 : 1,
        pointerEvents: isDisabled ? "none" : "auto",
      }}
    >
      <div className="mb-2 border-b border-slate-200 pb-2 flex items-start justify-between gap-2">
        <div>
          <p className="text-[13px] font-bold tracking-[1px] text-sky-800 uppercase leading-tight">Mission 3</p>
          <p className="text-[13px] font-extrabold text-slate-900 leading-tight">Wish Crafting Odyssey</p>
        </div>

        <button
          type="button"
          disabled={submitDisabled}
          onClick={onSubmit}
          className="disabled:cursor-not-allowed shrink-0"
          style={{
            minWidth: "80px",
            padding: "5px 10px",
            borderRadius: "5px",
            border: "1px solid",
            borderColor: "#4a8ace #0a2a6a #0a2a6a #4a8ace",
            backgroundColor: isSubmitting ? "#7aa6d3" : "#1e5aa8",
            color: "#ffffff",
            fontFamily: "Arial Black, monospace",
            fontSize: "11px",
            letterSpacing: "1px",
            boxShadow: "inset 1px 1px 0 #6aadee, inset -1px -1px 0 #000000",
            opacity: submitDisabled ? 0.6 : 1,
            lineHeight: 1,
          }}
        >
          {isSubmitting ? "SAVING" : "SUBMIT"}
        </button>
      </div>

      <p className="text-[13px] font-bold leading-snug text-slate-800">
        Write a wish for me and leave a memory I can keep.
      </p>

      <textarea
        value={wish}
        onChange={(event) => onWishChange?.(event.target.value)}
        disabled={isDisabled}
        placeholder="Type your wish here..."
        className="mt-2 w-full resize-none rounded border border-slate-300 bg-white px-2 py-1.5 text-[13px] text-slate-900 outline-none"
        rows={4}
        style={{
          boxShadow: "inset 1px 1px 0 #ffffff, inset -1px -1px 0 #cbd5e1",
          fontFamily: "var(--font-roboto)",
        }}
      />

      {isSubmitted ? (
        <div
          className="mt-2 rounded border border-emerald-300 bg-emerald-50 px-2 py-1 text-[13px] text-emerald-900"
          style={{ boxShadow: "inset 1px 1px 0 #ffffff, inset -1px -1px 0 #bbf7d0" }}
        >
          <span className="font-bold">Submitted answer:</span>{" "}
          <span className="font-semibold break-words">{wish || "(empty)"}</span>
        </div>
      ) : null}
    </div>
  );
}
