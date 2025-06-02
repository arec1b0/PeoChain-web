import { z } from "zod";

const environmentSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().transform(Number).default("5000"),
  DATABASE_URL: z.string().url(),
  SESSION_SECRET: z
    .string()
    .min(32, "Session secret must be at least 32 characters")
    .refine(
      (val) => val !== "dev-secret-key-change-in-production",
      "Production must use a secure session secret, not the default development value"
    ),

  // Rate limiting configuration
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number).default("900000"), // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number).default("100"),

  // Security configuration
  CORS_ORIGIN: z.string().optional(),
  BCRYPT_ROUNDS: z.string().transform(Number).default("12"),

  // Cache configuration
  CACHE_TTL_STATIC: z.string().transform(Number).default("300"), // 5 minutes
  CACHE_TTL_DYNAMIC: z.string().transform(Number).default("30"), // 30 seconds
});

export type Environment = z.infer<typeof environmentSchema>;

function validateEnvironment(): Environment {
  try {
    return environmentSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors
        .map((err) => err.path.join("."))
        .join(", ");
      throw new Error(
        `Missing or invalid environment variables: ${missingVars}`,
      );
    }
    throw error;
  }
}

export const env = validateEnvironment();
