import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {
  absSubFromUserID,
  getCommunities,
  getCommunity,
  getCommunityThreads,
  getCommunityThread,
  postCommunityThread,
  getThreadPosts,
  getThreadPost,
  postThreadPost,
} from 'common/customFunctions';
import { communityData } from 'data/communities';
import { communityThreadsData } from 'data/community_threads';
import { threadsPostsData } from 'data/threads_posts';

const basePath = process.env.REACT_APP_REST_URL as string;

describe('absSubFromUserID', () => {
  it('should suceed', () => {
    const rawSub = 'auth0|abcd';
    const sub = absSubFromUserID(rawSub);
    expect(sub).toBe('abcd');
  });
});

describe('Rails API handlers(feature:community)', () => {
  const mock = new MockAdapter(axios);
  afterEach(() => {
    mock.reset();
  });

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
