import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Theme, useMediaQuery } from '@material-ui/core';

export const useToken = (): string => {
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      const accessToken = await getAccessTokenSilently({});
      setToken(accessToken);
    };
    void getToken();
  });
  return token;
};

// モバイルかPCかを判別し、デバイスの種類によって表示を切り替える
export const useSize = (): boolean => {
  const isMobileSize = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('xs')
  );
  return isMobileSize;
};

export {};
