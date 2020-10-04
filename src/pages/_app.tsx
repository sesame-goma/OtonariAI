/*---- 外部インポート ----*/
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import { Box, CssBaseline } from '@material-ui/core';

/*---- 内部インポート ----*/
import { GlobalProvider } from '../../src/utils/context/context';
import GlobalHeader from '../components/GlobalHeader';
import GlobalMenu from '../components/GlobalMenu';
import FlashMessage from '../components/FlashMessage';
import theme from '../components/theme';
import Copyright from '../components/Copyright';

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
        <CssBaseline />
        <header>
          <GlobalHeader />
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
          <Box my={8} ml={30}>
            <Component {...pageProps} />
          </Box>
        )}
        <footer>
          <Box mt={5} ml={30}>
            <Copyright />
          </Box>
        </footer>
      </ThemeProvider>
    </GlobalProvider>
  );
}
