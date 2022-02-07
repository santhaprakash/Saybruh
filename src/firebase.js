import { initializeApp } from 'firebase/app';
import {getFirestore,collection} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDAAc4ROrvD-jy-vUz-ZYEoRQDnfNEdgMM",
    authDomain: "mini-media-6976b.firebaseapp.com",
    projectId: "mini-media-6976b",
    storageBucket: "mini-media-6976b.appspot.com",
    messagingSenderId: "935071637711",
    appId: "1:935071637711:web:912e8ffecfa19498ba17ba"
  };

const app = initializeApp(firebaseConfig);
//getting database
export const db=getFirestore();
//getting collections
export const collect=collection(db,'posts');
export const tempcollect=collection(db,'users')
export const temp=collection(db,'feed')
export const msg=collection(db,'messages')
export const lastmsgs=collection(db,'lastmessage')
export const storage= getStorage();
