import React from 'react';
import { FirebaseProvider } from 'components/Firebase';
import MainPage from './MainPage';

const MainPageWithProvider = () => (
  <FirebaseProvider>
    <MainPage />
  </FirebaseProvider>
);

export default MainPageWithProvider;
