import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useAuth } from '../firebase/auth';
import joinStyles from '../styles/Join.module.css';

const uiConfig = {
	signInOptions    : [
		firebase.auth.EmailAuthProvider.PROVIDER_ID,
		firebase.auth.GoogleAuthProvider.PROVIDER_ID
	],
	signInSuccessUrl : '/'
};

const SignIn = () => {
	const { user } = useAuth();

	return (
		<div className={joinStyles.container}>
			{!user ? (
				<div className={joinStyles.firebaseBtns}>
					<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
				</div>
			) : null}
		</div>
	);
};

export default SignIn;
