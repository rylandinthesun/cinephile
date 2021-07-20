import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebaseClient from '../firebase/firebaseClient';
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

const SignInScreen = () => {
	return (
		<div className={joinStyles.container}>
			<div className={joinStyles.firebaseBtns}>
				<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
			</div>
		</div>
	);
};

export default SignInScreen;
