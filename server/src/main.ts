import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthGuard } from './auth/auth.guard';
import { ValidationPipe } from './helpers/pipes/validation.pipe';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('Yellow test task')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.useGlobalGuards(app.get(AuthGuard))
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT, () => console.log(`listening ${PORT} port...`));
}

bootstrap();
