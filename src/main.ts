import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, {
    logger: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Документация React Todo Server')
    .setDescription('Документация по API для React Todo Server')
    .setVersion('0.1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log(`server started on port ${PORT}`));
}

start();
