"use client";

import { usePrimaryColor } from "@/components/wrappers/PrimaryColorProvider";
import { useEffect } from "react";

const buildFaviconSvg = (accentColor: string) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#000000"/><stop offset="100%" stop-color="#000000"/></linearGradient></defs><rect x="2" y="2" width="60" height="60" rx="16" fill="url(#g)"/><path d="M16 44V20h5l11 14 11-14h5v24h-6V30l-10 12-10-12v14z" fill="${accentColor}"/></svg>`;
};

const PrimaryFaviconSync = () => {
  const { currentColor } = usePrimaryColor();

  useEffect(() => {
    const svg = buildFaviconSvg(currentColor.value);
    const href = `data:image/svg+xml,${encodeURIComponent(svg)}`;

    let faviconEl = document.querySelector<HTMLLinkElement>(
      'link[rel="icon"][data-dynamic="true"]',
    );

    if (!faviconEl) {
      faviconEl = document.createElement("link");
      faviconEl.rel = "icon";
      faviconEl.type = "image/svg+xml";
      faviconEl.setAttribute("data-dynamic", "true");
      document.head.appendChild(faviconEl);
    }

    faviconEl.href = href;
  }, [currentColor.value]);

  return null;
};

export default PrimaryFaviconSync;
