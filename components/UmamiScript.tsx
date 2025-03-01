import type React from "react"
import Script from "next/script"

export const UmamiScript: React.FC = () => (
  <Script
    src="https://analytics.umami.is/script.js"
    data-website-id="YOUR-UMAMI-WEBSITE-ID"
    strategy="afterInteractive"
  />
)

