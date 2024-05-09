# Sistema

<p>
Este é um sistema projetado para aprimorar os cuidados no ambiente por meio do monitoramento preciso das condições dos ambientes . Com a API do Airpure fornecendo os  dados em tempo real sobre a luminosidade, umidade, nível de ruído, presença de compostos orgânicos voláteis (VOCs) e temperatura, essenciais para garantir um ambiente seguro e saudável. Todas essas informações são facilmente acessíveis aos profissionais responsáveis pela UTI por meio de uma plataforma web intuitiva, oferecendo uma visão abrangente e atualizada das condições do ambiente.Com o Sistema os profissionais podem tomar decisões mais rápidas, proporcionando o melhor cuidado possível aos pacientes de alto risco.

</p>   

#### Concepção
* Termo de abertura
* Documento de concepção

#### Elaboração
* Documento de elaboração

#### Construção
* Planejamento
* Cronograma
* Backlog
* Relatórios por sprint

### Tecnologias utilizadas
* Javascript
* NodeJS
* ExpressJS
* Sequelize
* MySQL

## Pré-requisitos
- NodeJS
- MySQL

- Criar arquivo .env na pasta raiz backend com as credenciais
```
EX:
//Credenciais Locais
DB_HOST = "endereço do banco de dados"
DB_USER = "usuario do banco de dados"
DB_PASS = "senha do banco de dados"
DB_NAME = "nome do banco de dados"
//Credenciais AirPure
ACESS_USER = "usuario de acesso"
ACESS_PASS = "senha de acesso"
```

## Instalação
- npm install

## Start backend e frontend
- Dentro da pasta backend
- npm run dev

## Start backend
- node api.js
ou
- nodemon api.js

## Start frontend
- npm run start
ou
- yarn run start