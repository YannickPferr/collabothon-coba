// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyD-cD-RgJN_2B0iPSUfR_GHjedilenBg3g',
    authDomain: 'collabothon-coba.firebaseapp.com',
    projectId: 'collabothon-coba',
    storageBucket: 'collabothon-coba.appspot.com',
    messagingSenderId: '110397512754',
    appId: '1:110397512754:web:ab669bfd1408614445b02b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
