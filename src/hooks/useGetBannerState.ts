import React, { useState, useEffect } from 'react';

interface useGetBannerStateProps {
  nominationsLength: number,
  setBannerVisible: React.Dispatch<boolean>
}

interface BannerState {
  type: 'info' | 'warning' | 'error',
  message: string,
}

const useGetBannerState = ({
  nominationsLength,
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
    } if (nominationsLength > 5) {
      setBannerVisible(true);
      setBannerState({
        type: 'warning',
        message: `Warning: You are nominating more than 5 items. 
      Please remove items from the nominations`,
      });
    }
  });

  return bannerState;
};

export default useGetBannerState;
