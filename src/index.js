import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from 'firebase/app';
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyB1lTUTSklD_Q2BiypPunibwTSZW5LyrY4",
    authDomain: "trello-f1f4e.firebaseapp.com",
    databaseURL: "https://trello-f1f4e.firebaseio.com",
    projectId: "trello-f1f4e",
    storageBucket: "trello-f1f4e.appspot.com",
    messagingSenderId: "972721753920",
    appId: "1:972721753920:web:b01a9b3fa40cc492ebb4a5",
    measurementId: "G-V65M2WJKNN"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

ReactDOM.render(
    <Router>
        <App db={db} />
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
