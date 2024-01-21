import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoleService } from '../service/role.service';
import { RoleRequest } from '../models/request/roleRequest';

@Controller('/roles')
export class RoleController {

  constructor(private readonly service: RoleService) {}

  @Get()
  getRoles(){
    return this.service.getRoles();
  }

  @Post()
  createRole(@Body() role: RoleRequest){
    return this.service.createRole(role);
  }

}