import { ArrayMinSize, IsArray, IsDateString, IsNotEmpty } from 'class-validator';
import { CategoriaFilmeRequest } from '../../../categoria/models/request/categoria.filme.request';
import { ApiProperty } from '@nestjs/swagger';


export class FilmeRequest {
  @IsNotEmpty({ message: 'Nome do Filme deve ser preenchido!' })
  @ApiProperty({
    example: 'BATMAN 2',
    description: 'O nome do filme deve ser unico e não pode ser vazio',
  })
  nome: string;

  @IsNotEmpty({ message: 'Descrição do Filme deve ser preenchido!' })
  @ApiProperty({
    example: 'O filme conta historia de um homem ....',
    description: 'A descrição do filme deve ser um preve resulmo sobre o filme.',
  })
  descricao: string;

  @IsNotEmpty({ message: 'Data do Filme deve ser preenchido!' })
  @IsDateString({}, { message: 'A data de lançamento deve ser uma data valida!' })
  @ApiProperty({
    example: '2024-02-21',
    description: 'A data de lançamento deve seguir o padrão ano-mês-dia',
  })
  dataLancamento: Date;

  @IsNotEmpty({ message: 'Duração do Filme deve ser preenchido!' })
  @ApiProperty({
    example: '1h 45m',
    description: 'A duração do filme deve seguir o padrão horas minutos',
  })
  duracao: string;

  @IsNotEmpty({ message: 'Imagem do Filme deve ser preenchido!' })
  @ApiProperty({
    example: 'imagem.png',
    description: 'A imagem do filme não pode ser vazia',
  })
  imagem: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'O Filme deve ter no minimo uma categoria' })
  @ApiProperty({
    type: () => [CategoriaFilmeRequest],
  })
  categorias: CategoriaFilmeRequest[];
}