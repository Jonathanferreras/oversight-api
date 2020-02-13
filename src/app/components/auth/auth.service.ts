import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/app/shared/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async authenticateUser(username: string, password: string) {
    const user = await this.userService.find(username);

    if (user && await this.comparePasswordToHash(password, user.hash)) {

    return {
      success: true,
      message: 'Login successful!',
      };
    }

    return null;
  }

  private async comparePasswordToHash(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
