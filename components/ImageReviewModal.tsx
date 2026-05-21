import React from "react";

type Props = {
  open: boolean;
  imageUrl?: string | null;
  onClose: () => void;
};

export default function ImageReviewModal({ open, imageUrl, onClose }: Props) {
  if (!open) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 60 }}>
      <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.6)" }} onClick={onClose} />

      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", maxWidth: "90%", maxHeight: "90%", background: "#fff", padding: 12, borderRadius: 8, boxShadow: "0 10px 30px rgba(0,0,0,0.5)", overflow: "visible" }}>
        <button
          aria-label="Close"
          onClick={onClose}
          style={{
            position: "absolute",
            right: -16,
            top: -16,
            width: 40,
            height: 40,
            borderRadius: "9999px",
            border: "2px solid #4c1d1d",
            background: "#7f1d1d",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 0 #4c1d1d",
            cursor: "pointer",
            padding: 0,
            outline: "none",
            transition: "transform 0.12s ease",
          }}
        >
          <span
            aria-hidden="true"
            style={{ position: "relative", width: 16, height: 16, display: "block" }}
          >
            <span style={{ position: "absolute", left: 7, top: 0, width: 2, height: 16, background: "#ffffff", transform: "rotate(45deg)", transformOrigin: "center" }} />
            <span style={{ position: "absolute", left: 7, top: 0, width: 2, height: 16, background: "#ffffff", transform: "rotate(-45deg)", transformOrigin: "center" }} />
          </span>
        </button>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
          {imageUrl ? (
            <img src={imageUrl} alt="Submitted" style={{ maxWidth: "100%", maxHeight: "80vh", borderRadius: 6 }} />
          ) : (
            <div style={{ padding: 24, color: "#666" }}>No image</div>
          )}
        </div>
      </div>
    </div>
  );
}
