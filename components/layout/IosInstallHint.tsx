"use client";

import { useEffect, useState } from "react";
import { T } from "@/components/i18n/T";
import { SHELL_BN } from "@/lib/bn/shell";
import { installIosHint } from "@/lib/ui";

/** Safari on iOS and iPadOS, in a browser tab (not the installed app). */
function isIosBrowserTab(): boolean {
  const ua = navigator.userAgent;
  // An iPad can report a desktop Mac user agent, so also test for touch.
  const ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  const installed = (navigator as Navigator & { standalone?: boolean }).standalone === true;
  return ios && !installed;
}

/**
 * A one-line install hint for iOS and iPadOS readers. Those browsers never
 * fire `beforeinstallprompt`, so the header Install button (InstallButton)
 * does not show for them. The hint appears in the footer after hydration
 * and only in a browser tab, never in the installed app.
 */
export function IosInstallHint() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(isIosBrowserTab());
  }, []);
  if (!show) return null;
  return (
    <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-text-faint">
      <T en={installIosHint} bn={SHELL_BN.installIosHint} />
    </p>
  );
}
