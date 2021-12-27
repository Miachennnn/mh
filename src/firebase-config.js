import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDimLGvcshlxCmTH-2LzERKYemDHRrxCag',
	authDomain: 'mether-affcb.firebaseapp.com',
	projectId: 'mether-affcb',
	storageBucket: 'mether-affcb.appspot.com',
	messagingSenderId: '445664186100',
	appId: '1:445664186100:web:abb8212e741cb1628758a1'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();
