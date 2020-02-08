import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { Module, ValidationPipe } from '@nestjs/common';
import { UserModule } from './shared/user/user.module';
import { SignupModule } from './components/signup/signup.module';
import { LoginModule } from './components/login/login.module';
// import { MongooseModule } from '@nestjs/mongoose';

@Module({
  // imports: [MongooseModule.forRoot('')],
  imports: [
    UserModule,
    SignupModule,
    LoginModule,
  ],
  controllers: [],
  providers: [],
})

class AppModule { }

(async function main() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: true,
  }));
  await app.listen(process.env.SERVER_PORT);
})();
