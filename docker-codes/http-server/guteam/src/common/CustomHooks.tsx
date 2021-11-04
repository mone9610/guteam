import { useEffect, useState, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Theme, useMediaQuery } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { CommunityType } from 'common/CustomTypes';
import { getCommunities } from 'common/customFunctions';
import { setCommunityList } from './features/accordionSlice';

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

export const useCommunities = (): CommunityType[] => {
  const token = useToken();
  const [communities, setCommunities] = useState<CommunityType[]>();
  const dispatch = useDispatch();

  const updateCommunities = (state: CommunityType[]) => {
    dispatch(setCommunityList(state));
  };

  const load = useCallback(async () => {
    if (token) {
      const cs = await getCommunities(token);
      setCommunities(cs);
      void updateCommunities(cs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    void load();
  }, [load, token]);

  return communities as CommunityType[];
};

export {};
