import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';
import * as fs from 'fs';
import { AppModule } from './app.module';

function parseOrigins(): string[] {
  const fromEnv = process.env.FRONTEND_URL || process.env.CORS_ORIGINS || '';
  const extras = fromEnv
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  const defaults = [
    'http://localhost:3000',
    'http://localhost:4173',
    'http://localhost:5173',
    'http://localhost:5500',
    'http://localhost:8080',
    'http://127.0.0.1:5500',
    'http://127.0.0.1:8080',
  ];

  return [...new Set([...defaults, ...extras])];
}

function ensureDir(path: string) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
}

async function bootstrap() {
  if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET must be set in production');
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(express.json({ limit: '8mb' }));
  app.use(express.urlencoded({ limit: '8mb', extended: true }));

  const projectRoot = process.cwd();
  const uploadPath = join(projectRoot, 'uploads', 'gym-images');
  const legacySrcPath = join(projectRoot, 'src', 'images');
  const legacyDistPath = join(projectRoot, 'dist', 'images');
  ensureDir(uploadPath);

  app.useStaticAssets(uploadPath, { prefix: '/images/gymImages/' });
  if (fs.existsSync(legacySrcPath)) {
    app.useStaticAssets(legacySrcPath, { prefix: '/images/' });
  } else if (fs.existsSync(legacyDistPath)) {
    app.useStaticAssets(legacyDistPath, { prefix: '/images/' });
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      exceptionFactory: (errors) => {
        const messages = errors.flatMap((error) =>
          Object.values(error.constraints || {}),
        );
        return new BadRequestException({
          message: messages.length ? messages : ['Validation failed'],
          error: 'Bad Request',
          statusCode: 400,
        });
      },
    }),
  );

  const origins = parseOrigins();
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || process.env.NODE_ENV !== 'production') {
        callback(null, true);
        return;
      }
      if (origins.includes('*') || origins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  });

  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);
  console.log(`AAAGym API listening on http://localhost:${port}`);
}

bootstrap();
