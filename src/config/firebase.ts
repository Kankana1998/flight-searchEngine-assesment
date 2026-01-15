import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCE7htipOyCl8qbcbeUpp4LTLphatQF_K0",
    authDomain: "airplane-booking-app-b8603.firebaseapp.com",
    projectId: "airplane-booking-app-b8603",
    storageBucket: "airplane-booking-app-b8603.firebasestorage.app",
    messagingSenderId: "571054426406",
    appId: "1:571054426406:web:91929f63c8048b15a919e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
