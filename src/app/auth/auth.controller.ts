import { Controller, Post, Request, UseGuards, Get, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/auth-jwt.guard';
import { LocalAuthGuard } from './guards/auth-local.guard';
import { IRefreshTokenRequest } from './interfaces/refreshTokenRequest.interface';
import { RolesGuard } from './guards/auth-role.guard';
import { Roles } from './auth-roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.handleLogin(req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(RolesGuard)
  @Roles('user')
  @Post('refreshToken')
  async refreshToken(@Body() tokens: IRefreshTokenRequest) {
    const newAccessToken = await this.authService.handleRefreshToken(tokens);

    if (!newAccessToken) {
      throw new HttpException(
        'You provided an Invalid Token',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return newAccessToken;
  }
}
