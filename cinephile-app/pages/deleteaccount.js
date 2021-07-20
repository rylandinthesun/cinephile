import Head from 'next/head';
import firebase from 'firebase';
import 'firebase/firestore';
import { useAuth } from '../firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import deleteStyles from '../styles/Delete.module.css';

const deleteaccount = () => {
	const { user } = useAuth();
	const router = useRouter();

	const deleteProfile = () => {
		user
			.delete()
			.then(() => {
				console.log('User successfully deleted.');
				router.push('/');
			})
			.catch((error) => {
				console.log('Error: ', error);
			});
	};

	return (
		<div>
			{user && (
				<div>
					<Head>
						<title>Delete Account</title>
					</Head>
					<div className={deleteStyles.heading}>
						<div>Delete Account</div>
					</div>
					<div className={deleteStyles.container}>
						<div className={deleteStyles.userInfo}>
							<div>Are you sure you want to permanently delete your account?</div>
							<p>All of your saved data will be removed.</p>
							<div className={deleteStyles.btnContainer}>
								<Link href="/dashboard">Go Back</Link>
								<button onClick={deleteProfile}>Permanently Delete</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default deleteaccount;
