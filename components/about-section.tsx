import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Github, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AboutSection() {
  return (
    <div className="container max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            About VRAM Calculator
          </CardTitle>
          <CardDescription>Your trusted companion for LLM deployment planning</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <p>
              VRAM Calculator was created to help AI researchers, engineers, and enthusiasts accurately estimate the
              video memory requirements for running Large Language Models. As LLMs continue to grow in size and
              complexity, understanding their resource requirements becomes increasingly important for efficient
              deployment.
            </p>

            <div className="grid gap-8 md:grid-cols-2 my-8">
              <div className="bg-muted/50 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Our Mission</h3>
                <p>
                  Our mission is to simplify the process of planning LLM deployments by providing accurate memory
                  requirement estimates. We aim to help you:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Avoid out-of-memory errors during model training and inference</li>
                  <li>Optimize your hardware resources for cost-effective AI deployment</li>
                  <li>Make informed decisions when purchasing or allocating GPU resources</li>
                  <li>Understand the memory implications of different model configurations</li>
                </ul>
              </div>

              <div className="bg-muted/50 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Methodology</h3>
                <p>
                  Our calculator uses industry-standard formulas and heuristics derived from academic research and
                  practical experience with LLM deployments. While we strive for accuracy, please note that actual
                  memory usage may vary based on specific implementation details, software frameworks, and optimization
                  techniques.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-medium mb-3">The Team</h3>
            <div className="flex flex-col md:flex-row gap-6 items-center mb-8">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Adriano Amalfi" />
                <AvatarFallback>AA</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-lg font-medium">Adriano Amalfi</h4>
                <p className="text-muted-foreground mb-2">Project Creator & Maintainer</p>
                <p>
                  AI researcher and developer passionate about making advanced technologies accessible to everyone.
                  Created VRAM Calculator to help others navigate the complex world of LLM deployment.
                </p>
              </div>
            </div>

            <div className="bg-muted p-6 rounded-lg my-6 flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1">
                <h3 className="text-xl font-medium mb-2">Stay Connected</h3>
                <p className="text-muted-foreground mb-4">
                  Follow us for updates, new features, and insights into LLM optimization.
                </p>
                <div className="flex gap-4">
                  <Button variant="outline" size="icon">
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Twitter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-medium mb-2">Contribute</h3>
                <p className="text-muted-foreground mb-4">
                  This is an open-source project. We welcome contributions from the community to help improve the
                  calculator.
                </p>
                <Button asChild>
                  <a
                    href="https://github.com/adrianoamalfi/LLM-VRAM-Calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Join on GitHub
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

