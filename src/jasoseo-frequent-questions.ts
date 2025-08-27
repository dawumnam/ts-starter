import OpenAI from "openai";
import zod from "zod";

import { environment } from "./environment.js";

const frequentQuestionsSchema = zod.object({
  results: zod.array(zod.string()).max(2),
});

async function generateFrequentQuestion(company: string): Promise<void> {
  const { OPENAI_API_KEY: apiKey } = environment;

  const openai = new OpenAI({ apiKey });

  const llmResponse = await openai.responses.create({
    input: `
    Your task is to generate 2 Korean 자소서 questions. 
    Given the <company>, generate first question using <output1_examples> and second question using <output2_examples> generate response following <output_format>.
    Be creative.

    <output1_examples>
    최근 출시된 당사의 제품 중 한 가지를 선택하여 경쟁사 대비 강점 및 보완점 그리고 매일유업의 시장 경쟁력을 높이기 위한 방안을 기술해 주십시오.
    언론사로서의 한국일보에 대한 생각을 작성 하시오.
    GS엠비즈의 강점과 약점은 무엇이며, 어떻게 발전시키고 싶은지 작성해 주세요.
    쏘카 서비스의 부족한 점을 제시하고, 지원자가 생각하는 원인과 해결 방법을 기술해주세요.
    롯데글로벌로지스 어떤 회사로 알고 있습니까?
    </output1_examples>

    <output2_examples>
    주식회사 인컴즈에서 자신이 지원한 직무의 역할에 대하여 기술하시오.
    국내외 상용차 시장의 미래를 전망하고, 현대자동차 상용부문이 나아가야할 방향성을 기술해 주십시오.
    본인이 생각하는 품질본부의 역할에 대해 서술하고, 그 역할을 갖추기 위한 본인만의 차별화 전략을 기술해주십시오.
    가장 눈여겨보고 있는 글로벌 HR의 트렌드는 무엇이며, 글로벌 사업의 확장을 위해 NAVER HR 이 준비해야 할 아젠다는 무엇인지 서술해주세요.
    디지털 시대의 보험산업의 미래에 대한 본인의 생각을 기술해 주시기 바랍니다.
    KRX가 증권·파생상품시장에서 어떤 역할을 하는지를 설명하고, 본인이 생각하는 KRX의 미래 성장동력이 무엇인지 이유를 들어 기술하시오.
    </output2_examples>

    <output_format>
    \`\`\`json
    {"results": ["...","..."]}
    \`\`\`
    </output_format>
    `,
    instructions: `
    <company>
    ${company}
    </company>
    `,
    model: "gpt-5",
    reasoning: { effort: "minimal" },
  });

  const cleanedText = llmResponse.output_text
    .replaceAll("```json", "")
    .replaceAll("```", "")
    .trim();

  const parsed = frequentQuestionsSchema.parse(JSON.parse(cleanedText));

  console.log(parsed);
}

await generateFrequentQuestion("에이블제이");
