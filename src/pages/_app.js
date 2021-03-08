import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import theme from '../styles/theme';
import GlobalStyle from '../styles/global';
import '../styles/custom.scss';

import Layout from '../layout';

import ContextProvider from '../context';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>

      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="" />
        <title>Store Integration</title>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" />
      </Head>

      <GlobalStyle />

      <ContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ContextProvider>

    </ThemeProvider>
  );
}

export default MyApp;
