"use server";

import { budgetOptions, helpOptions, projectTypes } from "@/content/contact";
import { labelFor, readInquiry, validateInquiry, type ContactState, type Inquiry } from "@/lib/contact";

/**
 * Contact form handler.
 *
 * Delivery is configured with environment variables (see .env.example):
 *   1. CONTACT_WEBHOOK_URL — POSTs the inquiry as JSON (Slack/Zapier/Make/n8n/your API)
 *   2. RESEND_API_KEY + CONTACT_TO_EMAIL (+ CONTACT_FROM_EMAIL) — sends an email via Resend
 * In development with neither configured, inquiries are logged to the server console.
 */
export async function submitInquiry(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real users never fill this hidden field. Pretend success for bots.
  if (String(formData.get("website") ?? "").length > 0) {
    return { status: "success", email: "" };
  }

  const data = readInquiry(formData);
  const fieldErrors = validateInquiry(data);
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  try {
    await deliver(data);
    return { status: "success", email: data.email };
  } catch (error) {
    console.error("[contact] delivery failed:", error);
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again, or email us directly.",
    };
  }
}

function summarize(data: Inquiry) {
  return {
    name: data.name,
    email: data.email,
    company: data.company || "Not specified",
    help: labelFor(data.help, helpOptions),
    projectType: labelFor(data.projectType, projectTypes),
    budget: data.budget ? labelFor(data.budget, budgetOptions) : "Not specified",
    message: data.message,
    submittedAt: new Date().toISOString(),
  };
}

async function deliver(data: Inquiry) {
  const inquiry = summarize(data);
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (webhookUrl) {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "wyzops.inquiry",
        // `text` makes the payload readable as-is by Slack incoming webhooks.
        text: `New inquiry from ${inquiry.name}${data.company ? ` (${data.company})` : ""} — ${inquiry.projectType}`,
        inquiry,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Webhook responded with ${res.status}`);
    return;
  }

  if (resendKey && toEmail) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "WyzOps Website <onboarding@resend.dev>",
        to: [toEmail],
        reply_to: inquiry.email,
        subject: `New inquiry: ${inquiry.projectType} — ${data.company || inquiry.name}`,
        text: [
          `Name: ${inquiry.name}`,
          `Email: ${inquiry.email}`,
          `Company: ${inquiry.company}`,
          `Help with: ${inquiry.help}`,
          `Project type: ${inquiry.projectType}`,
          `Budget: ${inquiry.budget}`,
          "",
          inquiry.message,
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Resend responded with ${res.status}: ${await res.text()}`);
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[contact] No delivery configured — logging inquiry (development only):\n", inquiry);
    return;
  }

  throw new Error("Contact delivery is not configured. Set CONTACT_WEBHOOK_URL or RESEND_API_KEY + CONTACT_TO_EMAIL.");
}
