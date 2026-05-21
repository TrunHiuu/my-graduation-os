import React from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

export type QuizTemplateProps = {
  missionBadge?: string;
  missionTitle?: string;
  question: string;
  options: string[];
  selectedOptionIndex?: number | null;
  correctOptionIndex?: number;
  isLoading?: boolean;
  isSubmitting?: boolean;
  isDisabled?: boolean;
  isSubmitted?: boolean;
  onSelectOption?: (optionIndex: number) => void;
  onSubmit?: () => void;
};

export default function QuizTemplate({
  missionBadge = "Mission 1 / 2",
  missionTitle = "Quiz Challenge",
  question,
  options,
  selectedOptionIndex = null,
  correctOptionIndex = -1,
  isLoading = false,
  isSubmitting = false,
  isDisabled = false,
  isSubmitted = false,
  onSelectOption,
  onSubmit,
}: QuizTemplateProps) {
  const submitDisabled = isLoading || isSubmitting || isDisabled || selectedOptionIndex === null;
  const isLocked = isDisabled || isSubmitted || isLoading;

  return (
    <div
      className="bg-slate-50 border-2 border-slate-300 p-3 rounded text-slate-700 max-w-full"
      style={{
        height: "175px",
        overflowY: "auto",
        padding: "10px 10px 2px 10px",
        opacity: isDisabled ? 0.55 : 1,
      }}
    >
      <div className="mb-2 border-b border-slate-200 pb-2 flex items-start justify-between gap-2">
        <div>
          <p className="text-[13px] font-bold tracking-[1px] text-sky-800 uppercase leading-tight">{missionBadge}</p>
          <p className="text-[13px] font-extrabold text-slate-900 leading-tight">{missionTitle}</p>
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
        {isLoading ? "Loading assigned quiz..." : question}
      </p>

      <div className="mt-2 grid grid-cols-2 gap-1.5">
        {options.map((option, optionIndex) => {
          const isSelected = selectedOptionIndex === optionIndex;
          const isCorrectOption = isSubmitted && optionIndex === correctOptionIndex;
          const isWrongSelection = isSubmitted && isSelected && !isCorrectOption;

          return (
            <button
              key={`${option}-${optionIndex}`}
              type="button"
              disabled={isLocked}
              onClick={() => onSelectOption?.(optionIndex)}
              className="w-full text-left disabled:cursor-not-allowed"
              style={{
                backgroundColor: isLoading
                  ? "#f8fafc"
                  : isCorrectOption
                    ? "#dcfce7"
                    : isWrongSelection
                      ? "#fee2e2"
                      : isSelected
                        ? "#dbeafe"
                        : "#ffffff",
                border: "1px solid",
                borderColor: isLoading
                  ? "#cbd5e1 #eef2f7 #eef2f7 #cbd5e1"
                  : isCorrectOption
                    ? "#16a34a #86efac #86efac #16a34a"
                    : isWrongSelection
                      ? "#dc2626 #fca5a5 #fca5a5 #dc2626"
                      : isSelected
                    ? "#1d4ed8 #93c5fd #93c5fd #1d4ed8"
                    : "#93a3b8 #eef2f7 #eef2f7 #93a3b8",
                padding: "6px 7px",
                boxShadow: isCorrectOption
                  ? "inset 1px 1px 0 #ecfdf5, inset -1px -1px 0 #22c55e"
                  : isWrongSelection
                    ? "inset 1px 1px 0 #fef2f2, inset -1px -1px 0 #ef4444"
                    : isSelected
                  ? "inset 1px 1px 0 #eff6ff, inset -1px -1px 0 #60a5fa"
                  : "inset 1px 1px 0 #ffffff, inset -1px -1px 0 #cbd5e1",
                fontFamily: "var(--font-roboto)",
                color: "#0f172a",
                borderRadius: "4px",
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              <span className="flex items-center justify-between gap-2 w-full">
                <span className="flex items-center min-w-0">
                  <span className="text-[11px] font-bold uppercase tracking-[1px] text-sky-800 mr-2">
                    {String.fromCharCode(65 + optionIndex)}.
                  </span>
                  <span className="text-[13px] font-semibold leading-tight truncate">{option}</span>
                </span>

                {isSubmitted ? (
                  isCorrectOption ? (
                    <CheckCircleIcon className="w-4 h-4 shrink-0 text-green-600" />
                  ) : isWrongSelection ? (
                    <XCircleIcon className="w-4 h-4 shrink-0 text-red-600" />
                  ) : null
                ) : null}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
