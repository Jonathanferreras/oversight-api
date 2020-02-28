import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SignupModule } from './signup/signup.module';
import { AuthModule } from './auth/auth.module';
// import { MongooseModule } from '@nestjs/mongoose';

@Module({
  // imports: [MongooseModule.forRoot('')],
  imports: [
    UserModule,
    SignupModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
