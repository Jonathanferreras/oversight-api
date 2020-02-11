import { Controller, Post, Body } from '@nestjs/common';
import { SignupService } from './signup.service';
import { RegisterUserDto } from '../../shared/user/dtos/register-user.dto';

@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post()
  async signupUser(@Body('user') user: RegisterUserDto) {
    return await this.signupService.signup(user);
  }
}
