import { Module } from '@nestjs/common';
import { UserModule } from './components/user/user.module';
import { SignupModule } from './components/signup/signup.module';
import { AuthModule } from './components/auth/auth.module';
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
