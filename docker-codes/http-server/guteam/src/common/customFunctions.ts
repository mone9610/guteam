/* eslint-disable camelcase */
import axios from 'axios';
import ReactS3Client from 'react-aws-s3-typescript';

import {
  UserType,
  PostType,
  NotificationType,
  CommunityType,
  ThreadType,
  ThreadPostType,
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

export const processDate = (date: string): string => {
  const DateObject = new Date(date);
  const YYYY = DateObject.getFullYear();
  const MM = 1 + DateObject.getMonth();
  const DD = DateObject.getDate();
  const hh = DateObject.getHours().toString().padStart(2, '0');
  const mm = DateObject.getMinutes().toString().padStart(2, '0');
  return `${YYYY}/${MM}/${DD} ${hh}:${mm}`;
};

export const getUsers = async (token: string): Promise<UserType[]> => {
  const header = `Bearer ${token}`;
  const url = `${basePath}/users`;

  const response = await axios
    .get<UserType[]>(url, {
      headers: {
        Authorization: header,
      },
      timeout: 10000,
    })
    .then((res) => res.data);

  return response;
};

export const getUser = async (
  token: string,
  sub: string
): Promise<UserType> => {
  const header = `Bearer ${token}`;
  const url = `${basePath}/users/${sub}`;

  const response = await axios
    .get<UserType>(url, {
      headers: {
        Authorization: header,
      },
      timeout: 10000,
    })
    .then((res) => res.data);
  return response;
};

type PutUserBody = Pick<UserType, 'name' | 'introduction' | 'image_url'>;

export const putUser = async (
  token: string,
  sub: string,
  data: PutUserBody
): Promise<UserType> => {
  const header = `Bearer ${token}`;
  const url = `${basePath}/users/${sub}`;

  const response = await axios
    .put<UserType>(url, data, {
      headers: {
        Authorization: header,
      },
      timeout: 10000,
    })
    .then((res) => res.data);
  return response;
};

export const postUser = async (
  token: string,
  data: Pick<UserType, 'name' | 'sub' | 'introduction' | 'image_url'>
): Promise<UserType> => {
  const url = `${basePath}/users`;
  const header = `Bearer ${token}`;

  const response = await axios
    .post<UserType>(url, data, {
      headers: {
        Authorization: header,
        ContentType: 'application/json; charset=utf-8',
      },
      timeout: 10000,
    })
    .then((res) => res.data);

  return response;
};

export const getPosts = async (token: string): Promise<PostType[]> => {
  const header = `Bearer ${token}`;
  const url = `${basePath}/posts`;

  const response = await axios
    .get<PostType[]>(url, {
      headers: {
        Authorization: header,
      },
      timeout: 10000,
    })
    .then((res) => res.data);
  return response;
};

export const postPost = async (
  token: string,
  body: string
): Promise<PostType> => {
  const header = `Bearer ${token}`;
  const url = `${basePath}/posts`;

  const response = await axios
    .post<PostType>(
      url,
      {
        message: body,
      },
      {
        headers: {
          Authorization: header,
        },
        timeout: 10000,
      }
    )
    .then((res) => res.data);
  return response;
};

export const getNotifications = async (
  token: string,
  id: number
): Promise<NotificationType[]> => {
  const header = `Bearer ${token}`;
  const url = `${basePath}/notifications/${id}`;

  const response = await axios
    .get<NotificationType[]>(url, {
      headers: {
        Authorization: header,
      },
      timeout: 10000,
    })
    .then((res) => res.data);
  return response;
};

export const getCommunities = async (
  token: string
): Promise<CommunityType[]> => {
  const header = `Bearer ${token}`;
  const url = `${basePath}/communities`;

  const response = await axios
    .get<CommunityType[]>(url, {
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
): Promise<CommunityType> => {
  const header = `Bearer ${token}`;
  const url = `${basePath}/communities/${id}`;

  const response = await axios
    .get<CommunityType>(url, {
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
): Promise<ThreadType[]> => {
  const header = `Bearer ${token}`;
  const urlHandler = () => {
    if (community_id === undefined) {
      return `${basePath}/community_threads`;
    }
    return `${basePath}/community_threads?community_id=${community_id}`;
  };

  const url = urlHandler();

  const response = await axios
    .get<ThreadType[]>(url, {
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
): Promise<ThreadType> => {
  const header = `Bearer ${token}`;
  const url = `${basePath}/community_threads/${id}`;

  const response = await axios
    .get<ThreadType>(url, {
      headers: {
        Authorization: header,
      },
      timeout: 10000,
    })
    .then((res) => res.data);
  return response;
};

type PostCommunityThreadBody = Pick<
  ThreadType,
  'community_id' | 'title' | 'description' | 'image_url'
>;

export const postCommunityThread = async (
  token: string,
  body: PostCommunityThreadBody
): Promise<ThreadType> => {
  const header = `Bearer ${token}`;
  const url = `${basePath}/community_threads`;

  const response = await axios
    .post<ThreadType>(url, body, {
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
): Promise<ThreadPostType[]> => {
  const header = `Bearer ${token}`;
  const urlHandler = () => {
    if (community_thread_id === undefined) {
      return `${basePath}/thread_posts`;
    }
    return `${basePath}/thread_posts?community_thread_id=${community_thread_id}`;
  };
  const url = urlHandler();

  const response = await axios
    .get<ThreadPostType[]>(url, {
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
): Promise<ThreadPostType> => {
  const header = `Bearer ${token}`;
  const url = `${basePath}/thread_posts/${id}`;

  const response = await axios
    .get<ThreadPostType>(url, {
      headers: {
        Authorization: header,
      },
      timeout: 10000,
    })
    .then((res) => res.data);
  return response;
};

type PostThreadPostBody = Pick<
  ThreadPostType,
  'community_thread_id' | 'message'
>;

export const postThreadPost = async (
  token: string,
  body: PostThreadPostBody
): Promise<ThreadPostType> => {
  const header = `Bearer ${token}`;
  const url = `${basePath}/thread_posts`;

  const response = await axios
    .post<ThreadPostType>(url, body, {
      headers: {
        Authorization: header,
        ContentType: 'application/json; charset=utf-8',
      },
      timeout: 10000,
    })
    .then((res) => res.data);
  return response;
};
