import Head from 'next/head';
import Link from 'next/link';
import nookies from 'nookies';
import { verifyIdToken } from '../firebase/firebaseAdmin';
import { useAuth } from '../firebase/auth';
import React, { useEffect, useState } from 'react';
import profileStyles from '../styles/Profile.module.css';

const Account = ({ token }) => {
	const { user } = useAuth();

	const [
		name,
		setName
	] = useState('');
	const [
		photo,
		setPhoto
	] = useState('');

	const getName = () => {
		if (!token.name) {
			const name = user.displayName;
			setName(name);
		}
		else {
			setName(token.name);
		}
	};

	const getPhoto = () => {
		if (!token.picture) {
			const pic =
				'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg';
			setPhoto(pic);
		}
		else {
			setPhoto(token.picture);
		}
	};

	useEffect(() => {
		if (user) {
			getName();
			getPhoto();
		}
	});

	return (
		<div>
			<Head>
				<title>{name}'s Account</title>
			</Head>
			{token && (
				<div>
					<div className={profileStyles.heading}>
						<div>{name}'s Account</div>
					</div>

					<div className={profileStyles.container}>
						<div className={profileStyles.userInfo}>
							<div>
								<span>Name: </span>
								{name}
							</div>
							<div>
								<span>Email: </span>
								{token.email}
							</div>
							<div className={profileStyles.btnContainer}>
								<Link href="/deleteaccount">Remove Account</Link>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export async function getServerSideProps (context) {
	try {
		const cookies = nookies.get(context);
		const token = await verifyIdToken(cookies.token);

		return {
			props : { token }
		};
	} catch (err) {
		context.res.writeHead(302, { Location: '/dashboard' }).end();
		context.res.end();
		return {
			props : []
		};
	}
}

export default Account;
