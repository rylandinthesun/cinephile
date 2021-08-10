import admin from 'firebase-admin';

const google_credentials = JSON.parse(Buffer.from(process.env.GCLOUD_CREDENTIALS, 'base64').toString());

export const verifyIdToken = (token) => {
	if (!admin.apps.length) {
		admin.initializeApp({
			credential  : admin.credential.cert(google_credentials),
			databaseURL : 'https://cinephile-db.firebaseio.com'
		});
	}

	return admin.auth().verifyIdToken(token).catch((error) => {
		throw error;
	});
};
