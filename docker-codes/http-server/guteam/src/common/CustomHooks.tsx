import { VFC, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { User } from 'common/CustomTypes';
import { getUser } from 'common/customFunctions';
import axios from 'axios';

const basePath = process.env.REACT_APP_REST_URL;

// eslint-disable-next-line import/prefer-default-export
export const useToken = (): string => {
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({});
        setToken(accessToken);
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.log(e.message);
      }
    };
    void getToken();
  });
  return token;
};

export {};

// #HACK : 本当はuseUserのcustom hook をロジック部分だけ切り出したいが、loadingが解決しないので劣後
// export const useUser = (token: string, sub: string): [User, boolean] => {
//   const [userData, setUserData] = useState<User>();
//   const [progress, setProgress] = useState(true);

//   useEffect(() => {
//     const getData = async () => {
//       setProgress(true);
//       // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//       const result: any = await getUser(token, sub);
//       setUserData(result);
//     };
//     void getData().then(() => {
//       if (typeof userData === 'undefined') {
//         setProgress(true);
//       } else {
//         setProgress(false);
//       }
//     });
//   }, [sub, token, userData]);

//   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
//   return [userData!, progress];
// };
