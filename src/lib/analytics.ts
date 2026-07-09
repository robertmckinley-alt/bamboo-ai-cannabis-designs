export type AnalyticsEvent =
  | "page_view"
  | "hero_cta_clicked"
  | "secondary_cta_clicked"
  | "industry_selected"
  | "agent_builder_started"
  | "builder_step_completed"
  | "builder_step_back"
  | "builder_step_skipped"
  | "agent_preview_viewed"
  | "lead_form_started"
  | "lead_form_submitted"
  | "book_demo_clicked"
  | "pricing_viewed"
  | "pricing_plan_clicked"
  | "faq_opened"
  | "exit_intent_shown"
  | "exit_intent_submitted"
  | "mobile_sticky_cta_clicked";

type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    analytics?: {
      track?: (event: string, payload?: AnalyticsPayload) => void;
    };
  }
}

export function trackEvent(event: AnalyticsEvent, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const enrichedPayload = {
    ...payload,
    path: window.location.pathname,
    timestamp: new Date().toISOString(),
  };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...enrichedPayload });
  window.analytics?.track?.(event, enrichedPayload);

  if (process.env.NODE_ENV === "development") {
    console.info("[analytics]", event, enrichedPayload);
  }
}
