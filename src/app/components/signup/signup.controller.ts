import { Controller, Post, Body } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupUserDto } from './signup-user.dto';

@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post()
  async signupUser(@Body('user') user: SignupUserDto) {
    return await this.signupService.registerUser(user);
  }
}
