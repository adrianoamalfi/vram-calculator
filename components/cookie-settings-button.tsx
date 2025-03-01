"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { CookieIcon } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { getConsentCookie, setConsentCookie, type CookieConsent } from "@/lib/client-cookies"

export function CookieSettingsButton() {
  const [preferences, setPreferences] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
  })

  const [open, setOpen] = useState(false)

  useEffect(() => {
    const savedPreferences = getConsentCookie()
    if (savedPreferences) {
      setPreferences(savedPreferences)
    }
  }, [])

  const handleSavePreferences = () => {
    setConsentCookie(preferences)
    setOpen(false)
    window.dispatchEvent(new Event("consentUpdated"))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 relative"
          aria-label="Cookie Settings"
          onClick={() => setOpen(true)}
        >
          <CookieIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <Card className="border-0 shadow-none">
          <CardHeader className="px-0 pt-0">
            <CardTitle>Cookie Settings</CardTitle>
            <CardDescription>
              Manage your cookie preferences. Necessary cookies are always enabled as they are essential for the website
              to function properly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-0">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="necessary-dialog" className="flex flex-col space-y-1">
                <span>Strictly Necessary Cookies</span>
                <span className="font-normal text-sm text-muted-foreground">
                  These cookies are essential for the website to function properly and include basic analytics that
                  don't use cookies.
                </span>
              </Label>
              <Switch id="necessary-dialog" checked disabled />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="analytics-dialog" className="flex flex-col space-y-1">
                <span>Analytics Cookies</span>
                <span className="font-normal text-sm text-muted-foreground">
                  These cookies help us understand how visitors interact with the website using Plausible Analytics.
                </span>
              </Label>
              <Switch
                id="analytics-dialog"
                checked={preferences.analytics}
                onCheckedChange={(checked) => setPreferences({ ...preferences, analytics: checked })}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between px-0 pb-0">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePreferences}>Save Preferences</Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  )
}

