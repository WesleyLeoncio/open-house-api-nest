import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable, ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoriaEntity } from '../../../categoria/models/entity/categoria.entity';

@Entity({ name: 'filmes' })
export class FilmeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', length: 150, nullable: false, unique: true })
  nome: string;

  @Column({ name: 'descricao', type: 'text', nullable: false})
  descricao: string;

  @Column({ name: 'data_lancamento', type: 'date', nullable: false })
  dataLancamento: Date;

  @Column({ name: 'duracao', length: 30, nullable: false })
  duracao: string;

  @Column({ name: 'imagem', length: 100, nullable: false })
  imagem: string;

  @ManyToMany(() => CategoriaEntity, { cascade: ["insert"] })
  @JoinTable({
    name: 'categoria_filme',
    joinColumn: { name: 'filme_id', referencedColumnName: "id"},
    inverseJoinColumn: { name: 'categoria_id',referencedColumnName: "id"},
  })
  categorias: CategoriaEntity[];


  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}