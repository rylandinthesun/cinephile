import Layout from '../components/Layout';
import { AuthProvider } from '../firebase/auth';
import '../styles/globals.css';

function MyApp ({ Component, pageProps }) {
	return (
		<AuthProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</AuthProvider>
	);
}

export default MyApp;
