import { GenericRepository } from '../../utils/repository/generic.repository';
import { UsuarioEntity } from '../models/entity/usuario.entity';

export abstract class IusuarioRepository extends GenericRepository<UsuarioEntity>{}