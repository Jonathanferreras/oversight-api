import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from '../../shared/user/dtos/register-user.dto';
import { AuthService } from '../auth/auth.service';
import { RegistrationStatus } from '../auth/interfaces/registration-status';

@Injectable()
export class SignupService {
  constructor(private readonly authService: AuthService) {}

  async signup(user: RegisterUserDto): Promise<RegistrationStatus> {
    return await this.authService.registerUser(user);
  }
}
