import { DocumentBuilder } from '@nestjs/swagger';

export class SwaggerConfig {

  private descricaoHtml(): string {
    return `<html lang="pt-br">
        <div>
           <img height="80" width="100"  src="https://titleinsurancewebdesign.com/firsttitleabstract/wp-content/uploads/sites/55/2014/03/open-house.jpg" alt="Imagem">
           <p>API DE EXEMPLO UTILIZANDO NESTJS</p>
        </div>
      </html>`;
  }

  documentBuillder(): DocumentBuilder {
    return new DocumentBuilder()
      .setDescription(this.descricaoHtml())
      .addTag('Endpoint De Login')
      .addTag('Endpoints De Roles')
      .addTag('Endpoints De Usuários')
      .addTag('Endpoints De Categorias')
      .addTag('Endpoints De Filmes')
      .addTag('Endpoints De Avaliar Filmes')
      .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter token',
        in: 'header',
      }, 'KEY_AUTH');
  }

}