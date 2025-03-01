"use client"

import Link from "next/link"
import { MemoryStick, Github, UserCircle, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CookieSettingsButton } from "@/components/cookie-settings-button"
import { useState } from "react"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <MemoryStick className="h-6 w-6 text-primary" />
            <span className="hidden md:inline-block">VRAM Calculator</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-accent"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <CookieSettingsButton />
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://adrianoamalfi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <UserCircle className="h-4 w-4" />
              About me
            </a>
          </Button>
          <Button variant="default" size="sm" asChild>
            <a href="https://github.com/adrianoamalfi/vram-calculator" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              Contribute
            </a>
          </Button>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b p-4 flex flex-col gap-2 md:hidden">
            <Button variant="ghost" size="sm" asChild className="justify-start">
              <Link href="/">Home</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="justify-start">
              <Link href="/about">About</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="justify-start">
              <Link href="/privacy-policy">Privacy Policy</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="justify-start">
              <Link href="/cookie-policy">Cookie Policy</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="justify-start">
              <Link href="/terms">Terms of Service</Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="justify-start">
              <a
                href="https://adrianoamalfi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <UserCircle className="h-4 w-4" />
                About me
              </a>
            </Button>
            <Button variant="default" size="sm" asChild className="justify-start">
              <a href="https://github.com/adrianoamalfi/vram-calculator" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                Contribute
              </a>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}

