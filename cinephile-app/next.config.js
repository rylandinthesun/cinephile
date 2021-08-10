module.exports = {
	reactStrictMode : true,
	env             : {
		NEXT_PUBLIC_FIREBASE_API_KEY             : process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
		NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN         : process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
		NEXT_PUBLIC_DATABASE_URL                 : process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
		NEXT_PUBLIC_FIREBASE_PROJECT_ID          : process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET      : process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
		NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID : process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
		NEXT_PUBLIC_FIREBASE_APP_ID              : process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
		OMDB_API_KEY                             : process.env.OMDB_API_KEY,
		GCLOUD_CREDENTIALS                       : process.env.GCLOUD_CREDENTIALS
	},

	images          : {
		domains : [
			'upload.wikimedia.org',
			'm.media-amazon.com',
			'st3.depositphotos.com',
			'lh3.googleusercontent.com'
		]
	}
};
