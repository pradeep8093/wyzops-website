import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d1018",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 32 32" fill="none">
          <path
            d="M7 10.5 11.5 21.5 16 13.5 20.5 21.5 25 10.5"
            stroke="#8a8cff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="7" cy="10.5" r="2.1" fill="#6f97ff" />
          <circle cx="16" cy="13.5" r="2.1" fill="#9b7bff" />
          <circle cx="25" cy="10.5" r="2.1" fill="#38d9f5" />
        </svg>
      </div>
    ),
    size,
  );
}
