# Estrutura do Projeto:
models: Onde você definirá seus modelos de dados (usuário, roles, etc.).
controllers: Para tratar as requisições e respostas.
routes: Para definir as rotas/endpoints.
middlewares: Funções intermediárias para tratar requisições, como autenticação e logs.
services: Lógica de negócios, como criação de usuário ou verificação de permissões.
utils ou helpers: Funções utilitárias, como a que gera JWTs.

## Passo a Passo:

### Modelos:
Crie um modelo User com campos como id, username, hashedPassword, email e talvez roleId se estiver implementando RBAC.
Se estiver usando RBAC, crie também um modelo Role com campos como id e name.

### Autenticação:
Use bcrypt ou Argon2 para criar hashes das senhas antes de armazená-las no banco de dados.
Ao autenticar, compare a senha fornecida com a senha hash do banco de dados.
Se a senha estiver correta, gere um JWT e o retorne para o cliente.

### Autorização:

Use middlewares para verificar o JWT nas rotas que requerem autenticação.
Se estiver usando RBAC, seu middleware também pode verificar se o usuário tem a role necessária para acessar um determinado endpoint.

## Controllers e Rotas:

Crie controllers para gerenciar a lógica de registro, login, logout e outros relacionados à autenticação/autorização.
Defina rotas específicas para essas ações, por exemplo, POST /register, POST /login, etc.
```
├── app.js
│
├── package.json
│
├── models
│   ├── user.js
│   └── role.js
│
├── controllers
│   ├── authController.js
│   └── userController.js
│
├── routes
│   ├── authRoutes.js
│   └── userRoutes.js
│
├── middlewares
│   ├── auth.js
│   └── logger.js
│
├── services
│   ├── userService.js
│   └── roleService.js
│
└── utils
    ├── jwtHelper.js
    └── hashHelper.js

