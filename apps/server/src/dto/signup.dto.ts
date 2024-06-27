import { IsNotEmpty, MinLength } from 'class-validator';
import { IsUsernameUnique } from '../validator/usernameUnique.validator';

export class SignupDto {
  @IsNotEmpty({ message: 'Username is required.' })
  @IsUsernameUnique()
  readonly username: string;

  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(6)
  readonly password: string;
}
