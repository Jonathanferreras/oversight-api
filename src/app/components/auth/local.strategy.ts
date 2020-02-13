import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateUserDto } from 'src/app/shared/user/dtos/authenticate-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const userFound = await this.authService.authenticateUser(username, password);

    if (!userFound) {
      throw new UnauthorizedException();
    }

    return userFound;
  }
}
