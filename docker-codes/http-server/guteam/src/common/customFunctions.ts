import { useContext, useState } from 'react';
import { User } from 'common/CustomTypes';
import { LoadingContext } from 'presentational/pages/Client';
import axios from 'axios';

const basePath = process.env.REACT_APP_REST_URL;
// const loading = useContext(LoadingContext);
// export const [progress, setProgress] = useState(true);

// eslint-disable-next-line import/prefer-default-export
export const absSubFromUserID = (sub: string): string => {
  const userID = sub.replace(/auth0\|/g, '');
  return userID;
};

export const postUser = (token: string, data: User): any => {
  const url = `${basePath!}/users`;
  const header = `Bearer ${token}`;

  axios
    .post<User>(url, data, {
      headers: {
        Authorization: header,
        ContentType: 'application/json; charset=utf-8',
      },
      timeout: 10000,
    })
    .then((res) => {
      console.log(res.status);
      return res.status;
    })
    .catch((err) => {
      console.log('err:', err);
    });
};

export const getUser = (token: string, sub: string): any => {
  const header = `Bearer ${token}`;
  // HACK : 型アサーションの記載が正しいかは要確認
  const url = `${basePath!}/users/${sub}`;

  void axios
    .get<User>(url, {
      headers: {
        Authorization: header,
      },
      timeout: 10000,
    })
    .then((res) => {
      console.log(res.status);

      return res.data;
    })
    .catch((err) => {
      console.log('err:', err);
    });
};

export const putUser = (token: string, sub: string, data: User): any => {
  const header = `Bearer ${token}`;
  // HACK : 型アサーションの記載が正しいかは要確認
  const url = `${basePath!}/users/${sub}`;

  void axios
    .put<User>(url, data, {
      headers: {
        Authorization: header,
      },
      timeout: 10000,
    })
    .then((res) => {
      console.log(res.status);
      return res.status;
    })
    .catch((err) => {
      console.log('err:', err);
    });
};

export {};
