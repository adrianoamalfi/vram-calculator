"use client"

import Cookies from "js-cookie"

export const COOKIE_CONSENT_KEY = "cookie-consent"

export type CookieConsent = {
  necessary: boolean
  analytics: boolean
}

export function getConsentCookie(): CookieConsent | null {
  const consent = Cookies.get(COOKIE_CONSENT_KEY)
  return consent ? JSON.parse(consent) : null
}

export function setConsentCookie(consent: CookieConsent) {
  Cookies.set(COOKIE_CONSENT_KEY, JSON.stringify(consent), { expires: 365 })
}

export function getCookie(name: string) {
  return Cookies.get(name)
}

export function setCookie(name: string, value: string, options?: Cookies.CookieAttributes) {
  Cookies.set(name, value, options)
}

export function deleteCookie(name: string) {
  Cookies.remove(name)
}

