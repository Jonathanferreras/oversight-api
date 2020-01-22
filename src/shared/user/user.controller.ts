import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':email')
  async findUserByEmail(@Param('email') email: string) {
    return await this.userService.find(email);
  }

  @Get()
  async findAllUsers() {
    return await this.userService.findAll();
  }
}
