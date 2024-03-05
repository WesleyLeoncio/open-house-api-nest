<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## DESCRIÇÃO
O desenvolvimento dessa API tem como objetivo criar uma aplicação que seja capas de cadastrar e gerenciar filmes além de poder realizar avaliações.

### ✔️ TÉCNICAS E TECNOLOGIAS UTILIZADAS
- NESTJS
- TYPEORM
- SGBD (PostGresSQL)
- Docker
- Paginação
- JWT TOKEN
- Autorização 
- Autenticação 
- Documentação - Swagger

### O QUE FOI DESENVOLVIDO
- CRUD - FILMES
- CRUD- USUARIOS
- AVALIAÇÃO DE FILMES (REGRA DE NEGOCIO)
- AUTENTICAÇÃO
- AUTORIZAÇÃO

### DOCUMENTAÇÃO SWAGGER
- `http://localhost:3000/api#/`
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

### COMANDOS BASICOS NODE/NESTJS
- Instalar Dependencias: `npm install`

- Iniciar projeto em modo dev: `npm run start:dev`

### DOCKER COMANDO BASICOS
- Subir container: `docker-compose up -d`
- Dropar container: `docker-compose down`

### COMANDOS PARA GERENCIAR MIGRATIONS NO TYPORM 

- Criar Migrations: `npm run typeorm migration:generate src/infra/database/migrations/NOME_MIGRATION`

- Executa Migrations: `npm run typeorm migration:run`

- Voltar Migrations: `npm run typeorm migration:revert`
