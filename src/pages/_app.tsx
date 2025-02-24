import { Provider } from 'react-redux';
import { store, persistor } from '../redux/store';
import '../app/globals.css';
import { PersistGate } from 'redux-persist/integration/react';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';

function Frontend({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const unsubscribe = persistor.subscribe(() => {
      if (persistor.getState().bootstrapped) {
        console.log('Redux state has been rehydrated!');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default Frontend;
