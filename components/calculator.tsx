"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { CalculatorIcon, Cpu, Zap, Layers, Server } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Combobox } from "@/components/ui/combobox"
import modelsAndGpus from "@/data/models-and-gpus.json"
import { InfoIcon as InfoCircle } from "lucide-react"

// Data type sizes in bits
const DATA_TYPE_SIZES = {
  float32: 32,
  float16: 16,
  bfloat16: 16,
  int8: 8,
  int4: 4,
}

export function Calculator() {
  const [modelSize, setModelSize] = useState<number>(7)
  const [dataType, setDataType] = useState<keyof typeof DATA_TYPE_SIZES>("float16")
  const [contextLength, setContextLength] = useState<number>(2048)
  const [batchSize, setBatchSize] = useState<number>(1)
  const [usePagedAttention, setUsePagedAttention] = useState<boolean>(false)
  const [useTensorParallelism, setUseTensorParallelism] = useState<boolean>(false)
  const [numGPUs, setNumGPUs] = useState<number>(1)
  const [isTraining, setIsTraining] = useState<boolean>(false)
  const [memoryGB, setMemoryGB] = useState<number>(0)
  const [selectedModel, setSelectedModel] = useState<string>("")
  const [memoryBreakdown, setMemoryBreakdown] = useState<{
    model: number
    kvCache: number
    activations: number
    overhead: number
  }>({ model: 0, kvCache: 0, activations: 0, overhead: 0 })

  // Calculate memory requirements
  useEffect(() => {
    const paramCount = modelSize * 1_000_000_000 // Convert B to actual param count
    const dataBits = DATA_TYPE_SIZES[dataType]
    const embeddingSize = Math.floor(4 * Math.sqrt(paramCount))

    // Model weights memory
    const M_model = (paramCount * dataBits) / 8 / (useTensorParallelism ? numGPUs : 1)

    // KV Cache memory
    const Q_kv = dataType === "float32" ? 32 : 16 // Use 32-bit for float32, 16-bit for others
    const M_kv = (batchSize * contextLength * embeddingSize * 2 * Q_kv) / 8
    const M_kv_optimized = usePagedAttention ? M_kv * 0.5 : M_kv // 50% reduction with PagedAttention

    // Activations memory
    const M_activations = isTraining ? (batchSize * contextLength * embeddingSize * dataBits) / 8 : 0

    // Overhead
    const M_overhead = (M_model + M_kv_optimized + M_activations) * 0.1 // 10% overhead

    // Total memory in bytes
    const totalMemoryBytes = M_model + M_kv_optimized + M_activations + M_overhead

    // Convert to GB
    const totalMemoryGB = totalMemoryBytes / (1024 * 1024 * 1024)

    setMemoryGB(Number.parseFloat(totalMemoryGB.toFixed(2)))
    setMemoryBreakdown({
      model: Number.parseFloat((M_model / (1024 * 1024 * 1024)).toFixed(2)),
      kvCache: Number.parseFloat((M_kv_optimized / (1024 * 1024 * 1024)).toFixed(2)),
      activations: Number.parseFloat((M_activations / (1024 * 1024 * 1024)).toFixed(2)),
      overhead: Number.parseFloat((M_overhead / (1024 * 1024 * 1024)).toFixed(2)),
    })
  }, [modelSize, dataType, contextLength, batchSize, usePagedAttention, useTensorParallelism, numGPUs, isTraining])

  // Handle model selection
  const handleModelSelect = (modelName: string) => {
    setSelectedModel(modelName)
    const model = modelsAndGpus.commonModels.find((m) => m.name === modelName)
    if (model) {
      setModelSize(model.params)
      setContextLength(model.context)
    }
  }

  // Calculate percentage of total for each memory component
  const getPercentage = (value: number) => {
    return (value / memoryGB) * 100
  }

  const modelOptions = modelsAndGpus.commonModels.map((model) => ({
    value: model.name,
    label: `${model.name} (${model.params}B params, ${model.context} context)`,
  }))

  return (
    <section id="calculator" className="container px-4 py-8 md:py-12 max-w-5xl mx-auto">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-7">
          <Card className="h-full">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <CalculatorIcon className="h-5 w-5 text-primary" />
                <CardTitle>VRAM Calculator</CardTitle>
              </div>
              <CardDescription>
                Estimate the VRAM required to run Large Language Models with various configurations
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-6">
                  {/* Preset Models Selector */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="preset-model" className="text-base">
                        Select a Model
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <InfoCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Select a common LLM to automatically set its parameter count and context length.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Combobox options={modelOptions} value={selectedModel} onChange={handleModelSelect} />
                  </div>

                  {/* Data Type */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="data-type" className="text-base">
                        Precision / Data Type
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <InfoCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              The numerical precision used to store model weights. Lower precision uses less memory but
                              may reduce model quality.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Select
                      value={dataType}
                      onValueChange={(value) => setDataType(value as keyof typeof DATA_TYPE_SIZES)}
                    >
                      <SelectTrigger id="data-type">
                        <SelectValue placeholder="Select data type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="float32">float32 (32-bit)</SelectItem>
                        <SelectItem value="float16">float16 (16-bit)</SelectItem>
                        <SelectItem value="bfloat16">bfloat16 (16-bit)</SelectItem>
                        <SelectItem value="int8">int8 (8-bit quantized)</SelectItem>
                        <SelectItem value="int4">int4 (4-bit quantized)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Basic Optimization Toggles */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="paged-attention" className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-primary" />
                          Use PagedAttention
                        </Label>
                        <p className="text-sm text-muted-foreground">Reduces KV Cache memory usage</p>
                      </div>
                      <Switch id="paged-attention" checked={usePagedAttention} onCheckedChange={setUsePagedAttention} />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-6">
                  {/* Model Size */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="model-size" className="text-base flex items-center gap-2">
                        <Layers className="h-4 w-4 text-primary" />
                        <span className="hidden sm:inline">Model Size (billions of parameters)</span>
                        <span className="sm:hidden">Model Size</span>
                      </Label>
                      <span className="text-sm font-medium">{modelSize}B</span>
                    </div>
                    <Slider
                      id="model-size"
                      min={0.1}
                      max={180}
                      step={0.1}
                      value={[modelSize]}
                      onValueChange={(value) => {
                        setModelSize(value[0])
                        setSelectedModel("")
                      }}
                      className="py-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0.1B</span>
                      <span>180B</span>
                    </div>
                  </div>

                  {/* Context Length */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="context-length" className="text-base">
                        Context Length (tokens)
                      </Label>
                      <span className="text-sm font-medium">{contextLength}</span>
                    </div>
                    <Slider
                      id="context-length"
                      min={128}
                      max={32768}
                      step={128}
                      value={[contextLength]}
                      onValueChange={(value) => {
                        setContextLength(value[0])
                        setSelectedModel("")
                      }}
                      className="py-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>128</span>
                      <span>32,768</span>
                    </div>
                  </div>

                  {/* Batch Size */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="batch-size" className="text-base">
                        Batch Size
                      </Label>
                      <span className="text-sm font-medium">{batchSize}</span>
                    </div>
                    <Slider
                      id="batch-size"
                      min={1}
                      max={32}
                      step={1}
                      value={[batchSize]}
                      onValueChange={(value) => setBatchSize(value[0])}
                      className="py-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1</span>
                      <span>32</span>
                    </div>
                  </div>

                  {/* Advanced Optimization Techniques */}
                  <div className="space-y-4 pt-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Advanced Optimizations</h3>

                    {/* PagedAttention */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="paged-attention-adv" className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-primary" />
                          Use PagedAttention
                        </Label>
                        <p className="text-sm text-muted-foreground">Reduces KV Cache memory usage</p>
                      </div>
                      <Switch
                        id="paged-attention-adv"
                        checked={usePagedAttention}
                        onCheckedChange={setUsePagedAttention}
                      />
                    </div>

                    {/* Tensor Parallelism */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="tensor-parallelism" className="flex items-center gap-2">
                          <Server className="h-4 w-4 text-primary" />
                          Use Tensor Parallelism
                        </Label>
                        <p className="text-sm text-muted-foreground">Distribute model across multiple GPUs</p>
                      </div>
                      <Switch
                        id="tensor-parallelism"
                        checked={useTensorParallelism}
                        onCheckedChange={setUseTensorParallelism}
                      />
                    </div>

                    {/* Number of GPUs (only if Tensor Parallelism is enabled) */}
                    {useTensorParallelism && (
                      <div className="space-y-2 pl-6 border-l-2 border-muted ml-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="num-gpus" className="text-base">
                            Number of GPUs
                          </Label>
                          <span className="text-sm font-medium">{numGPUs}</span>
                        </div>
                        <Slider
                          id="num-gpus"
                          min={1}
                          max={8}
                          step={1}
                          value={[numGPUs]}
                          onValueChange={(value) => setNumGPUs(value[0])}
                          className="py-2"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>1</span>
                          <span>8</span>
                        </div>
                      </div>
                    )}

                    {/* Training vs Inference */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="is-training" className="flex items-center gap-2">
                          <Cpu className="h-4 w-4 text-primary" />
                          Training Mode
                        </Label>
                        <p className="text-sm text-muted-foreground">Includes memory for activations during training</p>
                      </div>
                      <Switch id="is-training" checked={isTraining} onCheckedChange={setIsTraining} />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Formula display */}
              <div className="p-4 bg-muted/50 rounded-lg border border-border">
                <h3 className="text-sm font-medium mb-2">Formula Used:</h3>
                <div className="bg-background p-3 rounded font-mono text-sm overflow-x-auto mb-2">
                  M_total = M_model + M_kv + M_activations + M_overhead
                </div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="formula-explanation" className="border-b-0">
                    <AccordionTrigger className="py-2 text-sm text-primary">View Explanation</AccordionTrigger>
                    <AccordionContent>
                      <div className="mt-2 space-y-2 text-sm">
                        <p>
                          This formula calculates the total memory (M_total) required to run a Large Language Model by
                          considering four key components:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>
                            <strong>M_model:</strong> Memory for model weights
                          </li>
                          <li>
                            <strong>M_kv:</strong> Memory for key-value cache
                          </li>
                          <li>
                            <strong>M_activations:</strong> Memory for activations (training only)
                          </li>
                          <li>
                            <strong>M_overhead:</strong> Additional overhead memory
                          </li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-5">
          <Card className="h-full">
            <CardHeader className="pb-4">
              <CardTitle>Estimated VRAM Required</CardTitle>
              <CardDescription>Based on your selected configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold text-primary">{memoryGB}</span>
                <span className="text-xl mb-1">GB</span>
              </div>

              {/* Memory breakdown with progress bars */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Memory Breakdown</h4>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        Model Weights
                      </span>
                      <span>{memoryBreakdown.model.toFixed(2)} GB</span>
                    </div>
                    <Progress value={getPercentage(memoryBreakdown.model)} className="h-2" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        KV Cache
                      </span>
                      <span>{memoryBreakdown.kvCache.toFixed(2)} GB</span>
                    </div>
                    <Progress
                      value={getPercentage(memoryBreakdown.kvCache)}
                      className="h-2 bg-muted [&>div]:bg-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        Activations
                      </span>
                      <span>{memoryBreakdown.activations.toFixed(2)} GB</span>
                    </div>
                    <Progress
                      value={getPercentage(memoryBreakdown.activations)}
                      className="h-2 bg-muted [&>div]:bg-green-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        Overhead
                      </span>
                      <span>{memoryBreakdown.overhead.toFixed(2)} GB</span>
                    </div>
                    <Progress
                      value={getPercentage(memoryBreakdown.overhead)}
                      className="h-2 bg-muted [&>div]:bg-amber-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h4 className="text-sm font-medium">Compatible GPUs</h4>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                  {modelsAndGpus.gpuModels.map((gpu) => (
                    <Badge
                      key={gpu.name + gpu.vram}
                      variant={gpu.vram >= memoryGB ? "default" : "secondary"}
                      className={`${gpu.vram >= memoryGB ? "" : "opacity-50"} whitespace-nowrap`}
                    >
                      {gpu.name} ({gpu.vram}GB)
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4 bg-muted/30">
              <div className="text-sm text-muted-foreground">
                <p>
                  This is an estimate based on calculations. Actual VRAM usage may vary depending on implementation
                  details.
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

