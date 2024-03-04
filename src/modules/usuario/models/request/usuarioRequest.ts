import { ArrayMinSize, IsArray, IsEmail, IsNotEmpty} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleUserRequest } from '../../../role/models/request/role.user.request';



export class UsuarioRequest {
  @IsNotEmpty({message: "Nome do usuario deve ser preenchido!"})
  @ApiProperty({
    example: 'Carlos Magno',
    description: 'O nome não pode ser vazio.'
  })
  nome: string;

  @IsEmail({}, {message: "Esse email não é valido, ex: email@email.com"})
  @ApiProperty({
    example: 'email@email.com',
    description: ' O login deve ser um email valido seguindo o padrão de emails.'
  })
  login: string;

  @IsNotEmpty({message: "A senha deve ser preenchida!"})
  @ApiProperty({
    example: '123456',
    description: 'A senha não pode ser vazia'
  })
  senha: string;

  @IsArray()
  @ArrayMinSize(1, {message: "Usuario deve ter no minimo uma role"})
  @ApiProperty({
    type: () => [RoleUserRequest],
  })
  roles: RoleUserRequest[];
}