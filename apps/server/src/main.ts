
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cookieParser from "cookie-parser";
import session from "express-session";
import helmet from "helmet";
import { patchNestJsSwagger } from "nestjs-zod";
import { join } from "path";

import { AppModule } from "./app.module";
import type { Config } from "./config/schema";

patchNestJsSwagger();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: process.env.NODE_ENV === "development" ? ["debug"] : ["error", "warn", "log"],
  });

  const configService = app.get(ConfigService<Config>);

  const accessTokenSecret = configService.getOrThrow("ACCESS_TOKEN_SECRET");
  const publicUrl = configService.getOrThrow("PUBLIC_URL");
  const isHTTPS = publicUrl.startsWith("https://") ?? false;

  // Cookie Parser
  app.use(cookieParser());

  // Session
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: accessTokenSecret,
      cookie: { httpOnly: true, secure: isHTTPS },
    }),
  );

  // CORS - Allow all origins for production
  app.enableCors({ 
    credentials: true, 
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
  });

  // Helmet - enabled only in production
  if (isHTTPS) app.use(helmet({ contentSecurityPolicy: false }));

  // Global Prefix for API routes
  app.setGlobalPrefix("api");

  // Serve static files from client build
  const clientPath = join(__dirname, "..", "client");
  app.useStaticAssets(clientPath, { prefix: "/" });
  
  // Enable Shutdown Hooks
  app.enableShutdownHooks();

  // Health check endpoint
  app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Swagger (OpenAPI Docs)
  const config = new DocumentBuilder()
    .setTitle("Reactive Resume")
    .setDescription("A free and open-source resume builder")
    .addCookieAuth("Authentication", { type: "http", in: "cookie", scheme: "Bearer" })
    .setVersion("4.4.6")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  // CRITICAL: SPA fallback routing - must be AFTER all API routes
  app.get("*", (req, res) => {
    const path = req.path;
    
    // Skip API routes, health check, and static assets
    if (path.startsWith("/api") || 
        path.startsWith("/health") || 
        path.includes(".")) {
      return res.status(404).json({ message: "Route not found" });
    }
    
    // Send index.html for all SPA routes
    res.sendFile(join(clientPath, "index.html"));
  });

  // Port configuration
  const port = configService.get<number>("PORT") ?? 5000;
  const host = "0.0.0.0";

  await app.listen(port, host);

  Logger.log(`🚀 Server running on ${host}:${port}`, "Bootstrap");
  Logger.log(`📱 Client served from: ${clientPath}`, "Bootstrap");
  Logger.log(`📋 API Documentation: ${publicUrl}/api/docs`, "Bootstrap");
}

void bootstrap();
