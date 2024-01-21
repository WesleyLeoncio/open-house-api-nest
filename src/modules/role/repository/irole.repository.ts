import { GenericRepository } from '../../utils/repository/generic.repository';
import { RoleEntity } from '../models/entity/role.entity';

export abstract class IroleRepository extends GenericRepository<RoleEntity>{}