import { MemoryStick, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background py-8">
      <div className="container flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <MemoryStick className="h-5 w-5 text-primary" />
            <span className="font-medium">VRAM Calculator</span>
          </div>
          <p className="text-sm text-muted-foreground text-center md:text-left">
            A free and open-source tool for estimating VRAM requirements for LLMs
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Resources</h3>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link
              href="https://github.com/adrianoamalfi/vram-calculator"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </Link>
            <Link
              href="https://github.com/adrianoamalfi/vram-calculator/issues"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Report an Issue
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Legal</h3>
            <Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" className="text-muted-foreground hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4">
          <Button variant="outline" size="sm" asChild className="w-full md:w-auto">
            <a href="https://github.com/adrianoamalfi/vram-calculator" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              Contribute on GitHub
            </a>
          </Button>
          <p className="text-xs text-muted-foreground text-center md:text-right">
            &copy; {new Date().getFullYear()} VRAM Calculator. MIT License.
          </p>
        </div>
      </div>
    </footer>
  )
}

