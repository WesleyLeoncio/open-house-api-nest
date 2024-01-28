import { Reflector } from '@nestjs/core';
import { Roles } from '../../../role/models/enum/Roles';

export const PreAuthorize = Reflector.createDecorator<Roles[]>();