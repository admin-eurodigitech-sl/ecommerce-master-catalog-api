import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const nestApp = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Master Catalog Api')
    .setDescription('CRUD to manage the master catalog')
    .setVersion('1.0')
    .addTag('master-catalog-api')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(nestApp, swaggerConfig);
  SwaggerModule.setup('swagger', nestApp, documentFactory);

  await nestApp.listen(process.env.PORT ?? 3000);
}
bootstrap();
