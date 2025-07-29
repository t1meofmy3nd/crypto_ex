import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import '../styles/globals.css';
import '../styles/home.css'
import { AuthProvider } from '../context/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;