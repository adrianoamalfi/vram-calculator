import { HeroSection } from "@/components/hero-section"
import { Calculator } from "@/components/calculator"
import { ExplanationSection } from "@/components/explanation-section"
import { HowItWorks } from "@/components/how-it-works"
import { AboutSection } from "@/components/about-section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function Home() {
  return (
    <>
      <HeroSection />

      <div className="container px-4 py-8 md:py-12 lg:py-16 max-w-7xl mx-auto">
        <Tabs defaultValue="calculator" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="calculator" className="space-y-12">
            <Calculator />
            <Separator />
            <ExplanationSection />
          </TabsContent>

          <TabsContent value="how-it-works">
            <HowItWorks />
          </TabsContent>

          <TabsContent value="about">
            <AboutSection />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

