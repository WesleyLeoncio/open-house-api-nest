import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { FilmeEntity } from '../../../filme/models/entity/filme.entity';
import { UsuarioEntity } from '../../../usuario/models/entity/usuario.entity';

@Entity({ name: 'avaliacoes' })
export class AvaliacaoDeFilmesEntity {

  @PrimaryColumn({name: 'filme_id'})
  filmeId: string;

  @PrimaryColumn({name: 'usuario_id'})
  usuarioId: string;

  @ManyToOne(() => FilmeEntity)
  @JoinColumn({ name: 'filme_id' })
  filme: FilmeEntity;

  @ManyToOne(() => UsuarioEntity)
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioEntity;

  @Column({ name: 'nota', type: 'integer', nullable: false })
  nota: number;

}