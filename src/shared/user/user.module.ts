import { Module, Global } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserMockRepository } from './user.repository';

@Global()
@Module({
  providers: [
    UserService, 
    UserMockRepository
  ],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
