"use client";

import { useEffect } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

export function TrackOnMount({
  event,
  payload,
}: {
  event: AnalyticsEvent;
  payload?: Record<string, string | number | boolean>;
}) {
  useEffect(() => {
    trackEvent(event, payload);
    // Fire once per mount; payload identity churn shouldn't re-fire.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
