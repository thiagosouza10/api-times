## 🛠️ Desenvolvimento de APIs
Criando API RESTful com Node.js e Express, estruturando rotas e implementando operações CRUD básicas.

## 🗃️ Banco de Dados
Conexão com MongoDB utilizando Mongoose. 

## **Pré-requisitos:**

1. **Node.js (LTS)** 
Certifique-se de ter o Node.js instalado.

2. **Visual Studio Code**  
Utilize o Visual Studio Code como seu ambiente de desenvolvimento

3. **MongoDB**
Crie uma conta https://cloud.mongodb.com/ e projeto para banco para armazenar os dados.

4. **MongoDB**
No arquivo app.js o método connetc recebe a string de conexão do banco Mongo, assim que efetuar o passo 3, é necessário pegar sua string de conexão para colocar no método.
Também é necessário a criação de um arquivo .env de nome apitimes.env, para passar sua senha, o arquivo deve conter SENHA_MONGODB = 'Aqui sua senha'

API RESTful em Node.js para um sistema de cadastro de Times. A API deve incluir as seguintes funcionalidades:

1. **Cadastro de times**: Permita que os usuários cadastrem times informando tecnico, nome, estadio, pais, local, ano fundacao e torcida. Todos os campos são obrigatórios.
2. **Listagem de times**: Endpoint para listar todos os times cadastrados.
3. **Consulta de time por ID**: Endpoint que permita consultar um time específico usando seu ID.
4. **Remoção de Time**: Endpoint para deletar um time utilizando seu ID.
5. **Banco de Dados**: MongoDB como banco de dados.

#### **Requisitos técnicos:**

- Crie uma conta https://cloud.mongodb.com/ e projeto para banco para armazenar os dados.
- Utilize Express.js para gerenciar as rotas da API.
- Use Mongoose para a modelagem dos dados e integração com o MongoDB.
- Inclua tratamento de erros e validações adequadas para todos os endpoints.
- Adicione comentários no código para explicar as principais partes da implementação.

## **Subindo a API 🚀**

1. Clonar o repositório e instalar as dependências:

```
npm install
```

2. Para executar a API execute:

```
npm start
```