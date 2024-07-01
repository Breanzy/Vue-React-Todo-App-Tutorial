import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: 'AIzaSyALmSTjJ6kOTxdqyOXRSH_xxhxFdYKLU4Q',
  authDomain: 'badass-todo-90396.firebaseapp.com',
  projectId: 'badass-todo-90396',
  storageBucket: 'badass-todo-90396.appspot.com',
  messagingSenderId: '136028974035',
  appId: '1:136028974035:web:40923630817a3844305d26'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{
    db
}