import { Injectable } from '@nestjs/common';

import { UsersService } from '../users.service';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  async validate(email: string): Promise<boolean> {
    return await this.usersService.validateUniqueEmail(email);
  }

  defaultMessage(): string {
    return 'Email already taken.';
  }
}

export function IsUsernameUnique() {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      validator: UniqueConstraint,
    });
  };
}
