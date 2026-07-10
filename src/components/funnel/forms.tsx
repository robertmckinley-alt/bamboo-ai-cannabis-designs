"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, LoaderCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";

export type LeadFormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  industry: string;
};

const emptyLead: LeadFormState = { name: "", email: "", phone: "", company: "", website: "", industry: "" };

export function LeadCaptureForm({ initial, onSubmit, submitLabel = "Save My Agent Blueprint" }: { initial?: Partial<LeadFormState>; onSubmit?: (lead: LeadFormState) => void; submitLabel?: string }) {
  const [lead, setLead] = useState<LeadFormState>({ ...emptyLead, ...initial });
  const [started, setStarted] = useState(false);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormState, string>>>({});
  const timerRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
  }, []);

  function update(field: keyof LeadFormState, value: string) {
    if (!started) {
      setStarted(true);
      trackEvent("lead_form_started", { source: "blueprint_save" });
    }
    setLead((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  return (
    <form
      className="grid gap-5"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        if (pending) return;
        const nextErrors: typeof errors = {};
        if (!lead.name.trim()) nextErrors.name = "Enter your name so the blueprint has an owner.";
        if (!/^\S+@\S+\.\S+$/.test(lead.email)) nextErrors.email = "Enter a work email in the format name@company.com.";
        if (lead.website && !/^https?:\/\//i.test(lead.website)) nextErrors.website = "Start the website address with http:// or https://.";
        setErrors(nextErrors);
        const first = Object.keys(nextErrors)[0];
        if (first) {
          document.getElementById(`lead-${first}`)?.focus();
          return;
        }
        setPending(true);
        timerRef.current = window.setTimeout(() => {
          localStorage.setItem("bamboo-lead", JSON.stringify(lead));
          trackEvent("lead_form_submitted", { industry: lead.industry, source: "blueprint_save" });
          onSubmit?.(lead);
          setPending(false);
        }, 500);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" htmlFor="lead-name" required error={errors.name}>
          <Input id="lead-name" autoComplete="name" value={lead.name} onChange={(event) => update("name", event.target.value)} className="h-11 border-white/14 bg-white/[0.055] text-white placeholder:text-white/60" placeholder="Jordan Lee" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "lead-name-error" : undefined} />
        </Field>
        <Field label="Work email" htmlFor="lead-email" required error={errors.email}>
          <Input id="lead-email" type="email" autoComplete="email" value={lead.email} onChange={(event) => update("email", event.target.value)} className="h-11 border-white/14 bg-white/[0.055] text-white placeholder:text-white/60" placeholder="jordan@company.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "lead-email-error" : undefined} />
        </Field>
        <Field label="Phone" htmlFor="lead-phone" error={errors.phone}>
          <Input id="lead-phone" type="tel" autoComplete="tel" value={lead.phone} onChange={(event) => update("phone", event.target.value)} className="h-11 border-white/14 bg-white/[0.055] text-white placeholder:text-white/60" placeholder="(555) 019-4432" />
        </Field>
        <Field label="Company" htmlFor="lead-company" error={errors.company}>
          <Input id="lead-company" autoComplete="organization" value={lead.company} onChange={(event) => update("company", event.target.value)} className="h-11 border-white/14 bg-white/[0.055] text-white placeholder:text-white/60" placeholder="Bamboo Labs" />
        </Field>
        <Field label="Website" htmlFor="lead-website" error={errors.website}>
          <Input id="lead-website" type="url" autoComplete="url" inputMode="url" value={lead.website} onChange={(event) => update("website", event.target.value)} className="h-11 border-white/14 bg-white/[0.055] text-white placeholder:text-white/60" placeholder="https://example.com" aria-invalid={Boolean(errors.website)} aria-describedby={errors.website ? "lead-website-error" : undefined} />
        </Field>
        <Field label="Industry" htmlFor="lead-industry" error={errors.industry}>
          <Input id="lead-industry" value={lead.industry} onChange={(event) => update("industry", event.target.value)} className="h-11 border-white/14 bg-white/[0.055] text-white placeholder:text-white/60" placeholder="Sales" />
        </Field>
      </div>
      <Button disabled={pending} className="h-12 w-full rounded-md bg-bamboo font-semibold text-background hover:bg-bamboo/90 disabled:opacity-70">
        {pending ? <LoaderCircle aria-hidden className="size-4 animate-spin motion-reduce:animate-none" /> : <Send aria-hidden className="size-4" />}
        {pending ? "Saving Your Blueprint..." : submitLabel}
      </Button>
      <p className="text-center text-xs leading-5 text-white/52">Your details stay attached to this blueprint. No credit card required.</p>
    </form>
  );
}

export function BookingForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", company: "", website: "", teamSize: "", workflow: "", goal: "" });
  const [started, setStarted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const timerRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
  }, []);

  function update(field: keyof typeof form, value: string) {
    if (!started) {
      setStarted(true);
      trackEvent("demo_form_started", { source: "strategy_form" });
    }
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  }

  return (
    <Card className="rounded-lg border-white/12 bg-surface-raised py-0 shadow-none">
      <CardContent className="p-5 sm:p-7">
        <form
          className="grid gap-5"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            if (pending) return;
            if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email) || !form.company.trim()) {
              setError("Enter your name, company, and a valid work email to request the call.");
              return;
            }
            setPending(true);
            timerRef.current = window.setTimeout(() => {
              localStorage.setItem("bamboo-demo-request", JSON.stringify(form));
              trackEvent("demo_form_submitted", { source: "strategy_form", workflow: form.workflow, team_size: form.teamSize });
              router.push("/thank-you");
            }, 500);
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" htmlFor="booking-name" required>
              <Input id="booking-name" autoComplete="name" value={form.name} onChange={(event) => update("name", event.target.value)} className="h-11 border-white/14 bg-white/[0.055] text-white placeholder:text-white/60" placeholder="Jordan Lee" />
            </Field>
            <Field label="Work email" htmlFor="booking-email" required>
              <Input id="booking-email" type="email" autoComplete="email" value={form.email} onChange={(event) => update("email", event.target.value)} className="h-11 border-white/14 bg-white/[0.055] text-white placeholder:text-white/60" placeholder="jordan@company.com" />
            </Field>
            <Field label="Company" htmlFor="booking-company" required>
              <Input id="booking-company" autoComplete="organization" value={form.company} onChange={(event) => update("company", event.target.value)} className="h-11 border-white/14 bg-white/[0.055] text-white placeholder:text-white/60" placeholder="Company" />
            </Field>
            <Field label="Website" htmlFor="booking-website">
              <Input id="booking-website" type="url" autoComplete="url" value={form.website} onChange={(event) => update("website", event.target.value)} className="h-11 border-white/14 bg-white/[0.055] text-white placeholder:text-white/60" placeholder="https://example.com" />
            </Field>
            <Field label="Team size" htmlFor="booking-team-size">
              <select id="booking-team-size" value={form.teamSize} onChange={(event) => update("teamSize", event.target.value)} className="h-11 w-full rounded-md border border-white/14 bg-[oklch(0.14_0.03_158)] px-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bamboo">
                <option value="">Choose a range</option><option>1-9</option><option>10-50</option><option>51-200</option><option>201+</option>
              </select>
            </Field>
            <Field label="Primary workflow" htmlFor="booking-workflow">
              <select id="booking-workflow" value={form.workflow} onChange={(event) => update("workflow", event.target.value)} className="h-11 w-full rounded-md border border-white/14 bg-[oklch(0.14_0.03_158)] px-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bamboo">
                <option value="">Choose a workflow</option><option>Lead qualification</option><option>Customer support</option><option>Appointment booking</option><option>Product guidance</option><option>Request routing</option>
              </select>
            </Field>
          </div>
          <Field label="What should Bamboo help with first?" htmlFor="booking-goal">
            <Textarea id="booking-goal" value={form.goal} onChange={(event) => update("goal", event.target.value)} className="min-h-28 border-white/14 bg-white/[0.055] text-white placeholder:text-white/60" placeholder="Describe the workflow, where demand is lost, and the next action you want." />
          </Field>
          {error ? <p role="alert" className="text-sm leading-6 text-signal-coral">{error}</p> : null}
          <Button disabled={pending} className="h-12 w-full rounded-md bg-bamboo font-semibold text-background hover:bg-bamboo/90 disabled:opacity-70">
            {pending ? <LoaderCircle aria-hidden className="size-4 animate-spin motion-reduce:animate-none" /> : <CalendarDays aria-hidden className="size-4" />}
            {pending ? "Saving Your Request..." : "Request a Strategy Call"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function Field({ label, htmlFor, required, error, children }: { label: string; htmlFor: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={htmlFor} className="text-sm text-white/78">{label}{required ? <span className="text-bamboo"> *</span> : null}</Label>
      {children}
      {error ? <p id={`${htmlFor}-error`} role="alert" className="text-xs leading-5 text-signal-coral">{error}</p> : null}
    </div>
  );
}
