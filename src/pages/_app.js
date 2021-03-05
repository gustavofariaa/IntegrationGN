import { useEffect } from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import theme from '../styles/theme';
import GlobalStyle from '../styles/global';
import '../styles/custom.scss';

import Layout from '../layout';

import ContextProvider from '../context';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    (() => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      // eslint-disable-next-line radix
      const validation = parseInt(Math.random() * 1000000);
      script.src = `https://sandbox.gerencianet.com.br/v1/cdn/9f5a8c2bc2a09a6a985c784480a082c1/${validation}`;
      script.async = false;
      script.id = '9f5a8c2bc2a09a6a985c784480a082c1';
      if (!document.getElementById('9f5a8c2bc2a09a6a985c784480a082c1')) {
        document.getElementsByTagName('head')[0].appendChild(script);
      }
      window.$gn = {
        validForm: true,
        processed: false,
        done: {},
        ready(fn) { window.$gn.done = fn; },
      };
      window.$gn.ready((checkout) => { window.checkout = checkout; });
    })();
  }, []);

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
