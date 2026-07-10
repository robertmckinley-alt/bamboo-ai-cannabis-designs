"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { builderGoals } from "@/data/funnel";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const teamSizes = ["Just me", "2–10", "11–50", "51–200", "200+"];

type StrategyCallRequest = {
  name: string;
  email: string;
  company: string;
  website: string;
  teamSize: string;
  workflow: string;
  notes: string;
};

const emptyRequest: StrategyCallRequest = {
  name: "",
  email: "",
  company: "",
  website: "",
  teamSize: "",
  workflow: "",
  notes: "",
};

export function StrategyCallForm() {
  const router = useRouter();
  const [form, setForm] = useState<StrategyCallRequest>(emptyRequest);
  const [attempted, setAttempted] = useState(false);
  const [pending, setPending] = useState(false);
  const started = useRef(false);

  function update<K extends keyof StrategyCallRequest>(field: K, value: StrategyCallRequest[K]) {
    if (!started.current) {
      started.current = true;
      trackEvent("demo_form_started", { source: "book_demo" });
    }
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const nameInvalid = attempted && !form.name.trim();
  const emailInvalid = attempted && !emailPattern.test(form.email.trim());
  const companyInvalid = attempted && !form.company.trim();

  return (
    <form
      className="grid gap-5"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        if (pending) return;
        setAttempted(true);
        if (!form.name.trim() || !emailPattern.test(form.email.trim()) || !form.company.trim()) {
          const firstInvalid = document.querySelector<HTMLElement>("[aria-invalid='true']");
          firstInvalid?.focus();
          return;
        }
        setPending(true);
        trackEvent("demo_form_submitted", {
          source: "book_demo",
          workflow: form.workflow,
          team_size_band: form.teamSize,
        });
        // Local persistence in this build; structured so a server action or
        // scheduling API can replace it without touching the UI.
        localStorage.setItem("bamboo-strategy-call-request", JSON.stringify({ ...form, submittedAt: new Date().toISOString() }));
        router.push("/thank-you");
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="call-name" label="Name" required error={nameInvalid ? "Your name is required." : undefined}>
          <Input
            id="call-name"
            autoComplete="name"
            value={form.name}
            aria-invalid={nameInvalid || undefined}
            aria-describedby={nameInvalid ? "call-name-error" : undefined}
            onChange={(event) => update("name", event.target.value)}
            className="h-12 border-line-strong bg-surface-1 text-ink-1 placeholder:text-ink-3"
            placeholder="Jordan Lee"
          />
        </Field>
        <Field id="call-email" label="Work email" required error={emailInvalid ? "Enter a valid work email." : undefined}>
          <Input
            id="call-email"
            type="email"
            autoComplete="email"
            value={form.email}
            aria-invalid={emailInvalid || undefined}
            aria-describedby={emailInvalid ? "call-email-error" : undefined}
            onChange={(event) => update("email", event.target.value)}
            className="h-12 border-line-strong bg-surface-1 text-ink-1 placeholder:text-ink-3"
            placeholder="jordan@company.com"
          />
        </Field>
        <Field id="call-company" label="Company" required error={companyInvalid ? "Company is required." : undefined}>
          <Input
            id="call-company"
            autoComplete="organization"
            value={form.company}
            aria-invalid={companyInvalid || undefined}
            aria-describedby={companyInvalid ? "call-company-error" : undefined}
            onChange={(event) => update("company", event.target.value)}
            className="h-12 border-line-strong bg-surface-1 text-ink-1 placeholder:text-ink-3"
            placeholder="Company"
          />
        </Field>
        <Field id="call-website" label="Website">
          <Input
            id="call-website"
            type="url"
            inputMode="url"
            autoComplete="url"
            value={form.website}
            onChange={(event) => update("website", event.target.value)}
            className="h-12 border-line-strong bg-surface-1 text-ink-1 placeholder:text-ink-3"
            placeholder="https://company.com"
          />
        </Field>
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-ink-2">Team size</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {teamSizes.map((size) => {
            const active = form.teamSize === size;
            return (
              <button
                key={size}
                type="button"
                aria-pressed={active}
                onClick={() => update("teamSize", size)}
                className={cn(
                  "h-11 rounded-md border px-4 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  active
                    ? "border-bamboo bg-bamboo/10 text-bamboo"
                    : "border-line-strong text-ink-2 hover:border-bamboo-deep hover:text-ink-1"
                )}
              >
                {size}
              </button>
            );
          })}
        </div>
      </fieldset>

      <Field id="call-workflow" label="Primary workflow">
        <select
          id="call-workflow"
          value={form.workflow}
          onChange={(event) => update("workflow", event.target.value)}
          className="h-12 w-full rounded-md border border-line-strong bg-surface-1 px-3 text-sm text-ink-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">Choose the workflow to map first</option>
          {builderGoals.map((goal) => (
            <option key={goal} value={goal}>
              {goal}
            </option>
          ))}
        </select>
      </Field>

      <Field id="call-notes" label="What should Bamboo help with first?">
        <Textarea
          id="call-notes"
          value={form.notes}
          onChange={(event) => update("notes", event.target.value)}
          className="min-h-24 border-line-strong bg-surface-1 text-ink-1 placeholder:text-ink-3"
          placeholder="Optional — anything that helps us prepare."
        />
      </Field>

      <Button
        type="submit"
        disabled={pending}
        className="h-12 w-full min-w-56 rounded-md bg-bamboo font-semibold text-primary-foreground hover:bg-bamboo/90 sm:w-auto sm:justify-self-start"
      >
        {pending ? "Sending request…" : "Request the Strategy Call"}
      </Button>
      <p aria-live="polite" className="sr-only">
        {pending ? "Sending your request" : ""}
      </p>
      <p className="text-xs leading-5 text-ink-3">
        Submitting sends your request to the Bamboo team. You&apos;ll pick the exact time
        together — nothing is booked until you confirm it.
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id} className="text-sm font-medium text-ink-2">
        {label}
        {required ? <span className="text-bamboo"> *</span> : null}
      </Label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs leading-5 text-signal-coral">
          {error}
        </p>
      ) : null}
    </div>
  );
}
