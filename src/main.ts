import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configser = app.get(ConfigService);
  const port = configser.get<number>('APP_PORT');
  await app.listen(port);
}
bootstrap();
