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
export class AppModule { }
