"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { CAL_NAMESPACE, CAL_BRAND_COLOR } from "@/lib/cal";

export function CalProvider() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: CAL_BRAND_COLOR } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return null;
}
