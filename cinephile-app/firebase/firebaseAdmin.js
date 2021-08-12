import admin from 'firebase-admin';

// const google_credentials = JSON.parse(Buffer.from(process.env.GCLOUD_CREDENTIALS, 'base64'));

export const verifyIdToken = (token) => {
	const google_credentials = {
		type                        : 'service_account',
		project_id                  : 'cinephile-db',
		private_key_id              : process.env.NEXT_GOOGLE_PRIVATE_KEY_ID,
		private_key                 : JSON.parse(process.env.NEXT_GOOGLE_SERVICE_ACCOUNT_KEY),
		client_email                : 'firebase-adminsdk-vgvzc@cinephile-db.iam.gserviceaccount.com',
		client_id                   : '115384192636869386089',
		auth_uri                    : 'https://accounts.google.com/o/oauth2/auth',
		token_uri                   : 'https://oauth2.googleapis.com/token',
		auth_provider_x509_cert_url : 'https://www.googleapis.com/oauth2/v1/certs',
		client_x509_cert_url        :
			'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-vgvzc%40cinephile-db.iam.gserviceaccount.com'
	};

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
