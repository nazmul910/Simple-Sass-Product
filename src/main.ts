import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });


  app.setGlobalPrefix('api');

  const PORT = process.env.PORT || 5002;

  await app.listen(PORT);

  console.log(`🚀 Server running on http://localhost:${PORT}`);
}

bootstrap();