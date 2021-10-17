import axios from 'axios';
import ReactS3Client from 'react-aws-s3-typescript';

import { User, PostData, Message, NotificationData } from 'common/CustomTypes';

const basePath = process.env.REACT_APP_REST_URL as string;

const s3config = {
  bucketName: process.env.REACT_APP_S3_BUCKET as string,
  region: process.env.REACT_APP_REGION as string,
  accessKeyId: process.env.REACT_APP_ACCESS_KEY as string,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY as string,
};

export const uploadFile = async (file: File, sub: string): Promise<string> => {
  const ts = Date.parse(new Date().toISOString());
  const s3 = new ReactS3Client(s3config);
  const filename = `${sub}/profile/${ts}`;
  try {
    const res = await s3.uploadFile(file, filename);
    return res.location;
  } catch (exception) {
    return `Error ${exception as string}`;
  }
};

export const absSubFromUserID = (sub: string): string => {
  const userID = sub.replace(/auth0\|/g, '');
  return userID;
};

export const postUser = async (token: string, data: User): Promise<number> => {
  const url = `${basePath}/users`;
  const header = `Bearer ${token}`;

  const status = await axios
    .post<User>(url, data, {
      headers: {
        Authorization: header,
        ContentType: 'application/json; charset=utf-8',
      },
      timeout: 10000,
    })
    .then((res) => res.status)
    .catch((err) => `${err as string}`);

  return status as number;
};

export const processDate = (date: string): string => {
  const DateObject = new Date(date);
  const YYYY = DateObject.getFullYear();
  const MM = 1 + DateObject.getMonth();
  const DD = DateObject.getDate();
  const hh = DateObject.getHours().toString().padStart(2, '0');
  const mm = DateObject.getMinutes().toString().padStart(2, '0');
  return `${YYYY}/${MM}/${DD} ${hh}:${mm}`;
};

export const getUsers = async (token: string): Promise<User[]> => {
  const header = `Bearer ${token}`;
  const url = `${basePath}/users`;

  const data = await axios
    .get<User[]>(url, {
      headers: {
        Authorization: header,
      },
      timeout: 10000,
    })
    .then((res) => res.data)
    .catch((err) => {
      err as string;
    });

  return data as User[];
};

export const getUser = async (token: string, sub: string): Promise<User> => {
  const header = `Bearer ${token}`;
  const url = `${basePath}/users/${sub}`;

  const data = await axios
    .get<User>(url, {
      headers: {
        Authorization: header,
      },
      timeout: 10000,
    })
    .then((res) => res.data)
    .catch((err) => {
      err as string;
    });
  return data as User;
};

export const putUser = async (
  token: string,
  sub: string,
  data: Partial<User>
): Promise<number> => {
  const header = `Bearer ${token}`;
  const url = `${basePath}/users/${sub}`;

  const status = await axios
    .put<User>(url, data, {
      headers: {
        Authorization: header,
      },
      timeout: 10000,
    })
    .then((res) => res.status)
    .catch((err) => {
      err as number;
    });
  return status as number;
};

export const getPosts = async (token: string): Promise<PostData[]> => {
  const header = `Bearer ${token}`;
  const url = `${basePath}/posts`;

  const data = await axios
    .get<PostData[]>(url, {
      headers: {
        Authorization: header,
      },
      timeout: 10000,
    })
    .then((res) => res.data);
  return data;
};

export const postPost = async (
  token: string,
  data: string
): Promise<number> => {
  const header = `Bearer ${token}`;
  const url = `${basePath}/posts`;

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
    .then((res) => res.status);
  return status;
};

export const getNotifications = async (
  token: string,
  id: number
): Promise<NotificationData[]> => {
  const header = `Bearer ${token}`;
  const url = `${basePath}/notifications/${id}`;

  const data = await axios
    .get<NotificationData[]>(url, {
      headers: {
        Authorization: header,
      },
      timeout: 10000,
    })
    .then((res) => res.data)
    .catch((err) => {
      err as string;
    });
  return data as NotificationData[];
};
