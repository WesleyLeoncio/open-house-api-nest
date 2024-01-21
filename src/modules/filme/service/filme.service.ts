import { Injectable } from '@nestjs/common';
import { IfilmeRepository } from '../repository/ifilme.repository';

@Injectable()
export class FilmeService {
  constructor(
    private readonly filmeRepository: IfilmeRepository,
  ) {
  }

  async listarTodosFilmes() {
    return await this.filmeRepository.findAll();
  }


}