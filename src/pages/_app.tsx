import { ThemeProvider } from 'context/ThemeContext';
import '../styles/global.scss';
import { RootLayout } from './layout';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
    <RootLayout>
       <Component {...pageProps} />
      </RootLayout>
    </ThemeProvider>
  )
}

export default MyApp;