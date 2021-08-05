import admin from 'firebase-admin';
const serviceAccount = require('../serviceAccountKey.json');

export const verifyIdToken = (token) => {
	if (!admin.apps.length) {
		admin.initializeApp({
			credential  : admin.credential.cert(serviceAccount),
			databaseURL : 'https://cinephile-db.firebaseio.com'
		});
	}

	return admin.auth().verifyIdToken(token).catch((error) => {
		throw error;
	});
};
