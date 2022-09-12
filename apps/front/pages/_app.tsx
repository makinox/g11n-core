import '@makinox/makinox-ui/dist/index.css';
import type { AppProps } from 'next/app';

import '../styles/globals.css';
import '../styles/colors.css';
import { SheetProvider } from '../common/contexts/sheetContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SheetProvider>
      <Component {...pageProps} />
    </SheetProvider>
  );
}

export default MyApp;
