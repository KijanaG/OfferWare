import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AuthProvider } from './context/AuthProvider';
import 'react-google-places-autocomplete/dist/assets/index.css';
import firebase from 'firebase/app'
import config from './assets/config.json';
import 'firebase/storage'

var firebaseConfig = {
    apiKey: config.firebase,
    authDomain: "deal-photos.firebaseapp.com",
    databaseURL: "https://deal-photos.firebaseio.com",
    projectId: "deal-photos",
    storageBucket: "deal-photos.appspot.com",
    messagingSenderId: "601571686481",
    appId: "1:601571686481:web:1463ae0b608f8b7bd5e070",
    measurementId: "G-X8LG2NP2NT"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

const app = (
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
