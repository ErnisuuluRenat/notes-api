import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Notes API')
  .setDescription("Notes api is pet project")
  .setVersion('1.0')
  .addTag('notes')
  .addBearerAuth({
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
    name: "JWT",
    description: "ENTER JWT token",
    in: "header"
  },
    "token")
  .build()

  const documentFactory = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, documentFactory)

  app.useGlobalPipes(new ValidationPipe())
  const configService = app.get(ConfigService)
  const port = configService.get<number>('PORT') ?? 8000;
  await app.listen(port);
  console.log(`Application is running on : http://localhost:${port}`)
}
bootstrap();
