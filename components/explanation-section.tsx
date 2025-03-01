import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Cpu, MemoryStick, Zap } from "lucide-react"

export function ExplanationSection() {
  return (
    <section id="explanation" className="container px-4 py-8 md:py-12 max-w-5xl mx-auto">
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MemoryStick className="h-5 w-5 text-primary" />
              What is VRAM?
            </CardTitle>
            <CardDescription>Video Random Access Memory and its role in AI computation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              VRAM (Video Random Access Memory) is specialized memory on graphics cards (GPUs) that stores data needed
              for rendering images and performing computations. Unlike system RAM, VRAM is directly accessible by the
              GPU, making it ideal for parallel processing tasks like running Large Language Models.
            </p>
            <p>
              Modern GPUs have become essential for AI workloads due to their ability to perform thousands of
              calculations simultaneously. When running an LLM, the model's parameters (weights) and temporary data must
              fit within the available VRAM.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-primary" />
              Why VRAM Matters for LLMs
            </CardTitle>
            <CardDescription>Understanding the critical role of memory in LLM performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Large Language Models contain billions of parameters that must be loaded into memory for inference or
              training. If a model's memory requirements exceed available VRAM, it will fail to run or require complex
              techniques like model sharding or offloading to CPU memory (which significantly reduces performance).
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Model weights must fit in VRAM</li>
              <li>KV cache grows with context length</li>
              <li>Activations require additional memory</li>
              <li>Training requires even more memory for gradients and optimizer states</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              Factors Affecting VRAM Usage
            </CardTitle>
            <CardDescription>Key elements that determine memory requirements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Several factors determine how much VRAM an LLM requires:</p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>
                <strong>Model Size:</strong> The number of parameters directly affects memory usage
              </li>
              <li>
                <strong>Precision:</strong> Using lower precision (e.g., 16-bit vs 32-bit) can halve memory requirements
              </li>
              <li>
                <strong>Context Length:</strong> Longer contexts require more memory for attention mechanisms
              </li>
              <li>
                <strong>Batch Size:</strong> Processing multiple inputs simultaneously increases memory usage
              </li>
              <li>
                <strong>Implementation:</strong> Different frameworks and optimization techniques can affect memory
                efficiency
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Optimization Techniques
            </CardTitle>
            <CardDescription>Methods to reduce VRAM requirements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>When working with limited VRAM, several techniques can help run larger models:</p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>
                <strong>Quantization:</strong> Reducing precision from 32-bit to 16-bit, 8-bit, or even 4-bit
              </li>
              <li>
                <strong>Model Pruning:</strong> Removing less important weights from the model
              </li>
              <li>
                <strong>Gradient Checkpointing:</strong> Trading computation for memory by recomputing activations
              </li>
              <li>
                <strong>Attention Optimizations:</strong> Using efficient attention implementations like FlashAttention
              </li>
              <li>
                <strong>Model Sharding:</strong> Splitting the model across multiple GPUs
              </li>
              <li>
                <strong>CPU Offloading:</strong> Moving parts of the model to system RAM when not in use
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

