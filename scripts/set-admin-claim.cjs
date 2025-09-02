// set-admin-claim.cjs
const admin = require('firebase-admin');

// 1. Substitua pelo CAMINHO COMPLETO do seu arquivo serviceAccountKey.json
const serviceAccount = require('C:\\Users\\yurii\\Downloads\\meu-casamento-66b47-firebase-adminsdk-fbsvc-b882384527.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// 2. Substitua pelo UID do usuário dos noivos que você copiou do Firebase Authentication
const uidDoNoivo = 'LF2seMDzqWWSqMMO0OMCsAjFu4u2';
const uidDaNoiva = 'OW3mTa0cSfPeCjiotqiBhbVZNgg2';

admin.auth().setCustomUserClaims(uidDoNoivo, { admin: true })
  .then(() => {
    console.log(`Custom claim 'admin: true' definida para o usuário ${uidDoNoivo}`);
    console.log("Para que as mudanças entrem em vigor, o usuário deve fazer logout e login novamente.");
    process.exit();
  })
  .catch((error) => {
    console.error('Erro ao definir custom claim:', error);
    process.exit(1);
  });

  admin.auth().setCustomUserClaims(uidDaNoiva, { admin: true })
  .then(() => {
    console.log(`Custom claim 'admin: true' definida para o usuário ${uidDaNoiva}`);
    console.log("Para que as mudanças entrem em vigor, o usuário deve fazer logout e login novamente.");
    process.exit();
  })
  .catch((error) => {
    console.error('Erro ao definir custom claim:', error);
    process.exit(1);
  });



  