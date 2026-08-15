import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Increase body size limit for JSON (to handle large payloads)
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Serve static files (images)
  // Images are stored in src/images/gymImages/
  // In development: use src/images (from project root)
  // In production: use dist/images (from project root)
  const projectRoot = process.cwd(); // This is the 'backend' directory
  const srcImagesPath = join(projectRoot, 'src', 'images');
  const distImagesPath = join(projectRoot, 'dist', 'images');
  
  // Check which path exists - prefer src/images for development
  let imagesPath: string;
  if (fs.existsSync(srcImagesPath)) {
    imagesPath = srcImagesPath;
    console.log('✓ Using development images path (src/images)');
  } else if (fs.existsSync(distImagesPath)) {
    imagesPath = distImagesPath;
    console.log('✓ Using production images path (dist/images)');
  } else {
    // Fallback: try relative to __dirname (dist/src)
    imagesPath = join(__dirname, '..', '..', 'src', 'images');
    console.log('⚠ Using fallback images path');
  }
  
  console.log('Serving static images from:', imagesPath);
  console.log('Path exists:', fs.existsSync(imagesPath));
  
  app.useStaticAssets(imagesPath, {
    prefix: '/images/',
  });

  // Enable global validation pipes for DTO validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip unknown properties
      forbidNonWhitelisted: true, // Throw error on unknown properties
      transform: true, // Automatically transform input to DTO types
      exceptionFactory: (errors) => {
        const messages = errors.map(error => 
          Object.values(error.constraints || {}).join(', ')
        );
        return new BadRequestException({
          message: messages.length > 0 ? messages : 'Validation failed',
          error: 'Bad Request',
          statusCode: 400,
        });
      },
    }),
  );



  

  // Enable CORS
  // In production, allow your frontend domain
  const allowedOrigins = process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL || 'https://your-frontend.vercel.app']
    : ['http://localhost:8080', 'http://localhost:3000'];
  
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`Application is running on: http://localhost:${PORT}`);
}
bootstrap();