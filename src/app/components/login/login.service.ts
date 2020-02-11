import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthenticateUserDto } from 'src/app/shared/user/dtos/authenticate-user.dto';

@Injectable()
export class LoginService {
  constructor(private readonly authService: AuthService) {}

  async login(user: AuthenticateUserDto) {
    const foundUser = await this.authService.authenticateUser(user);
    return foundUser;
  }
}
