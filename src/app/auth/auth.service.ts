import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/app/user/user.service';
import { appRoles, jwtConstants } from './auth.constants';
import { User } from '../user/user';
import { IRefreshTokenRequest } from './interfaces/refreshTokenRequest.interface';

@Injectable()
export class AuthService {
  private refreshTokens = {};
  private accessTokenExpiration: string;
  private refreshTokenExpiration: string;

  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {
    const { accessTokenExpiration, refreshTokenExpiration } = jwtConstants;

    this.accessTokenExpiration = accessTokenExpiration;
    this.refreshTokenExpiration = refreshTokenExpiration;
  }

  async handleUserAuthentication(username: string, password: string) {
    const user = await this.userService.handleFindUser(username);
    if (user && await this.handlePasswordAndHashComparison(password, user.hash)) {
      return user;
    }

    return null;
  }

  async handleLogin(user: User) {
    const { email, id } = user;

    const accessTokenPayload = {
      username: email,
      sub: id,
      roles: [appRoles.user],
    };

    const refreshTokenPayload = {
      refreshToken: `${Math.floor(Math.random() * 1000)}`,
      roles: [appRoles.user],
    };

    const accessToken = this.jwtService.sign(accessTokenPayload, { expiresIn: this.accessTokenExpiration });
    const refreshToken = this.jwtService.sign(refreshTokenPayload, { expiresIn: this.refreshTokenExpiration });
    this.refreshTokens[refreshToken] = email;

    return {
      accessToken,
      refreshToken,
    };
  }

  async handleRefreshToken(tokens: IRefreshTokenRequest) {
    const { accessToken, refreshToken } = tokens;
    const user = this.jwtService.decode(accessToken);

    if ((typeof user !== 'string') &&
        (refreshToken in this.refreshTokens) &&
        (this.refreshTokens[refreshToken] === user.username)
    ) {
      const { username, sub, roles } = user;
      const newAccessToken = this.jwtService.sign({ username, sub, roles }, { expiresIn: this.accessTokenExpiration });

      return {
        accessToken: newAccessToken,
      };
    }
  }

  private async handlePasswordAndHashComparison(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
