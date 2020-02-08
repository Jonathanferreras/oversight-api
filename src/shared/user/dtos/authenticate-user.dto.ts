import { IsString, IsEmail } from 'class-validator';

export class AuthenticateUserDto {
  @IsEmail() readonly email: string;
  @IsString() readonly password: string;
}
