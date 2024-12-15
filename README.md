# GreenPick - Hackathon UniEvangélica

### Descrição:
API Rest desenvolvida para atender o projeto **GreenPick**, com o objetivo de:
- Receber cadastro de Pontos de Coleta de Recicláveis.
- Gerenciar Solicitações de Coletas de Usuários.
- Administrar Veículos de Coleta.
- Processar e armazenar coordenadas geográficas.
A arquitetura utilizada segue o padrão **Model-Controller**.

### Tecnologias:
- **Node.js**
- **Express**
- **Sequelize**
- **MySQL**

### Instruções:
1. Instale as dependências do projeto:
   ```CMD
   npm install


2. Inicie o projeto:
   ```CMD
   npm start


3. Em outro terminal, abra a pasta /keys e rode o comando:
   ```CMD
   node KeyGenerete.js


4. copie o valor gerado no terminal e salve a Secrete Kei no arquivo ```"/.env"``` na raiz do projeto