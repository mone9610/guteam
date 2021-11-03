import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {
  absSubFromUserID,
  processDate,
  getUsers,
  getUser,
  getPosts,
  postPost,
  getNotifications,
  getCommunities,
  getCommunity,
  getCommunityThreads,
  getCommunityThread,
  postCommunityThread,
  getThreadPosts,
  getThreadPost,
  postThreadPost,
  putUser,
  postUser,
} from 'common/customFunctions';
import { userData } from 'data/users';
import { postData } from 'data/posts';
import { notificationData } from 'data/notification';
import { communityData } from 'data/communities';
import { communityThreadsData } from 'data/community_threads';
import { threadsPostsData } from 'data/threads_posts';

const basePath = process.env.REACT_APP_REST_URL as string;
const mock = new MockAdapter(axios);
afterEach(() => {
  mock.reset();
});

describe('absSubFromUserID', () => {
  it('should suceed', () => {
    const rawSub = 'auth0|abcd';
    const sub = absSubFromUserID(rawSub);
    expect(sub).toBe('abcd');
  });
});

describe('processDate', () => {
  it('should suceed', () => {
    const date = '2021-01-02 12:34:56.0000';
    const processedDate = processDate(date);
    expect(processedDate).toBe('2021/1/2 12:34');
  });
});

describe('Rails API handlers(feature:profile)', () => {
  describe('GET users', () => {
    it('should succeed', async () => {
      mock.onGet(`${basePath}/users`).reply(200, userData);

      const response = await getUsers('hogehoge');
      const mockLength = userData.length;
      const responseLength = response.length;

      expect(responseLength).toBe(mockLength);
    });
  });

  describe('GET user', () => {
    it('should succeed', async () => {
      mock
        .onGet(`${basePath}/users/${userData[0].sub}`)
        .reply(200, userData[0]);

      const response = await getUser('hogehoge', userData[0].sub);
      const mockSub = userData[0].sub;
      const responseSub = response.sub;

      expect(responseSub).toBe(mockSub);
    });
  });

  describe('PUT user', () => {
    const body = {
      name: 'hello',
      introduction: 'world',
      image_url: 'http://hogehoge.com',
    };
    it('should succeed', async () => {
      mock
        .onPut(`${basePath}/users/${userData[0].sub}`, body)
        .reply(200, userData[2]);

      const response = await putUser('hogehoge', userData[0].sub, body);
      const mockData = userData[2];

      expect(response.sub).toBe(mockData.sub);
      expect(response.name).toBe(mockData.name);
      expect(response.introduction).toBe(mockData.introduction);
      expect(response.image_url).toBe(mockData.image_url);
    });
  });

  describe('POST user', () => {
    const body = {
      name: 'HELLO',
      sub: 'piyopiyopiyo',
      introduction: 'WORLD',
      image_url: 'http://hugahuga.com',
    };
    it('should succeed', async () => {
      mock.onPost(`${basePath}/users`, body).reply(200, userData[3]);

      const response = await postUser('hogehoge', body);
      const mockData = userData[3];

      expect(response.sub).toBe(mockData.sub);
      expect(response.name).toBe(mockData.name);
      expect(response.introduction).toBe(mockData.introduction);
      expect(response.image_url).toBe(mockData.image_url);
    });
  });
});

describe('Rails API handlers(feature:timeline)', () => {
  describe('GET posts', () => {
    it('should succeed', async () => {
      mock.onGet(`${basePath}/posts`).reply(200, postData);

      const response = await getPosts('hogehoge');
      const mockLength = postData.length;
      const responseLength = response.length;

      expect(responseLength).toBe(mockLength);
    });
  });

  describe('POST post', () => {
    it('should succeed', async () => {
      const body = {
        message: '2番目の投稿',
      };
      mock.onPost(`${basePath}/posts`).reply(200, postData[1]);

      const response = await postPost('hogehoge', body);
      const mockData = postData[1].message;

      expect(response.message).toBe(mockData);
    });
  });
});

describe('Rails API handlers(feature:notification)', () => {
  describe('GET notifications', () => {
    it('should succeed', async () => {
      mock
        .onGet(`${basePath}/notifications/${notificationData[1].to_user_id}`)
        .reply(200, notificationData);

      const response = await getNotifications(
        'hogehoge',
        notificationData[1].to_user_id
      );
      const mockLength = postData.length;
      const responseLength = response.length;

      expect(responseLength).toBe(mockLength);
    });
  });
});

describe('Rails API handlers(feature:community)', () => {
  describe('GET communities', () => {
    it('should succeed', async () => {
      mock.onGet(`${basePath}/communities`).reply(200, communityData);

      const communities = await getCommunities('hogehoge');
      const mockLength = communityData.length;
      const responseLength = communities.length;

      expect(responseLength).toBe(mockLength);
    });
  });

  describe('GET community', () => {
    it('should succeed', async () => {
      mock.onGet(`${basePath}/communities/1`).reply(200, communityData[0]);

      const response = await getCommunity('hogehoge', '1');
      const mockId = communityData[0].id;
      const responseId = response.id;

      expect(responseId).toBe(mockId);
    });
  });

  describe('GET community_threads(no query params)', () => {
    it('should succeed', async () => {
      mock
        .onGet(`${basePath}/community_threads`)
        .reply(200, communityThreadsData);

      const response = await getCommunityThreads('hogehoge');
      const mockLength = communityThreadsData.length;
      const responseLength = response.length;

      expect(responseLength).toBe(mockLength);
    });
  });

  describe('GET community_threads(with query params)', () => {
    it('should succeed', async () => {
      mock
        .onGet(`${basePath}/community_threads?community_id=2`)
        .reply(200, communityThreadsData.slice(1, 3));

      const response = await getCommunityThreads('hogehoge', '2');
      const mockData = communityThreadsData;

      expect(response[0].community_id).toBe(mockData[1].community_id);
      expect(response[1].community_id).toBe(mockData[2].community_id);
    });
  });

  describe('GET community_thread', () => {
    it('should succeed', async () => {
      mock
        .onGet(`${basePath}/community_threads/${1}`)
        .reply(200, communityThreadsData[0]);

      const response = await getCommunityThread('hogehoge', '1');
      const mockData = communityThreadsData;

      expect(response.id).toBe(mockData[0].id);
    });
  });

  describe('POST community_thread ', () => {
    const body = {
      community_id: 2,
      title: 'シルバー民主主義について語り合う',
      description: 'シルバー民主主義について語り合うスレです',
      image_url: 'localhost',
    };
    it('should succeed', async () => {
      mock
        .onPost(`${basePath}/community_threads`, body)
        .reply(200, communityThreadsData[1]);

      const response = await postCommunityThread('hogehoge', body);

      expect(response.title).toBe(communityThreadsData[1].title);
      expect(response.community_id).toBe(communityThreadsData[1].community_id);
      expect(response.description).toBe(communityThreadsData[1].description);
      expect(response.image_url).toBe(communityThreadsData[1].image_url);
    });
  });

  describe('GET thread_posts (no query params)', () => {
    it('should succeed', async () => {
      mock.onGet(`${basePath}/thread_posts`).reply(200, threadsPostsData);

      const response = await getThreadPosts('hogehoge');
      const mockLength = threadsPostsData.length;
      const responseLength = response.length;

      expect(responseLength).toBe(mockLength);
    });
  });

  describe('GET thread_posts (with query params)', () => {
    it('should succeed', async () => {
      mock
        .onGet(`${basePath}/thread_posts?community_thread_id=1`)
        .reply(200, threadsPostsData.slice(0, 2));

      const response = await getThreadPosts('hogehoge', '1');
      const mockData = threadsPostsData;

      expect(response[0].community_thread_id).toBe(
        mockData[0].community_thread_id
      );
      expect(response[1].community_thread_id).toBe(
        mockData[1].community_thread_id
      );
    });
  });

  describe('GET thread_post', () => {
    it('should succeed', async () => {
      mock.onGet(`${basePath}/thread_posts/1`).reply(200, threadsPostsData[0]);

      const response = await getThreadPost('hogehoge', '1');
      const mockId = threadsPostsData[0].id;
      const responseId = response.id;

      expect(responseId).toBe(mockId);
    });
  });

  describe('POST thread_post ', () => {
    const body = {
      community_thread_id: 1,
      message: '年金高杉晋作！！！',
    };
    it('should succeed', async () => {
      mock
        .onPost(`${basePath}/thread_posts`, body)
        .reply(200, threadsPostsData[0]);

      const response = await postThreadPost('hogehoge', body);

      expect(response.community_thread_id).toBe(
        threadsPostsData[0].community_thread_id
      );
      expect(response.message).toBe(threadsPostsData[0].message);
    });
  });
});
