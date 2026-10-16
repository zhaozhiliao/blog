import Script from "next/script";
import { SITE_ORIGIN } from "@/lib/site";

// Measurement IDs are public. An empty override disables tracking.
const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-32VWT7YKZG";

export function GoogleAnalytics() {
  if (process.env.NODE_ENV !== "production" || !/^G-[A-Z0-9]+$/.test(measurementId)) return null;

  return (
    <Script id="google-analytics" strategy="afterInteractive">
      {`(() => {
        if (window.location.origin !== ${JSON.stringify(SITE_ORIGIN)}) return;
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); };
        window.gtag('js', new Date());
        window.gtag('config', ${JSON.stringify(measurementId)});
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + ${JSON.stringify(measurementId)};
        document.head.appendChild(script);
      })();`}
    </Script>
  );
}
