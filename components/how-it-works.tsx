import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function HowItWorks() {
  return (
    <div className="container max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>How VRAM Sage Calculates Memory Requirements</CardTitle>
          <CardDescription>Understanding the formula and methodology behind our calculations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="formula" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3 mx-auto">
              <TabsTrigger value="formula">Formula</TabsTrigger>
              <TabsTrigger value="data-types">Data Types</TabsTrigger>
              <TabsTrigger value="optimization">Optimization</TabsTrigger>
            </TabsList>

            <TabsContent value="formula" className="mt-6 space-y-6">
              <div className="prose dark:prose-invert max-w-none">
                <h3>The Memory Calculation Formula</h3>
                <p>
                  The total VRAM required for running a Large Language Model (LLM) is calculated using this
                  comprehensive formula:
                </p>

                <div className="bg-muted p-4 rounded-lg my-4">
                  <code className="text-sm">M_total = M_model + M_kv + M_activations + M_overhead</code>
                </div>

                <p>Let's break down each component:</p>

                <h4>1. Model Weights Memory (M_model)</h4>
                <p>This represents the memory required to store the model's parameters:</p>
                <div className="bg-muted p-4 rounded-lg my-4">
                  <code className="text-sm">M_model = (P * Q) / 8 / (num_GPUs if using Tensor Parallelism)</code>
                </div>
                <ul>
                  <li>
                    <strong>P</strong>: Number of parameters in the model
                  </li>
                  <li>
                    <strong>Q</strong>: Bits per parameter (depends on the data type)
                  </li>
                  <li>Divided by 8 to convert bits to bytes</li>
                  <li>Optionally divided by the number of GPUs if using Tensor Parallelism</li>
                </ul>
                <p>
                  <strong>Example:</strong> For a 7B parameter model using float16 (16 bits) on a single GPU:
                  <br />
                  M_model = (7 * 10^9 * 16) / 8 = 14 GB
                </p>

                <h4>2. KV Cache Memory (M_kv)</h4>
                <p>This accounts for the memory used by the key-value cache during inference:</p>
                <div className="bg-muted p-4 rounded-lg my-4">
                  <code className="text-sm">M_kv = (B * L * E * 2 * Q_kv) / 8 * (0.5 if using PagedAttention)</code>
                </div>
                <ul>
                  <li>
                    <strong>B</strong>: Batch size
                  </li>
                  <li>
                    <strong>L</strong>: Context length (in tokens)
                  </li>
                  <li>
                    <strong>E</strong>: Embedding size (typically 4 * sqrt(P))
                  </li>
                  <li>
                    <strong>2</strong>: For both keys and values
                  </li>
                  <li>
                    <strong>Q_kv</strong>: Bits for KV cache (usually 16 for float16)
                  </li>
                  <li>Optionally multiplied by 0.5 if using PagedAttention optimization</li>
                </ul>
                <p>
                  <strong>Example:</strong> For a 7B model with 2048 context length, batch size 1, using PagedAttention:
                  <br />E = 4 * sqrt(7 * 10^9) ≈ 10,568
                  <br />
                  M_kv = (1 * 2048 * 10568 * 2 * 16) / 8 * 0.5 ≈ 0.54 GB
                </p>

                <h4>3. Activations Memory (M_activations)</h4>
                <p>
                  This represents the memory required for storing intermediate activations, primarily during training:
                </p>
                <div className="bg-muted p-4 rounded-lg my-4">
                  <code className="text-sm">M_activations = (B * L * E * Q) / 8 (if in training mode, else 0)</code>
                </div>
                <ul>
                  <li>Uses the same B, L, and E as in KV Cache calculation</li>
                  <li>
                    <strong>Q</strong>: Bits for activations (usually same as model precision)
                  </li>
                  <li>This is typically negligible during inference and is only considered for training</li>
                </ul>
                <p>
                  <strong>Example:</strong> For the same 7B model in training mode:
                  <br />
                  M_activations = (1 * 2048 * 10568 * 16) / 8 ≈ 0.54 GB
                </p>

                <h4>4. Overhead Memory (M_overhead)</h4>
                <p>This accounts for additional memory used by the system, libraries, and other processes:</p>
                <div className="bg-muted p-4 rounded-lg my-4">
                  <code className="text-sm">M_overhead = (M_model + M_kv + M_activations) * 0.1</code>
                </div>
                <p>We estimate this as 10% of the total memory used by other components.</p>

                <h4>Total Memory Calculation</h4>
                <p>
                  The final step is to sum all these components:
                  <br />
                  M_total = M_model + M_kv + M_activations + M_overhead
                </p>
                <p>
                  <strong>Full Example:</strong> For our 7B parameter model using float16, 2048 context length, batch
                  size 1, with PagedAttention, in inference mode:
                  <br />
                  M_model = 14 GB
                  <br />
                  M_kv = 0.54 GB
                  <br />
                  M_activations = 0 GB (inference mode)
                  <br />
                  M_overhead = (14 + 0.54 + 0) * 0.1 = 1.454 GB
                  <br />
                  M_total = 14 + 0.54 + 0 + 1.454 = 15.994 GB
                </p>
              </div>
            </TabsContent>

            <TabsContent value="data-types" className="mt-6">
              <h4 className="text-xl font-medium mb-4">Data Type Sizes</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data Type</TableHead>
                    <TableHead>Size (bytes)</TableHead>
                    <TableHead>Bits (Q)</TableHead>
                    <TableHead>Precision</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>float32</TableCell>
                    <TableCell>4</TableCell>
                    <TableCell>32</TableCell>
                    <TableCell>Full precision</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>float16</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>16</TableCell>
                    <TableCell>Half precision</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>bfloat16</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>16</TableCell>
                    <TableCell>Brain floating point</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>int8</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>8</TableCell>
                    <TableCell>8-bit quantization</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>int4</TableCell>
                    <TableCell>0.5</TableCell>
                    <TableCell>4</TableCell>
                    <TableCell>4-bit quantization</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="mt-6 space-y-4">
                <h4 className="text-xl font-medium">Impact of Data Types on Memory</h4>
                <p>
                  The choice of data type has a significant impact on memory usage. For example, using int8 quantization
                  instead of float32 can reduce memory requirements by 75%, while int4 can reduce it by 87.5%.
                </p>
                <p>
                  However, lower precision can affect model quality. The optimal choice depends on your specific use
                  case and quality requirements.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="optimization" className="mt-6">
              <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
                <h3 className="text-xl font-medium mb-4">Optimization Techniques</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="font-medium">Model Optimization</h4>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Use lower precision data types (int8, int4) for inference when possible</li>
                      <li>Consider model pruning to remove less important weights</li>
                      <li>Use knowledge distillation to create smaller models</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Memory Management</h4>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Implement PagedAttention to decrease KV cache memory</li>
                      <li>Use Tensor Parallelism to distribute model across multiple GPUs</li>
                      <li>Consider CPU offloading for very large models</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Inference Optimization</h4>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Reduce batch size or context length to decrease memory usage</li>
                      <li>Use attention mechanisms optimized for long sequences (e.g., FlashAttention)</li>
                      <li>Consider streaming inference for long outputs</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Training Optimization</h4>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Use gradient checkpointing to trade computation for memory</li>
                      <li>Implement mixed precision training</li>
                      <li>Consider parameter-efficient fine-tuning methods like LoRA</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

