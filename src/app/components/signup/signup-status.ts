import { IsBoolean, IsString } from 'class-validator';

export class SignupStatus {
  @IsBoolean() success: boolean;
  @IsString() message: string;
}
