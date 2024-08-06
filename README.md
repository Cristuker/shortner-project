# Short URL

Projeto que encurta URLs.


## Requerimentos

* Node.js v12 ou maior.
* Docker e docker compose
* Postman

## Stack

* NestJS
* Jest
* Docker
* Husky
* dotenv
* TypeORM
* MySQL
* JWT


## Como rodar

1. Clonar esse repositório

```bash
$ git clone https://github.com/Cristuker/teddy-api.git
```
2. Instalar as dependências

```bash
$ npm i
```
3. Criar o banco de dados

```bash
$ docker compose up -d ou docker-compose up -d # vai depender da versão instalada
```
4. Rodar a aplicação

> Ir para a raiz da aplicação e rodar cada serviço em um terminal

```bash
$ nest start shortner-api
```
```bash
$ nest start url-redirect
```

## Usando

Na raiz do projeto existe um collection do postman para ser importada e usada para fazer requisições.

## Melhorias

* Isolar banco de dados nos testes e usar um banco em memoria, como usei o MySQL que foi me informado que é o banco usado por vcs ele não tem uma versão em memória.

* Refatorar para tirar o use guards de todas as rotas
* Optei por deixar o serviço de redirecionamento separado pois no primeiro momento vai ser o mais usado pensando no mundo real. Onde a mesma URL pode ser acessada diversas vezes. Fazer com que as consultas fiquem mais rápidas para garantir o redirecionamento mais rápido ou até mesmo fazer com que a operação de redirecionamento e constagem aconteçam de forma paralela mas sem que haja falha na contagem ou redirecionamento.

**A documentação está disponivel no /api da aplicação**

## Redicionamento

O redirecionamento é feito por outro serviço no seguinte [respositório](https://github.com/Cristuker/url-redirect).

## Arquitetura

![Arquitetura](https://raw.githubusercontent.com/Cristuker/teddy-api/main/docs/url-api.png)

## Próximos passos

[ ] Configurar docker-compose para subir todo o ecossistema
[ ] Migrar o modulo de auth para um serviço
[ ] Organizar o projeto e mover coisas em comum para o modulo library
[ ] Subir projeto na AWS
[ ] Refazer documentação
[ ] Aumentar coverage
[ ] Criar github actions
    [ ] build
    [ ] test
    [ ] deploy
<p align="center">Made with ❤️ by <strong><a href="cristiansilva.dev" target="blank" >Cristian</></p></strong>
