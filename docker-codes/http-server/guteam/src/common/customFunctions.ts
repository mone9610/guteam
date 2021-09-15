import axios from 'axios';

import { User, PostData, Message } from 'common/CustomTypes';

// HACK:環境変数から取得した文字列は、string|undefined型になるため、
// 利用時は型アサーションにてstring型と断定する
const basePath = process.env.REACT_APP_REST_URL;

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

// HACK:promiseの解決を待つために、any型を戻り値としている。
// axiosにてUser[]型は保証している。
export const getUsers = async (token: string): Promise<any> => {
  const header = `Bearer ${token}`;
  const url = `${basePath!}/users`;

  const data = await axios
    .get<User[]>(url, {
      headers: {
        Authorization: header,
      },
      timeout: 10000,
    })
    .then((res) => res.data)
    .catch((err) => {
      console.log('err:', err);
    });

  return data;
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

// HACK:promiseの解決を待つために、any型を戻り値としている。
// axiosにてPostData[]型は保証している。
export const getPosts = async (token: string): Promise<any> => {
  const header = `Bearer ${token}`;
  const url = `${basePath!}/posts`;

  const data = await axios
    .get<PostData>(url, {
      headers: {
        Authorization: header,
      },
      timeout: 10000,
    })
    .then((res) => res.data)
    .catch((err) => {
      console.log('err:', err);
    });
  return data;
};

// HACK:promiseの解決を待つために、any型を戻り値としている。
export const postPost = async (token: string, data: string): Promise<any> => {
  const header = `Bearer ${token}`;
  const url = `${basePath!}/posts`;

  const status = await axios
    .post<Message>(
      url,
      {
        message: data,
      },
      {
        headers: {
          Authorization: header,
        },
        timeout: 10000,
      }
    )
    .then((res) => res.status)
    .catch((err) => {
      console.log('err:', err);
    });
  return status;
};
