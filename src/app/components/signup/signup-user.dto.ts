import { IsString, IsEmail } from 'class-validator';

export class SignupUserDto {
  @IsString() readonly firstname: string;
  @IsString() readonly lastname: string;
  @IsEmail() readonly email: string;
  @IsString() readonly password: string;
}
