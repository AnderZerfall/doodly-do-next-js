import { ThemeProvider } from 'context/ThemeContext';
import '../styles/global.scss';
import '../styles/Home.scss';
import '../styles/Board.scss';
import RootLayout from './layout';

import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
    <RootLayout>
       <Component {...pageProps} />
      </RootLayout>
    </ThemeProvider>
  )
}

export default MyApp;