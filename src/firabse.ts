import { initializeApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import type { Auth } from 'firebase/auth';
import type { FirebaseApp } from 'firebase/app';

const isPublicDemo = import.meta.env.VITE_PUBLIC_DEMO === "true";

// ----- Interfaces para o mock -----
interface MockDoc {
  id: string;
  data: () => Record<string, unknown>; // dados genéricos
}

interface MockFirestore {
  collection: () => {
    get: () => Promise<{ docs: MockDoc[] }>;
    add: () => Promise<null>;
  };
}

interface MockAuth {
  signInWithEmailAndPassword: () => Promise<null>;
  createUserWithEmailAndPassword: () => Promise<null>;
  signOut: () => Promise<null>;
}

// ----- Variáveis do Firebase -----
let app: FirebaseApp | null = null;
let db: Firestore | MockFirestore | null = null;
let auth: Auth | MockAuth | null = null;

// ----- Inicialização -----
if (!isPublicDemo) {
  // Firebase real
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  };

  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);

} else {
  // Mock para demo pública
  db = {
    collection: () => ({
      get: async () => ({ docs: [] as MockDoc[] }),
      add: async () => null
    })
  };

  auth = {
    signInWithEmailAndPassword: async () => null,
    createUserWithEmailAndPassword: async () => null,
    signOut: async () => null
  };
}

// ----- Exportações -----
export { db, auth };
