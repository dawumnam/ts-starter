import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const environmentSchema = z.object({
  // DATABASE_URL: z.url().optional(),
  // LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
  // NODE_ENV: z
  //   .enum(["development", "production", "test"])
  //   .default("development"),
  OPENAI_API_KEY: z.string().min(1, "OpenAI API key is required"),
  // PORT: z.string().regex(/^\d+$/).transform(Number).default(3000),
});

export type Environment = z.infer<typeof environmentSchema>;

function validateEnvironment(): Environment {
  const parsed = environmentSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:");
    console.error(JSON.stringify(z.treeifyError(parsed.error), undefined, 2));
    throw new Error("Invalid environment variables");
  }

  return parsed.data;
}

export const environment = validateEnvironment();
