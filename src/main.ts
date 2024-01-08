import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle('TodoApp API')
    .setDescription('todoapp')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.enableCors({ origin: '*' });
  await app.listen(configService.get('app.port'));
}
bootstrap();
