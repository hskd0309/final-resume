import { z } from "zod";

const configSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

  // Server Configuration
  PORT: z.coerce.number().default(5000),
  PUBLIC_URL: z.string().default("http://localhost:5000"),

  // Database
  DATABASE_URL: z.string().default("postgresql://user:password@localhost:5432/reactive_resume"),

  // Authentication Secrets
  ACCESS_TOKEN_SECRET: z.string().default("access-token-secret"),
  REFRESH_TOKEN_SECRET: z.string().default("refresh-token-secret"),

  // Mail Configuration (Optional)
  MAIL_FROM: z.string().optional(),
  SMTP_URL: z.string().optional(),

  // Storage Configuration (Optional)
  STORAGE_ENDPOINT: z.string().optional(),
  STORAGE_PORT: z.coerce.number().optional(),
  STORAGE_BUCKET: z.string().optional(),
  STORAGE_ACCESS_KEY: z.string().optional(),
  STORAGE_SECRET_KEY: z.string().optional(),
  STORAGE_USE_SSL: z.coerce.boolean().default(false),

  // Feature Flags
  DISABLE_SIGNUPS: z.coerce.boolean().default(false),
  DISABLE_EMAIL_AUTH: z.coerce.boolean().default(false),

  // OAuth Providers (Optional)
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),

  // Browser Configuration
  CHROME_TOKEN: z.string().optional(),
  CHROME_URL: z.string().optional(),
});

export type Config = z.infer<typeof configSchema>;
export default configSchema;