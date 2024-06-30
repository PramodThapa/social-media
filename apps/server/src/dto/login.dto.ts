import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required.' })
  readonly email: string;

  @IsNotEmpty({ message: 'Password is required.' })
  readonly password: string;
}
