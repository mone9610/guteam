import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// eslint-disable-next-line import/prefer-default-export
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

export {};
