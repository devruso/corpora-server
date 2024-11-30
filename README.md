
# Corpora - Backend

Este é o backend da aplicação **Corpora**, desenvolvido com **NestJS** utilizando **TypeScript**. Ele fornece serviços para autenticação, autorização, integração com OAuth (Google) e gerenciamento de empresas associadas a usuários.

---

## 🚀 Funcionalidades

- Autenticação e autorização com **JWT** e **OAuth Google**.
- Suporte a guardas para controle de acesso: **Local**, **JWT** e **Google**.
- Operações CRUD para empresas (Create, Read, Update, Delete).
- Estrutura modular seguindo princípios **SOLID** e organização limpa.
- Conexão com **MySQL** usando **TypeORM**.

---

## 🛠️ Tecnologias

- **NestJS** (Framework para Node.js)
- **TypeScript**
- **JWT** para autenticação
- **OAuth2** para login com Google
- **MySQL** como banco de dados
- **TypeORM** para modelagem e gerenciamento do banco de dados

---

## ⚙️ Configuração do Ambiente

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure o arquivo `.env`:**  
   Crie um arquivo `.env` na raiz do projeto e adicione os seguintes valores que existem no arquivo `.env.example`:

   ```plaintext
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=sua_senha_do_banco
   DB_NAME=corpora
   JWT_SECRET=12345
   JWT_EXPIRES_IN=1d
   REFRESH_JWT_SECRET=12345
   REFRESH_JWT_EXPIRES_IN=7d
   GOOGLE_CLIENT_ID=seu_google_client_id
   GOOGLE_SECRET=seu_google_secret
   GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
   ```

3. **Tenha um servidor MySQL configurado:**  

   ```

---

## 🏃 Executando o Backend

1. **Modo de Desenvolvimento:**
   ```bash
   npm run start:dev
   ```

---

## 📖 Decisões Técnicas

- **Modularidade e SOLID:**  
  A arquitetura do backend foi projetada com módulos independentes e bem definidos, como `AuthModule`, `UserModule`, e `CompanyModule`, seguindo o princípio da **separação de responsabilidades**. Isso permite que novas funcionalidades sejam adicionadas ou alteradas com impacto mínimo em outras partes do sistema.

- **NestJS Framework:**  
  O NestJS foi escolhido por sua abordagem opinativa e sua aderência aos princípios da engenharia de software, como o SOLID. Ele oferece uma estrutura robusta e escalável, permitindo a criação de APIs RESTful com práticas modernas.

- **TypeORM:**  
  Utilizado para simplificar a interação com o banco de dados MySQL. Com ele, foi possível:
  - Gerenciar entidades com facilidade.
  - Sincronizar o esquema do banco de dados.
  - Garantir a consistência e integridade dos dados por meio de validações a nível de entidade.

- **Guards para Controle de Acesso:**  
  Os **Guards** do NestJS foram essenciais para proteger as rotas e garantir que somente usuários autorizados pudessem realizar determinadas ações. As implementações incluem:
  - **LocalGuard:** Realiza a autenticação inicial do usuário com credenciais tradicionais.
  - **JwtGuard:** Verifica e valida tokens JWT para proteger rotas de acesso restrito.
  - **GoogleGuard:** Facilita o login com OAuth 2.0 do Google, integrando a autenticação social de forma segura.

- **Injeção de Dependência:**  
  O uso nativo do NestJS para gerenciar dependências tornou o código mais limpo e fácil de testar, promovendo a reutilização de serviços e a manutenção do projeto.

---

## 🔑 Configuração do OAuth Google

1. Acesse o [Console de API do Google](https://console.developers.google.com/).
2. Crie um projeto e habilite o **OAuth 2.0**.
3. Adicione as seguintes URLs de redirecionamento:
   - **`http://localhost:3000/auth/google/callback`**
4. Copie o **Client ID** e **Secret** e configure no `.env`, substituindo os valores das variáveis existentes.

---

## 📂 Estrutura do Projeto

```plaintext
src/
├── auth/                 # Módulo de autenticação
├── auth/decorators       # Decorator para role de usuario
├── auth/enums            # Enum de role de usuario
├── auth/guard            # Validação de rota com tipo de autenticação
├── auth/jwt              # Configuração do token e refresh token do jwt 
├── company/              # Módulo de empresas
├── config/               # Configuração do google 
├── dto/                  # Dto de paginação
├── strategies/           # Estratégias de autenticação
├── typeOrm/              # Configuração das entidades do banco de dados
├── user/                 # Modulo de usuario
├── utils/                # Tamanho padrão do retorno de uma requisicao
├── main.ts               # Arquivo principal
├── database-init.ts      # Arquivo de configuração do banco de dados
```

---
