import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignupUserDto } from './signup-user.dto';
import { SignupStatus } from './signup-status';
import { UserService } from 'src/app/components/user/user.service';

@Injectable()
export class SignupService {
  constructor(private readonly userService: UserService) {}

  async registerUser(user: SignupUserDto): Promise<SignupStatus> {
    const { firstname, lastname, email, password } = user;
    const status: SignupStatus = {
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
