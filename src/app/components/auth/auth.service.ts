import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/app/components/user/user.service';
import { roles } from './auth.constants';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async authenticateUser(username: string, password: string) {
    const user = await this.userService.find(username);
    if (user && await this.comparePasswordToHash(password, user.hash)) {
      return user;
    }

    return null;
  }

  async login(user: any) {
    const { email } = user;

    const payload = {
      username: email,
      sub: 1,
      roles: [roles.user],
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async comparePasswordToHash(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
