import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const config = {
  apiKey: 'AIzaSyDtVC3VQ1Z8XzQYDkWwnTOC_NFo8ny5c90',
  authDomain: 'todomanager-5444a.firebaseapp.com',
  databaseURL: 'https://todomanager-5444a.firebaseio.com',
  projectId: 'todomanager-5444a',
  storageBucket: 'todomanager-5444a.appspot.com',
  messagingSenderId: '254572727152',
};

export const initializeFirebaseApi = () => firebase.initializeApp(config);

export const createUserOnFirebaseAsync = async (email, password) => {
  const {user} = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  return user;
};

export async function signInOnFirebaseAsync(email, password) {
  const user = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
  return user;
}

export const currentFirebaseUser = () => {
  return new Promise((resolve, reject) => {
    let unsubscribe = null;
    unsubscribe = firebase.auth().onAuthStateChanged(
      user => {
        resolve(user);
      },
      error => {
        reject(error);
      },
      () => {
        unsubscribe();
      },
    );
  });
};
