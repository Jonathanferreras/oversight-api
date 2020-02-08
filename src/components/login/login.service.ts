import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthenticateUserDto } from 'src/shared/user/dtos/authenticate-user.dto';

@Injectable()
export class LoginService {
  constructor(private readonly authService: AuthService) {}

  async login(user: AuthenticateUserDto) {
    const foundUser = this.authService.authenticateUser(user);
    return foundUser;
  }
}
