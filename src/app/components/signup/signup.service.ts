import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from '../../shared/user/dtos/register-user.dto';
import { RegistrationStatus } from '../auth/interfaces/registration-status';
import { UserService } from 'src/app/shared/user/user.service';

@Injectable()
export class SignupService {
  constructor(private readonly userService: UserService) {}

  async registerUser(user: RegisterUserDto): Promise<RegistrationStatus> {
    const { firstname, lastname, email, password } = user;
    const status: RegistrationStatus = {
      success: false,
      message: '',
    };

    if (await this.userService.find(email)) {
      status.message = 'User already exists!';

      return status;
    }

    const hash = await this.encryptPassword(password);
    const newUser = this.userService.create({
      firstname,
      lastname,
      email,
      hash,
    });

    if (!newUser) {
      status.message = 'User was not registered!';

    } else {
      status.success = true;
      status.message = 'User was registered!';
    }

    return status;
  }

  private async encryptPassword(data: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    return await bcrypt.hash(data, salt);
  }
}
