import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../components/theme';
import Copyright from '../components/Copyright';
import Box from '@material-ui/core/Box';
import GlobalMenu from '../components/GlobalMenu';
import { GlobalProvider } from '../../src/utils/context/context';
import FlashMessage from '../components/FlashMessage';
import { useRouter } from 'next/router';

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <GlobalProvider>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <header>
          <GlobalMenu />
        </header>
        {router.query.type && router.query.message && (
          <FlashMessage
            type={router.query.type}
            message={router.query.message}
          />
        )}
        {pageProps.top
        ? (
          <Box>
            <Component {...pageProps} />
          </Box>
        )
        : (
          <Box my={4}>
            <Component {...pageProps} />
          </Box>
        )}
        <footer>
          <Box mt={5}>
            <Copyright />
          </Box>
        </footer>



      </ThemeProvider>
    </GlobalProvider>
  );
}
