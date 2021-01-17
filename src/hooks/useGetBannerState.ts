import React, { useState, useEffect } from 'react';

interface useGetBannerStateProps {
  nominationsLength: number,
  uid: string | undefined,
  setBannerVisible: React.Dispatch<boolean>
}

interface BannerState {
  type: 'info' | 'warning' | 'error',
  message: string,
}

const useGetBannerState = ({
  nominationsLength,
  uid,
  setBannerVisible,
}: useGetBannerStateProps): BannerState => {
  const [bannerState, setBannerState] = useState<BannerState>({
    type: 'error',
    message: 'Invalid banner state',
  });

  useEffect(() => {
    if (nominationsLength === 5) {
      setBannerVisible(true);
      setBannerState({ type: 'info', message: 'You have nominated 5 items.' });
    } else if (nominationsLength > 5) {
      setBannerVisible(true);
      setBannerState({
        type: 'warning',
        message: `Warning: You are nominating more than 5 items. 
      Please remove items from the nominations`,
      });
    }
  }, [nominationsLength, setBannerVisible]);

  useEffect(() => {
    if (uid === undefined) {
      setBannerVisible(true);
      setBannerState({
        type: 'warning',
        message: 'Warning: Sign in to save your nominations, and add to the Global Counter!',
      });
    }
  }, [uid]);

  return bannerState;
};

export default useGetBannerState;
