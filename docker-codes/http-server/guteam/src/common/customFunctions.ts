/* eslint-disable camelcase */
import axios from 'axios';
import ReactS3Client from 'react-aws-s3-typescript';

import {
  User,
  PostData,
  Message,
  NotificationData,
  CommunityData,
  ThreadData,
  ThreadPostData,
} from 'common/CustomTypes';

const basePath = process.env.REACT_APP_REST_URL as string;

const s3config = {
  bucketName: process.env.REACT_APP_S3_BUCKET as string,
  region: process.env.REACT_APP_REGION as string,
  accessKeyId: process.env.REACT_APP_ACCESS_KEY as string,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY as string,
};

export const uploadFile = async (
  file: File,
  sub: string,
  dir: string
): Promise<string> => {
  const ts = Date.parse(new Date().toISOString());
  const s3 = new ReactS3Client(s3config);
  const filename = `${sub}/${dir}/${ts}`;
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

// ---
export const getCommunities = async (
  token: string
): Promise<CommunityData[]> => {
  const header = `Bearer ${token}`;
  const url = `${basePath}/communities`;

  const response = await axios
    .get<CommunityData[]>(url, {
      headers: {
        Authorization: header,
      },
      timeout: 10000,
    })
    .then((res) => res.data);
  return response;
};

export const getCommunity = async (
  token: string,
  id: string
): Promise<CommunityData> => {
  const header = `Bearer ${token}`;
  const url = `${basePath}/communities/${id}`;

  const response = await axios
    .get<CommunityData>(url, {
      headers: {
        Authorization: header,
      },
      timeout: 10000,
    })
    .then((res) => res.data);
  return response;
};

export const getCommunityThreads = async (
  token: string,
  community_id?: string
): Promise<ThreadData[]> => {
  const header = `Bearer ${token}`;
  const urlHandler = () => {
    if (community_id === undefined) {
      return `${basePath}/community_threads`;
    }
    return `${basePath}/community_threads?community_id=${community_id}`;
  };

  const url = urlHandler();

  const response = await axios
    .get<ThreadData[]>(url, {
      headers: {
        Authorization: header,
      },
      timeout: 10000,
    })
    .then((res) => res.data);
  return response;
};

export const getCommunityThread = async (
  token: string,
  id: string
): Promise<ThreadData> => {
  const header = `Bearer ${token}`;
  const url = `${basePath}/community_threads/${id}`;

  const response = await axios
    .get<ThreadData>(url, {
      headers: {
        Authorization: header,
      },
      timeout: 10000,
    })
    .then((res) => res.data);
  return response;
};

type PostCommunityThreadBody = Pick<
  ThreadData,
  'community_id' | 'title' | 'description' | 'image_url'
>;

export const postCommunityThread = async (
  token: string,
  body: PostCommunityThreadBody
): Promise<ThreadData> => {
  const header = `Bearer ${token}`;
  const url = `${basePath}/community_threads`;

  const response = await axios
    .post<ThreadData>(url, body, {
      headers: {
        Authorization: header,
        ContentType: 'application/json; charset=utf-8',
      },
      timeout: 10000,
    })
    .then((res) => res.data);
  return response;
};

export const getThreadPosts = async (
  token: string,
  community_thread_id?: string
): Promise<ThreadPostData[]> => {
  const header = `Bearer ${token}`;
  const urlHandler = () => {
    if (community_thread_id === undefined) {
      return `${basePath}/thread_posts`;
    }
    return `${basePath}/thread_posts?community_thread_id=${community_thread_id}`;
  };
  const url = urlHandler();

  const response = await axios
    .get<ThreadPostData[]>(url, {
      headers: {
        Authorization: header,
      },
      timeout: 10000,
    })
    .then((res) => res.data);
  return response;
};

export const getThreadPost = async (
  token: string,
  id: string
): Promise<ThreadPostData> => {
  const header = `Bearer ${token}`;
  const url = `${basePath}/thread_posts/${id}`;

  const response = await axios
    .get<ThreadPostData>(url, {
      headers: {
        Authorization: header,
      },
      timeout: 10000,
    })
    .then((res) => res.data);
  return response;
};

type PostThreadPostBody = Pick<
  ThreadPostData,
  'community_thread_id' | 'message'
>;

export const postThreadPost = async (
  token: string,
  body: PostThreadPostBody
): Promise<ThreadPostData> => {
  const header = `Bearer ${token}`;
  const url = `${basePath}/thread_posts`;

  const response = await axios
    .post<ThreadPostData>(url, body, {
      headers: {
        Authorization: header,
        ContentType: 'application/json; charset=utf-8',
      },
      timeout: 10000,
    })
    .then((res) => res.data);
  return response;
};
