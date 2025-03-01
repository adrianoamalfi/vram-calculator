"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { getConsentCookie, setConsentCookie, type CookieConsent as ConsentType } from "../lib/cookies"

export const CookieConsent: React.FC = () => {
  const [consent, setConsent] = useState<ConsentType | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const storedConsent = getConsentCookie()
    if (storedConsent) {
      setConsent(storedConsent)
    } else {
      setVisible(true)
    }
  }, [])

  const handleAccept = () => {
    const newConsent = { analytics: true }
    setConsent(newConsent)
    setConsentCookie(newConsent)
    setVisible(false)
  }

  const handleReject = () => {
    const newConsent = { analytics: false }
    setConsent(newConsent)
    setConsentCookie(newConsent)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4">
      <p className="mb-2">
        We use cookies to improve your experience. By using this site, you agree to our use of cookies.
      </p>
      <div className="flex space-x-4">
        <button onClick={handleAccept} className="bg-blue-500 text-white px-4 py-2 rounded">
          Accept All
        </button>
        <button onClick={handleReject} className="bg-gray-300 text-black px-4 py-2 rounded">
          Reject Non-Essential
        </button>
      </div>
    </div>
  )
}

