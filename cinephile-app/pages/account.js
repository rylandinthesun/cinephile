import Head from 'next/head';
import Link from 'next/link';
import nookies from 'nookies';
import { verifyIdToken } from '../firebase/firebaseAdmin';
import React from 'react';
import profileStyles from '../styles/Profile.module.css';

const Account = ({ token }) => {
	return (
		<div>
			<Head>
				<title>{name}&apos;s Account</title>
			</Head>
			{token && (
				<div>
					<div className={profileStyles.heading}>
						<div>{token.name}&apos;s Account</div>
					</div>

					<div className={profileStyles.container}>
						<div className={profileStyles.userInfo}>
							<div>
								<span>Name: </span>
								{token.name}
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
