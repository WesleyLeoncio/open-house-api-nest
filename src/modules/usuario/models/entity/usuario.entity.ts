import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable, ManyToMany, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEntity } from '../../../role/models/entity/role.entity';
import { AvaliacaoDeFilmesEntity } from '../../../avaliacao/models/entity/avaliacaoDeFilmes.entity';

@Entity({ name: 'usuarios' })
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', length: 150, nullable: false })
  nome: string;

  @Column({ name: 'login', length: 150, nullable: false, unique: true })
  login: string;

  @Column({ name: 'senha', length: 255, nullable: false })
  senha: string;

  @Column({ name: 'status', type: 'boolean', default: true, nullable: false })
  status: boolean;

  @ManyToMany(() => RoleEntity, { cascade: ['insert'] })
  @JoinTable({
    name: 'profiles',
    joinColumn: { name: 'usuario_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: RoleEntity[];

  @OneToMany(()=> AvaliacaoDeFilmesEntity,
    (avaliacao) => avaliacao.usuario, {cascade: true, onDelete: 'CASCADE'})
  avaliacoes: AvaliacaoDeFilmesEntity[];


  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}