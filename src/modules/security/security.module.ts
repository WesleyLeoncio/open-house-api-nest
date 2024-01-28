import { Module } from '@nestjs/common';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [UsuarioModule],
  providers: [],
})
export class SecurityModule {
}