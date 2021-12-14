// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export const InitializeFirebase = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAioK_0pdMEniIqmQ97K2HkmaaYWoSo8Wk",
    authDomain: "weddingproject2-ce55f.firebaseapp.com",
    databaseURL: "https://weddingproject2-ce55f-default-rtdb.firebaseio.com",
    projectId: "weddingproject2-ce55f",
    storageBucket: "weddingproject2-ce55f.appspot.com",
    messagingSenderId: "917688119636",
    appId: "1:917688119636:web:033e8eecfbb0b0699018c1",
    measurementId: "G-N61VX498CT",
  };

  // // Initialize Firebase
  // // const app = initializeApp(firebaseConfig);
  // // const analytics = getAnalytics(app);
  initializeApp(firebaseConfig);
};
