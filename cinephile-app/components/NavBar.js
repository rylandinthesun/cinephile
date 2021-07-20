import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { RiFilmFill } from 'react-icons/ri';
import { BsCollectionFill } from 'react-icons/bs';
import { FaSignOutAlt, FaSearch } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { RiCloseFill } from 'react-icons/ri';
import { RiSettings5Fill } from 'react-icons/ri';
import firebase from 'firebase/app';
import navStyles from '../styles/NavBar.module.css';
import { useAuth } from '../firebase/auth';
import { useState } from 'react';

const NavLink = ({ href, name, icon }) => {
	return (
		<Link href={href} passHref>
			<a>
				{icon}
				{name}
			</a>
		</Link>
	);
};

const NavBar = () => {
	const router = useRouter();

	const [
		open,
		setOpen
	] = useState(false);

	const menuIcon = <FiMenu className={navStyles.menuBtn} onClick={() => setOpen(!open)} />;

	const closeIcon = <RiCloseFill className={navStyles.menuBtn} onClick={() => setOpen(!open)} />;

	const { user } = useAuth();

	const signOutUser = async () => {
		await firebase.auth().signOut();
		setOpen(false);
		router.push('/');
	};

	return (
		<nav className={navStyles.nav}>
			<ul>
				<li className={navStyles.logo}>
					<NavLink href="/" icon={<RiFilmFill />} />
				</li>
			</ul>

			<ul>
				{!user && (
					<li className={navStyles.searchBtn}>
						<NavLink href="/search" icon={<FaSearch />} />
					</li>
				)}

				{user && <li>{open ? closeIcon : menuIcon}</li>}

				{open && (
					<div className={navStyles.menuItems}>
						<div onClick={() => setOpen(!open)} className={navStyles.navBtn}>
							<NavLink href="/dashboard" name="Dashboard" icon={<BsCollectionFill />} />
						</div>

						<div onClick={() => setOpen(!open)} className={navStyles.navBtn}>
							<NavLink href="/account" name="Account" icon={<RiSettings5Fill />} />
						</div>

						<div>
							<button className={navStyles.signOutBtn} onClick={() => signOutUser()}>
								<FaSignOutAlt />Sign Out
							</button>
						</div>
					</div>
				)}
			</ul>
		</nav>
	);
};

export default NavBar;
