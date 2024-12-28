import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCUclhtX9nVt3MZsZMX8ioA9PJ5own8Rwc",
  authDomain: "worldcoin-7cbcf.firebaseapp.com",
  projectId: "worldcoin-7cbcf",
  storageBucket: "worldcoin-7cbcf.appspot.com",
  messagingSenderId: "65661095727",
  appId: "1:65661095727:web:cdcfc2c2fdb568f540dbda"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Configurar emuladores para desarrollo local
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
}

// Configurar dominios permitidos para autenticación
const allowedDomains = [
  'localhost',
  '127.0.0.1',
  'stackblitz.com',
  'webcontainer.io'
];

// Verificar si el dominio actual está permitido
const currentDomain = window.location.hostname;
if (!allowedDomains.includes(currentDomain)) {
  console.warn(`Domain ${currentDomain} is not authorized for Firebase Authentication`);
}