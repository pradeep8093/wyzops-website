import { useId } from "react";
import { cn } from "@/lib/cn";

/**
 * WyzOps mark: a "W" drawn as a path through five connected nodes —
 * a small integration graph.
 */
export function LogoMark({ className }: { className?: string }) {
  const id = useId();
  const gradient = `wz-${id}`;
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={cn("size-7", className)}>
      <defs>
        <linearGradient id={gradient} x1="4" y1="8" x2="28" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6f97ff" />
          <stop offset="0.55" stopColor="#9b7bff" />
          <stop offset="1" stopColor="#38d9f5" />
        </linearGradient>
      </defs>
      <rect x="0.5" y="0.5" width="31" height="31" rx="9" fill="#0d1018" stroke="rgb(255 255 255 / 0.1)" />
      <path
        d="M7 10.5 11.5 21.5 16 13.5 20.5 21.5 25 10.5"
        stroke={`url(#${gradient})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="10.5" r="2" fill="#6f97ff" />
      <circle cx="16" cy="13.5" r="2" fill="#9b7bff" />
      <circle cx="25" cy="10.5" r="2" fill="#38d9f5" />
      <circle cx="11.5" cy="21.5" r="1.5" fill="#0d1018" stroke="#829fff" strokeWidth="1.2" />
      <circle cx="20.5" cy="21.5" r="1.5" fill="#0d1018" stroke="#6ec3f7" strokeWidth="1.2" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="text-[1.0625rem] font-semibold tracking-[-0.02em] text-fg">WyzOps</span>
    </span>
  );
}
