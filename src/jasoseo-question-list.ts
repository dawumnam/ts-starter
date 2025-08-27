import OpenAI from "openai";
import z from "zod";

import { environment } from "./environment.js";

function calculateCost(
  usage:
    | undefined
    | {
        input_tokens: number;
        input_tokens_details?: { cached_tokens?: number };
        output_tokens: number;
      },
): {
  inputCost: number;
  outputCost: number;
  totalCost: number;
  totalCostKRW: number;
} {
  if (!usage)
    return { inputCost: 0, outputCost: 0, totalCost: 0, totalCostKRW: 0 };

  const PRICING = {
    cachedInput: 0.125 / 1_000_000,
    input: 1.25 / 1_000_000,
    output: 10 / 1_000_000,
  };

  const KRW_RATE = 1400;

  const cachedTokens = usage.input_tokens_details?.cached_tokens ?? 0;
  const regularInputTokens = usage.input_tokens - cachedTokens;

  const inputCost =
    regularInputTokens * PRICING.input + cachedTokens * PRICING.cachedInput;
  const outputCost = usage.output_tokens * PRICING.output;
  const totalCost = inputCost + outputCost;
  const totalCostKRW = totalCost * KRW_RATE;

  return { inputCost, outputCost, totalCost, totalCostKRW };
}

const pastQuestionsSchema = z
  .object({
    questions: z
      .array(
        z.object({
          question: z.string().min(1),
          sources: z.array(z.string().min(1)),
        }),
      )
      .max(5),
    reasoning: z.string().min(1),
  })
  .strict();

async function searchCompanyJasoseoQuestions(): Promise<void> {
  performance.measure("llm");
  const { OPENAI_API_KEY: apiKey } = environment;

  const startTime = performance.now();
  const openai = new OpenAI({ apiKey });

  const llmResponse = await openai.responses.create({
    input: `검색을 통해, 에이블제이 회사 웹개발자 직무의 근 5년간 자소서 질문 리스트를 최대 5개 찾는다. 각 질문들의 내용은 중복되지 않아야 한다. 결과를 <output_format>형식으로 반환. 찾지 못했으면, 빈 배열 반환. Reasoning에 추론 과정 포함.질문의 출처들은 sources에 포함.
    <output_format>
    \`\`\`json
    {"reasoning":"...","questions":[{"sources":[],"question":"..."}]}
    \`\`\`
    </output_format>
    `,
    model: "gpt-5",
    reasoning: { effort: "low" },
    tool_choice: "auto",
    tools: [{ type: "web_search" }],
  });

  const cleanedText = llmResponse.output_text
    .replaceAll("```json", "")
    .replaceAll("```", "")
    .trim();

  const parsed = pastQuestionsSchema.parse(JSON.parse(cleanedText));

  const endTime = performance.now();

  console.log(
    `LLM call took ${((endTime - startTime) / 1000).toString()} seconds.`,
  );

  console.log(parsed);
  console.log(JSON.stringify(llmResponse.usage, undefined, 2));

  // Calculate and display cost
  const cost = calculateCost(llmResponse.usage ?? undefined);
  console.log(`\nCost Breakdown:`);
  console.log(`  Input cost: $${cost.inputCost.toFixed(6)}`);
  console.log(`  Output cost: $${cost.outputCost.toFixed(6)}`);
  console.log(`  Total cost: $${cost.totalCost.toFixed(6)}`);
  console.log(`  Total cost (KRW): ₩${cost.totalCostKRW.toFixed(2)}`);
}

await searchCompanyJasoseoQuestions();
