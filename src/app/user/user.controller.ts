import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from 'src/app/auth/auth-roles.decorator';
import { JwtAuthGuard } from 'src/app/auth/guards/auth-jwt.guard';
import { RolesGuard } from 'src/app/auth/guards/auth-role.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':email')
  async getUserByEmail(@Param('email') email: string) {
    return await this.userService.handleFindUser(email);
  }

  @Get('')
  async getAllUsers() {
    return await this.userService.handleFindAllUsers();
  }
}
