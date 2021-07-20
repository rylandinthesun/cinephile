import firebase from 'firebase';

const firebaseConfig = {
	apiKey            : 'AIzaSyCKGOW31iB9TWJHD5lnKnB6fe8XIV_hmzg',
	authDomain        : 'cinephile-db.firebaseapp.com',
	databaseURL       : 'https://cinephile-db.firebaseio.com',
	projectId         : 'cinephile-db',
	storageBucket     : 'cinephile-db.appspot.com',
	messagingSenderId : '30740931964',
	appId             : '1:30740931964:web:9a150a58b7f8b82f90f0f9',
	measurementId     : 'G-80JHX9T3FP'
};

export default function firebaseClient () {
	if (!firebase.apps.length) {
		firebase.initializeApp(firebaseConfig);
	}
}
