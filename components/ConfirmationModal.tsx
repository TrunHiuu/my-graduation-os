import React, { ReactNode } from "react";

type Props = {
  open: boolean;
  title: string;
  message: ReactNode;
  confirmText?: string;
  cancelText?: string;
  titleBarColor?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmationModal({
  open,
  title,
  message,
  confirmText = "OK",
  cancelText = "Cancel",
  titleBarColor = "#d4669b",
  onConfirm,
  onCancel,
}: Props) {
  if (!open) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
    >
      <div
        style={{
          backgroundColor: "#d3c2cc",
          border: "2px solid",
          borderColor: "#ffffff #303030 #303030 #ffffff",
          padding: "20px",
          maxWidth: "400px",
          width: "calc(100% - 32px)",
          boxShadow: "inset 1px 1px 0 #ffffff, inset -1px -1px 0 #606060, 0 0 20px rgba(0,0,0,0.8)",
        }}
      >
        <div
          style={{
            backgroundColor: titleBarColor,
            border: "2px solid",
            borderColor: "#f7c1dd #7a2d59 #7a2d59 #f7c1dd",
            padding: "12px",
            textAlign: "center",
            marginBottom: "15px",
            boxShadow: "inset 1px 1px 0 #f7c1dd, inset -1px -1px 0 #000000",
          }}
        >
          <p
            style={{
              fontFamily: "Arial Black, monospace",
              fontSize: "14px",
              fontWeight: "900",
              color: "#ffffff",
              margin: "0",
              letterSpacing: "1px",
              textShadow: "1px 1px 0 #000000",
            }}
          >
            {title}
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#ead4de",
            border: "2px solid",
            borderColor: "#f8e8f0 #8f4a6e #8f4a6e #f8e8f0",
            padding: "14px 12px",
            boxShadow: "inset 1px 1px 0 #ffffff, inset -1px -1px 0 #9a6d84",
          }}
        >
          <p
            style={{
              fontFamily: "Arial, monospace",
              fontSize: "13px",
              color: "#000000",
              textAlign: "center",
              margin: "0 0 20px 0",
              lineHeight: "1.5",
            }}
          >
            {message}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              padding: "2px",
              backgroundColor: "#cfa8bb",
              border: "1px solid",
              borderColor: "#efd0de #6f3c58 #6f3c58 #efd0de",
              boxShadow: "inset 1px 1px 0 #f7e2ea, inset -1px -1px 0 #6b4760",
            }}
          >
            <button
              type="button"
              onClick={onCancel}
              className="retro-confirmation-cancel"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="retro-confirmation-confirm"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .retro-confirmation-cancel,
        .retro-confirmation-confirm {
          border: 2px solid;
          padding: 10px 24px;
          font-family: "Arial Black", monospace;
          font-size: 13px;
          font-weight: 900;
          cursor: pointer;
          text-align: center;
          letter-spacing: 2px;
          text-shadow: 1px 1px 0 #000000;
          outline: none;
          transition: all 0.05s ease-out;
          min-width: 110px;
        }

        .retro-confirmation-cancel {
          background-color: #e6e6e6;
          color: #333333;
          border-color: #ffffff #505050 #505050 #ffffff;
          box-shadow: inset 1px 1px 0 #ffffff, inset -1px -1px 0 #a0a0a0;
          text-shadow: 1px 1px 0 #ffffff;
        }

        .retro-confirmation-cancel:active {
          transform: scale(0.98);
          background-color: #d4d4d4;
          border-color: #505050 #ffffff #ffffff #505050;
          box-shadow: inset 1px 1px 0 #a0a0a0, inset -1px -1px 0 #ffffff;
        }

        .retro-confirmation-confirm {
          background-color: #d96a9f;
          color: #ffffff;
          border-color: #f7c1dd #7a2d59 #7a2d59 #f7c1dd;
          box-shadow: inset 1px 1px 0 #f7c1dd, inset -1px -1px 0 #000000;
        }

        .retro-confirmation-confirm:active {
          transform: scale(0.98);
          background-color: #b94f84;
          border-color: #7a2d59 #f7c1dd #f7c1dd #7a2d59;
          box-shadow: inset -1px -1px 0 #f7c1dd, inset 1px 1px 0 #000000;
        }
      `}</style>
    </div>
  );
}