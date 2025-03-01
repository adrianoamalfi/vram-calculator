import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalculatorIcon, CpuIcon, SlidersIcon } from "lucide-react"
import modelsAndGpus from "@/data/models-and-gpus.json"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background via-background/90 to-background/80 border-b">
      <div className="container px-4 md:px-6 max-w-6xl">
        <div className="flex flex-col items-center space-y-6 text-center">
          <Badge variant="outline" className="px-3 py-1 text-sm">
            Open Source Tool
          </Badge>
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              <span className="bg-gradient-to-r from-primary via-primary to-primary/50 bg-clip-text text-transparent">
                VRAM Calculator
              </span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-sm sm:text-base md:text-xl">
              Accurately estimate the VRAM needed for your Large Language Model deployments. Optimize your
              infrastructure and avoid out-of-memory errors.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
              asChild
            >
              <a href="#calculator" className="flex items-center justify-center">
                Get Started <ArrowDown className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-primary/20 hover:bg-primary/10 w-full sm:w-auto"
              asChild
            >
              <a href="https://github.com/adrianoamalfi/LLM-VRAM-Calculator" target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
            </Button>
          </div>

          <div className="w-full max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
              <div className="flex flex-col items-center p-6 bg-card/60 backdrop-blur-sm rounded-lg border border-border/50 shadow-lg">
                <CalculatorIcon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Precise Estimation</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Accurately calculate VRAM requirements for {modelsAndGpus.commonModels.length} preset LLM models
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-card/60 backdrop-blur-sm rounded-lg border border-border/50 shadow-lg">
                <CpuIcon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Hardware Compatibility</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Check compatibility with {modelsAndGpus.gpuModels.length} different GPU types
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-card/60 backdrop-blur-sm rounded-lg border border-border/50 shadow-lg">
                <SlidersIcon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Advanced Options</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Fine-tune with precision types, context length, and optimization techniques
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

