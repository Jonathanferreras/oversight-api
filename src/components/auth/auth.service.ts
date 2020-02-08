import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/shared/user/user.service';
import { RegisterUserDto } from 'src/shared/user/dtos/register-user.dto';
import { RegistrationStatus } from './interfaces/registration-status';
import { AuthenticateUserDto } from 'src/shared/user/dtos/authenticate-user.dto';
import { User } from 'src/shared/user/user';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) { }

  async authenticateUser(user: AuthenticateUserDto): Promise<User | null> {
    const foundUser = await this.userService.find(user.email);
    const correctPassword = await this.comparePasswordToHash(user.password, foundUser.hash);

    if (foundUser && correctPassword) {
      return foundUser;
    }

    return null;
  }

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

  private async comparePasswordToHash(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
