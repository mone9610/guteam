import axios from 'axios';
import ReactS3Client from 'react-aws-s3-typescript';

import { User, PostData, Message } from 'common/CustomTypes';

// HACK:環境変数から取得した文字列は、string|undefined型になるため、
// 利用時は型アサーションにてstring型と断定する
const basePath = process.env.REACT_APP_REST_URL;

const s3config = {
  bucketName: process.env.REACT_APP_S3_BUCKET!,
  region: process.env.REACT_APP_REGION!,
  accessKeyId: process.env.REACT_APP_ACCESS_KEY!,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY!,
};

// eslint-disable-next-line consistent-return
export const uploadFile = async (file: any, sub: string) => {
  /* Import s3 config object and call the constrcutor */
  const ts = Date.parse(new Date().toISOString());
  const s3 = new ReactS3Client(s3config);
  const filename = `${sub}/${ts}`; /* Optional */
  try {
    const res = await s3.uploadFile(file, filename);
    return res.location;
  } catch (exception) {
    console.log(exception);
  }
};

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

// HACK:promiseの解決を待つために、any型を戻り値としている。
// axiosにてUser型は保証している。
export const getUser = async (token: string, sub: string): Promise<any> => {
  const header = `Bearer ${token}`;
  // HACK : 型アサーションの記載が正しいかは要確認
  const url = `${basePath!}/users/${sub}`;

  const data = await axios
    .get<User>(url, {
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
// axiosにてUser型は保証している。
export const putUser = async (
  token: string,
  sub: string,
  data: Partial<User>
): Promise<any> => {
  const header = `Bearer ${token}`;
  // HACK : 型アサーションの記載が正しいかは要確認
  const url = `${basePath!}/users/${sub}`;

  const status = await axios
    .put<User>(url, data, {
      headers: {
        Authorization: header,
      },
      timeout: 10000,
    })
    .then((res) => res.status)
    .catch((err) => {
      console.log('err:', err);
    });
  return status;
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
