"use client"

import Script from "next/script"
import { useEffect, useState } from "react"
import { getConsentCookie } from "@/lib/client-cookies"

export function PlausibleScript() {
  const [loadScript, setLoadScript] = useState(false)

  useEffect(() => {
    const checkConsent = () => {
      const preferences = getConsentCookie()
      setLoadScript(preferences?.analytics === true)
    }

    checkConsent()
    window.addEventListener("consentUpdated", checkConsent)

    return () => {
      window.removeEventListener("consentUpdated", checkConsent)
    }
  }, [])

  if (!loadScript) return null

  return (
    <Script
      defer
      data-domain="vram-calculator.vercel.app"
      src="https://stats.adrianoamalfi.com/js/script.js"
      strategy="afterInteractive"
    />
  )
}

