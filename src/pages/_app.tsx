import { ThemeProvider } from 'context/ThemeContext';
import '../styles/global.scss';
import '../styles/Home.scss';
import '../styles/Board.scss';
import RootLayout from './layout';

import { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Head>
        <title>🖌️ Doodly Do! - Online Realtime drawing app</title>
        <link rel="icon" href="/fukuro_logo_main.svg" />
      </Head>
    <RootLayout>
       <Component {...pageProps} />
      </RootLayout>
    </ThemeProvider>
  )
}

export default MyApp;