"use client";

import Link from "next/link";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type ReactNode,
} from "react";
import { ArrowRight, Check, ChevronDown, LoaderCircle, TriangleAlert } from "lucide-react";
import { submitInquiry } from "@/app/contact/actions";
import { budgetOptions, helpOptions, projectTypes } from "@/content/contact";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/cn";
import {
  MESSAGE_MIN,
  readInquiry,
  validateInquiry,
  type ContactState,
  type FieldErrors,
  type InquiryField,
} from "@/lib/contact";

const initialState: ContactState = { status: "idle" };

const inputBase =
  "w-full rounded-xl border border-line-strong bg-white/[0.03] px-4 text-[0.9375rem] text-fg placeholder:text-subtle transition-[border-color,background-color,box-shadow] duration-200 hover:border-white/20 focus:border-brand-blue/70 focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_rgb(79_125_255/0.15)] focus:outline-none aria-[invalid=true]:border-red-400/60";

const subscribeNoop = () => () => {};

/** True after hydration — lets the form fall back to native validation without JS. */
function useHydrated() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
}

function Field({
  id,
  label,
  optional,
  error,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-medium text-fg">
        {label}
        {optional ? <span className="text-xs font-normal text-subtle">Optional</span> : null}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-300">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-2 text-xs text-subtle">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

const describedBy = (id: string, error?: string, hint?: boolean) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined;

function SelectChevron() {
  return (
    <ChevronDown
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-subtle"
    />
  );
}

function ContactFormInner({ onReset }: { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const projectTypeRef = useRef<HTMLSelectElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();

  // Move focus (and the viewport) to the confirmation once sent.
  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
  }, [state.status]);

  // Pre-select the project type from ?type=… (service cards link here with it).
  useEffect(() => {
    const type = new URLSearchParams(window.location.search).get("type");
    if (type && projectTypeRef.current && projectTypes.some((o) => o.value === type)) {
      projectTypeRef.current.value = type;
    }
  }, []);

  const serverErrors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const errors: FieldErrors = { ...serverErrors, ...clientErrors };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const found = validateInquiry(readInquiry(formData));
    setClientErrors(found);

    const firstInvalid = Object.keys(found)[0] as InquiryField | undefined;
    if (firstInvalid) {
      const el = form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`);
      el?.focus();
      return;
    }
    startTransition(() => formAction(formData));
  }

  function clearError(name: string) {
    if (name in clientErrors) {
      setClientErrors((prev) => {
        const next = { ...prev };
        delete next[name as InquiryField];
        return next;
      });
    }
  }

  if (state.status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="flex flex-col items-start py-6 outline-none sm:py-10">
        <span className="flex size-12 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
          <Check aria-hidden="true" className="size-5" />
        </span>
        <h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-fg sm:text-3xl">Thanks — your inquiry is in.</h2>
        <p className="mt-3 max-w-md leading-relaxed text-muted">
          We&apos;ll read it carefully and reply
          {state.email ? (
            <>
              {" "}
              to <span className="text-fg">{state.email}</span>
            </>
          ) : null}
          . In the meantime, feel free to look around.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/#services"
            className="inline-flex h-11 items-center rounded-full border border-line-strong px-5 text-sm font-medium text-fg transition-colors hover:bg-white/[0.06]"
          >
            Explore services
          </Link>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-11 items-center rounded-full px-5 text-sm font-medium text-muted transition-colors hover:text-fg"
          >
            Send another inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      onChange={(e) => clearError((e.target as unknown as HTMLInputElement).name)}
      noValidate={hydrated}
      aria-describedby={state.status === "error" ? "form-error" : undefined}
      className="space-y-6"
    >
      {state.status === "error" ? (
        <div
          id="form-error"
          role="alert"
          className="flex gap-3 rounded-xl border border-red-400/30 bg-red-400/[0.07] px-4 py-3 text-sm text-red-200"
        >
          <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <p>
            {state.message}{" "}
            {!state.fieldErrors ? (
              <a href={`mailto:${siteConfig.contactEmail}`} className="underline underline-offset-2">
                {siteConfig.contactEmail}
              </a>
            ) : null}
          </p>
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name", errors.name)}
            className={cn(inputBase, "h-12")}
            placeholder="Your name"
          />
        </Field>
        <Field id="email" label="Work email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={254}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email", errors.email)}
            className={cn(inputBase, "h-12")}
            placeholder="you@company.com"
          />
        </Field>
      </div>

      <Field id="company" label="Company" optional error={errors.company}>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          maxLength={160}
          aria-invalid={Boolean(errors.company)}
          aria-describedby={describedBy("company", errors.company)}
          className={cn(inputBase, "h-12")}
          placeholder="Company name"
        />
      </Field>

      <fieldset aria-describedby={errors.help ? "help-error" : undefined}>
        <legend className="text-sm font-medium text-fg">What can we help with?</legend>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {helpOptions.map((option) => (
            <label
              key={option.value}
              className="group flex cursor-pointer items-center gap-3 rounded-xl border border-line-strong bg-white/[0.02] px-3.5 py-3 text-sm text-muted transition-colors duration-200 hover:border-white/20 hover:text-fg has-checked:border-brand-blue/60 has-checked:bg-brand-blue/10 has-checked:text-fg has-focus-visible:shadow-[0_0_0_3px_rgb(147_180_255/0.5)]"
            >
              <input type="radio" name="help" value={option.value} required className="peer sr-only" />
              <span
                aria-hidden="true"
                className="flex size-4 shrink-0 items-center justify-center rounded-full border border-white/25 transition-colors peer-checked:border-brand-sky peer-checked:bg-brand-sky/20"
              >
                <span className="size-1.5 rounded-full bg-brand-sky opacity-0 transition-opacity group-has-checked:opacity-100" />
              </span>
              {option.label}
            </label>
          ))}
        </div>
        {errors.help ? (
          <p id="help-error" className="mt-2 text-sm text-red-300">
            {errors.help}
          </p>
        ) : null}
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="projectType" label="Project type" error={errors.projectType}>
          <div className="relative">
            <select
              ref={projectTypeRef}
              id="projectType"
              name="projectType"
              required
              defaultValue=""
              aria-invalid={Boolean(errors.projectType)}
              aria-describedby={describedBy("projectType", errors.projectType)}
              className={cn(inputBase, "h-12 appearance-none pr-10 invalid:text-subtle")}
            >
              <option value="" disabled className="bg-canvas">
                Select a project type
              </option>
              {projectTypes.map((option) => (
                <option key={option.value} value={option.value} className="bg-canvas text-fg">
                  {option.label}
                </option>
              ))}
            </select>
            <SelectChevron />
          </div>
        </Field>
        <Field id="budget" label="Budget" optional error={errors.budget}>
          <div className="relative">
            <select
              id="budget"
              name="budget"
              defaultValue=""
              aria-invalid={Boolean(errors.budget)}
              aria-describedby={describedBy("budget", errors.budget)}
              className={cn(inputBase, "h-12 appearance-none pr-10")}
            >
              {budgetOptions.map((option) => (
                <option key={option.value || "none"} value={option.value} className="bg-canvas">
                  {option.label}
                </option>
              ))}
            </select>
            <SelectChevron />
          </div>
        </Field>
      </div>

      <Field
        id="message"
        label="Message"
        error={errors.message}
        hint="A few sentences is plenty — the problem, the systems involved, and any timing."
      >
        <textarea
          id="message"
          name="message"
          required
          minLength={MESSAGE_MIN}
          maxLength={5000}
          rows={6}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message", errors.message, true)}
          className={cn(inputBase, "min-h-36 resize-y py-3 leading-relaxed")}
          placeholder="What are you trying to build, integrate, automate, or improve?"
        />
      </Field>

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-subtle sm:max-w-xs">
          By sending this form you agree to our{" "}
          <Link href="/privacy" className="text-muted underline underline-offset-2 hover:text-fg">
            Privacy Policy
          </Link>
          .
        </p>
        <button
          type="submit"
          disabled={pending}
          className="group/btn inline-flex h-12 items-center justify-center gap-2 rounded-full bg-fg px-7 text-[0.9375rem] font-medium text-canvas shadow-[0_0_0_1px_rgb(255_255_255/0.1),0_8px_30px_-6px_rgb(79_125_255/0.45)] transition-[background-color,box-shadow,transform] duration-300 hover:bg-white hover:shadow-[0_0_0_1px_rgb(255_255_255/0.2),0_10px_40px_-6px_rgb(79_125_255/0.65)] active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? (
            <>
              <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send Inquiry
              <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export function ContactForm() {
  const [formKey, setFormKey] = useState(0);
  return <ContactFormInner key={formKey} onReset={() => setFormKey((k) => k + 1)} />;
}
