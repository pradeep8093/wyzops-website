/**
 * True while the site is gated behind the "Coming soon" screen (IS_COMING_SOON=true).
 * next.config.ts normalises the env var and inlines it at build time.
 */
export const isComingSoon = process.env.IS_COMING_SOON === "true";
