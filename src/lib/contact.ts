import { budgetOptions, helpOptions, projectTypes } from "@/content/contact";

/** Shared between the client form and the server action. */

export type InquiryField = "name" | "email" | "company" | "help" | "projectType" | "budget" | "message";

export type Inquiry = Record<InquiryField, string>;

export type FieldErrors = Partial<Record<InquiryField, string>>;

export type ContactState =
  | { status: "idle" }
  | { status: "success"; email: string }
  | { status: "error"; message: string; fieldErrors?: FieldErrors };

export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 5000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const isOption = (value: string, options: { value: string }[]) => options.some((o) => o.value === value);

export function readInquiry(formData: FormData): Inquiry {
  const get = (key: InquiryField) => String(formData.get(key) ?? "").trim();
  return {
    name: get("name"),
    email: get("email"),
    company: get("company"),
    help: get("help"),
    projectType: get("projectType"),
    budget: get("budget"),
    message: get("message"),
  };
}

export function validateInquiry(data: Inquiry): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.name) errors.name = "Please enter your name.";
  else if (data.name.length > 120) errors.name = "That name is a little long.";

  if (!data.email) errors.email = "Please enter your work email.";
  else if (!EMAIL_RE.test(data.email) || data.email.length > 254) errors.email = "Please enter a valid email address.";

  if (data.company.length > 160) errors.company = "That company name is a little long.";

  if (!isOption(data.help, helpOptions)) errors.help = "Choose the option closest to what you need.";

  if (!isOption(data.projectType, projectTypes)) errors.projectType = "Please choose a project type.";

  if (data.budget && !isOption(data.budget, budgetOptions)) errors.budget = "Please choose a budget range.";

  if (!data.message) errors.message = "Tell us a little about your project.";
  else if (data.message.length < MESSAGE_MIN)
    errors.message = `A few more details, please — at least ${MESSAGE_MIN} characters.`;
  else if (data.message.length > MESSAGE_MAX) errors.message = `Please keep it under ${MESSAGE_MAX} characters.`;

  return errors;
}

export const labelFor = (value: string, options: { value: string; label: string }[]) =>
  options.find((o) => o.value === value)?.label ?? value;
