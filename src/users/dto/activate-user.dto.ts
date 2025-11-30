import { IsEmail, IsString } from 'class-validator';

export class ActivateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
