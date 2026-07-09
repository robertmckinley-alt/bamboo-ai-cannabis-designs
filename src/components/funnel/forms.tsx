"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";

export type LeadFormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  industry: string;
};

const emptyLead: LeadFormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  industry: "",
};

export function LeadCaptureForm({
  initial,
  onSubmit,
  submitLabel = "Create My Agent",
}: {
  initial?: Partial<LeadFormState>;
  onSubmit?: (lead: LeadFormState) => void;
  submitLabel?: string;
}) {
  const [lead, setLead] = useState<LeadFormState>({ ...emptyLead, ...initial });
  const [started, setStarted] = useState(false);
  const [error, setError] = useState("");

  function update(field: keyof LeadFormState, value: string) {
    if (!started) {
      setStarted(true);
      trackEvent("lead_form_started", { source: "lead_capture_form" });
    }
    setLead((current) => ({ ...current, [field]: value }));
  }

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        if (!lead.name.trim() || !lead.email.includes("@")) {
          setError("Add your name and a valid email so we can save the agent.");
          return;
        }
        setError("");
        trackEvent("lead_form_submitted", {
          industry: lead.industry,
          company: lead.company,
        });
        // TODO: Replace this client-only capture with an API/CRM submission when the backend is available.
        localStorage.setItem("bamboo-lead", JSON.stringify(lead));
        onSubmit?.(lead);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" htmlFor="lead-name" required>
          <Input
            id="lead-name"
            value={lead.name}
            onChange={(event) => update("name", event.target.value)}
            className="border-white/10 bg-white/[0.06] text-white placeholder:text-white/32"
            placeholder="Jordan Lee"
            aria-invalid={Boolean(error && !lead.name.trim())}
          />
        </Field>
        <Field label="Email" htmlFor="lead-email" required>
          <Input
            id="lead-email"
            type="email"
            value={lead.email}
            onChange={(event) => update("email", event.target.value)}
            className="border-white/10 bg-white/[0.06] text-white placeholder:text-white/32"
            placeholder="jordan@company.com"
            aria-invalid={Boolean(error && !lead.email.includes("@"))}
          />
        </Field>
        <Field label="Phone" htmlFor="lead-phone">
          <Input
            id="lead-phone"
            value={lead.phone}
            onChange={(event) => update("phone", event.target.value)}
            className="border-white/10 bg-white/[0.06] text-white placeholder:text-white/32"
            placeholder="(555) 019-4432"
          />
        </Field>
        <Field label="Company" htmlFor="lead-company">
          <Input
            id="lead-company"
            value={lead.company}
            onChange={(event) => update("company", event.target.value)}
            className="border-white/10 bg-white/[0.06] text-white placeholder:text-white/32"
            placeholder="Bamboo Labs"
          />
        </Field>
        <Field label="Website" htmlFor="lead-website">
          <Input
            id="lead-website"
            value={lead.website}
            onChange={(event) => update("website", event.target.value)}
            className="border-white/10 bg-white/[0.06] text-white placeholder:text-white/32"
            placeholder="https://example.com"
          />
        </Field>
        <Field label="Industry" htmlFor="lead-industry">
          <Input
            id="lead-industry"
            value={lead.industry}
            onChange={(event) => update("industry", event.target.value)}
            className="border-white/10 bg-white/[0.06] text-white placeholder:text-white/32"
            placeholder="Sales"
          />
        </Field>
      </div>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <Button className="h-12 w-full rounded-lg bg-bamboo text-black hover:bg-bamboo/90">
        <Send aria-hidden className="size-4" />
        {submitLabel}
      </Button>
    </form>
  );
}

export function BookingForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    teamSize: "",
    goal: "",
  });
  const [error, setError] = useState("");

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <Card className="rounded-lg border-white/10 bg-white/[0.045] shadow-none">
      <CardContent className="p-5">
        <form
          className="grid gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (!form.name.trim() || !form.email.includes("@")) {
              setError("Name and email are required to request a demo.");
              return;
            }
            setError("");
            trackEvent("book_demo_clicked", {
              company: form.company,
              goal: form.goal,
              source: "booking_form",
            });
            // TODO: Send this payload to calendar routing or CRM once the backend is connected.
            localStorage.setItem("bamboo-demo-request", JSON.stringify(form));
            router.push("/thank-you");
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" htmlFor="booking-name" required>
              <Input
                id="booking-name"
                value={form.name}
                onChange={(event) => update("name", event.target.value)}
                className="border-white/10 bg-white/[0.06] text-white placeholder:text-white/32"
                placeholder="Jordan Lee"
              />
            </Field>
            <Field label="Email" htmlFor="booking-email" required>
              <Input
                id="booking-email"
                type="email"
                value={form.email}
                onChange={(event) => update("email", event.target.value)}
                className="border-white/10 bg-white/[0.06] text-white placeholder:text-white/32"
                placeholder="jordan@company.com"
              />
            </Field>
            <Field label="Company" htmlFor="booking-company">
              <Input
                id="booking-company"
                value={form.company}
                onChange={(event) => update("company", event.target.value)}
                className="border-white/10 bg-white/[0.06] text-white placeholder:text-white/32"
                placeholder="Company"
              />
            </Field>
            <Field label="Team size" htmlFor="booking-team-size">
              <Input
                id="booking-team-size"
                value={form.teamSize}
                onChange={(event) => update("teamSize", event.target.value)}
                className="border-white/10 bg-white/[0.06] text-white placeholder:text-white/32"
                placeholder="10-50"
              />
            </Field>
          </div>
          <Field label="What should Bamboo help with first?" htmlFor="booking-goal">
            <Textarea
              id="booking-goal"
              value={form.goal}
              onChange={(event) => update("goal", event.target.value)}
              className="min-h-28 border-white/10 bg-white/[0.06] text-white placeholder:text-white/32"
              placeholder="Lead capture, customer support, booking, or another workflow"
            />
          </Field>
          {error ? <p className="text-sm text-red-300">{error}</p> : null}
          <Button className="h-12 w-full rounded-lg bg-bamboo text-black hover:bg-bamboo/90">
            <CalendarDays aria-hidden className="size-4" />
            Request Demo Time
          </Button>
        </form>
        <div className="mt-5 rounded-md border border-white/10 bg-black/20 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-white">
            <CheckCircle2 aria-hidden className="size-4 text-bamboo" />
            Calendar embed placeholder
          </div>
          <p className="mt-2 text-sm leading-7 text-white/54">
            Drop Calendly, SavvyCal, HubSpot meetings, or your internal scheduling embed here.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={htmlFor} className="text-sm text-white/72">
        {label}
        {required ? <span className="text-bamboo"> *</span> : null}
      </Label>
      {children}
    </div>
  );
}
