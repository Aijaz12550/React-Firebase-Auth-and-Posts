import React  from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase'
var firebaseConfig = {
    apiKey: "",
    authDomain: "dream-world-d2cc2.firebaseapp.com",
    databaseURL: "",
    projectId: "dream-world-d2cc2",
    storageBucket: "",
    messagingSenderId: "1030010325982",
    appId: ""
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
if(module.hot){
    module.hot.accept()
}
