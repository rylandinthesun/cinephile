import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';
import joinStyles from '../styles/Join.module.css';

const uiConfig = {
	signInOptions    : [
		firebase.auth.EmailAuthProvider.PROVIDER_ID,
		firebase.auth.GoogleAuthProvider.PROVIDER_ID
	],
	signInSuccessUrl : '/'
};

const SignIn = () => {
	return (
		<div className={joinStyles.container}>
			<div className={joinStyles.firebaseBtns}>
				<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
			</div>
		</div>
	);
};

export default SignIn;
