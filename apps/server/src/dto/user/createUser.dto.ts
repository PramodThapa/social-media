import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { IsUsernameUnique } from '@/modules/users/validator/uniqueEmail.validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required.' })
  @IsUsernameUnique()
  readonly email: string;

  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty({ message: 'Username is required.' })
  readonly username: string;
}
