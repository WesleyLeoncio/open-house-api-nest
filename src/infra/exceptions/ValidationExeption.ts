import { UnprocessableEntityException, ValidationError } from '@nestjs/common';

export class ValidationExeption extends UnprocessableEntityException{
  constructor(validationErrors: ValidationError[]) {
    const { constraints } = validationErrors[0];
    super(`${Object.keys(constraints)[0]}: ${Object.values(constraints)[0]}`);
  }
}