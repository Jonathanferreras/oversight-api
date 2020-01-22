import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { AuthenticateUserDto } from '../../shared/user/dtos/authenticate-user.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async loginUser(@Body('user') user: AuthenticateUserDto) {
    this.loginService.login(user);
  }
}
