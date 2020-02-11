import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { LoginService } from './login.service';
import { AuthenticateUserDto } from '../../shared/user/dtos/authenticate-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @UseGuards(AuthGuard('local'))
  @Post()
  async loginUser(@Body('user') user: AuthenticateUserDto) {
    const foundUser = await this.loginService.login(user);
    return foundUser;
  }
}
