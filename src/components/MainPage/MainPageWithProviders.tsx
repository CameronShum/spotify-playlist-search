import React from 'react';
import { FirebaseProvider } from 'components/Firebase';
import MainPage from './MainPage';

/**
 * Main Component with providers.
 */

const MainPageWithProvider = () => (
  <FirebaseProvider>
    <MainPage />
  </FirebaseProvider>
);

export default MainPageWithProvider;
