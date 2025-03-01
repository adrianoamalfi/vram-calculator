"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { getConsentCookie, setConsentCookie, type CookieConsent as ConsentType } from "@/lib/client-cookies"
import { CookieIcon } from "lucide-react"

export function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<ConsentType>({
    necessary: true,
    analytics: false,
  })

  useEffect(() => {
    const savedPreferences = getConsentCookie()
    if (savedPreferences) {
      setPreferences(savedPreferences)
    } else {
      setIsOpen(true)
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
    }

    setPreferences(allAccepted)
    setConsentCookie(allAccepted)
    setIsOpen(false)
    window.dispatchEvent(new Event("consentUpdated"))
  }

  const handleAcceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
    }

    setPreferences(necessaryOnly)
    setConsentCookie(necessaryOnly)
    setIsOpen(false)
    window.dispatchEvent(new Event("consentUpdated"))
  }

  const handleSavePreferences = () => {
    setConsentCookie(preferences)
    setIsOpen(false)
    setShowSettings(false)
    window.dispatchEvent(new Event("consentUpdated"))
  }

  const toggleSettings = () => {
    setShowSettings(!showSettings)
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-background/95 backdrop-blur-sm border-t">
      {!showSettings ? (
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <CookieIcon className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Cookie Consent</h3>
            </div>
            <p className="text-sm text-muted-foreground flex-1 max-w-2xl">
              We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept All", you
              consent to our use of cookies.
            </p>
            <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
              <Button variant="outline" size="sm" onClick={toggleSettings}>
                Cookie Settings
              </Button>
              <Button variant="outline" size="sm" onClick={handleAcceptNecessary}>
                Necessary Only
              </Button>
              <Button size="sm" onClick={handleAcceptAll}>
                Accept All
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Card className="container max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Cookie Settings</CardTitle>
            <CardDescription>
              Manage your cookie preferences. Necessary cookies are always enabled as they are essential for the website
              to function properly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="necessary" className="flex flex-col space-y-1">
                <span>Strictly Necessary Cookies</span>
                <span className="font-normal text-sm text-muted-foreground">
                  These cookies are essential for the website to function properly and include basic analytics that
                  don't use cookies.
                </span>
              </Label>
              <Switch id="necessary" checked disabled />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="analytics" className="flex flex-col space-y-1">
                <span>Analytics Cookies</span>
                <span className="font-normal text-sm text-muted-foreground">
                  These cookies help us understand how visitors interact with the website using Plausible Analytics.
                </span>
              </Label>
              <Switch
                id="analytics"
                checked={preferences.analytics}
                onCheckedChange={(checked) => setPreferences({ ...preferences, analytics: checked })}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowSettings(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePreferences}>Save Preferences</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

