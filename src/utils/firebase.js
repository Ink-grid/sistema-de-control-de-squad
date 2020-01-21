/** @format */

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyBYszb3x5dNdewwlLe1qh4SG_Q-zh_oXBs',
	authDomain: 'squad-35b7f.firebaseapp.com',
	databaseURL: 'https://squad-35b7f.firebaseio.com',
	projectId: 'squad-35b7f',
	storageBucket: 'squad-35b7f.appspot.com',
	messagingSenderId: '100552968880',
	appId: '1:100552968880:web:1eabc065bf5f482acec975',
	measurementId: 'G-SH65SR6TDR'
};

firebase.initializeApp(firebaseConfig);
export const { auth } = firebase;
export const provider = new firebase.auth.FacebookAuthProvider();
export const providerGoogle = new firebase.auth.GoogleAuthProvider();
export const providerGithub = new firebase.auth.GithubAuthProvider();
export const storage = firebase.storage();
export const database = firebase.database();
