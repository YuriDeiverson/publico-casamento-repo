# 💍 Site de Casamento

[🔗 Acesse o site](https://publico-casamento-repo.vercel.app/)

Um site interativo para casamentos, onde os convidados podem conhecer a história do casal, conferir o dress code, o local do evento, a lista de presentes e confirmar presença. O sistema também oferece **área administrativa para os noivos** acompanharem confirmações e presentes escolhidos.

---

## 🎯 Funcionalidades

### Para os convidados:
- **História do casal**: Página com a história dos noivos.
- **Dress code**: Informações sobre a roupa ideal para o evento.
- **Local do evento**: Endereço completo do casamento.
- **Lista de presentes**:
  - Seleção de presentes físicos.
  - Opção de enviar valor em dinheiro no lugar de um presente.
  - Item selecionado fica bloqueado para evitar duplicidade.
- **Confirmação de presença**: Convidados informam se irão ou não ao casamento.

### Para os noivos (admin):
- **Login seguro**.
- **Painel administrativo**:
  - Visualização de confirmações de presença.
  - Lista de presentes escolhidos ou valores enviados.

---

## 🛠 Tecnologias utilizadas

- **Frontend**:
  - React + TypeScript
  - Tailwind CSS
- **Backend / Banco de dados**:
  - Firebase Authentication
  - Firestore
- **Hospedagem**:
  - Vercel

---

## ⚡ Como rodar localmente

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/publico-casamento.git
cd publico-casamento
Instale as dependências:

bash
Copiar código
npm install
# ou
yarn install
Configure o Firebase:

Crie um projeto no Firebase

Crie um arquivo .env na raiz do projeto com as variáveis:

env
Copiar código
VITE_FIREBASE_API_KEY=COLE_SUA_API_KEY_AQUI
VITE_FIREBASE_AUTH_DOMAIN=SEU_PROJETO.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=SEU_PROJETO
VITE_FIREBASE_STORAGE_BUCKET=SEU_PROJETO.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=SEU_SENDER_ID
VITE_FIREBASE_APP_ID=SEU_APP_ID
VITE_FIREBASE_MEASUREMENT_ID=SEU_MEASUREMENT_ID
Rode o projeto:

bash
Copiar código
npm run dev
# ou
yarn dev
Abra http://localhost:5173 no navegador.

📝 Estrutura do projeto
bash
Copiar código
src/
├─ components/        # Componentes React (Navbar, Header, Login, etc)
├─ firebase.ts        # Inicialização do Firebase
├─ App.tsx            # Roteamento das páginas
└─ main.tsx           # Ponto de entrada do React
🔑 Observações
Apenas convidados podem confirmar presença e selecionar presentes.

Apenas noivos/admin possuem acesso ao painel de visualização de confirmações.

Todos os dados são armazenados em Firestore do Firebase.

Itens de presente bloqueiam automaticamente quando escolhidos.

📌 Deploy
O site está hospedado na Vercel:

https://publico-casamento-repo.vercel.app/#

👏 Contribuição
Pull requests são bem-vindos!
Para mudanças significativas, abra uma issue primeiro para discutirmos as alterações.
