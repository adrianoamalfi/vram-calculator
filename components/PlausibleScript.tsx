"use client"

import type React from "react"

import Script from "next/script"
import { useEffect, useState } from "react"
import { getConsentCookie } from "../lib/cookies"

export const PlausibleScript: React.FC = () => {
  const [consentGiven, setConsentGiven] = useState(false)

  useEffect(() => {
    const consent = getConsentCookie()
    setConsentGiven(consent?.analytics ?? false)
  }, [])

  if (!consentGiven) return null

  return <Script src="https://plausible.io/js/script.js" data-domain="YOUR-DOMAIN" strategy="afterInteractive" />
}

