import { IsString, IsEmail } from 'class-validator';

export class AuthenticateUserDto {
  @IsEmail() readonly username: string;
  @IsString() readonly password: string;
}
