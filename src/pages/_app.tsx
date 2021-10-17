import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { SocketProvider } from '@/services/socket';
import { AuthProvider } from '@/hooks/useAuth';
import { WidgetProvider } from '@/contexts/widget';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SocketProvider>
      <AuthProvider>
        <WidgetProvider>
          <Component {...pageProps} />
        </WidgetProvider>
      </AuthProvider>
    </SocketProvider>
  );
}
export default MyApp;
