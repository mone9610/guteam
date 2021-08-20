import { VFC } from 'react';
import Post from '../organisms/Post';
import PostEnd from '../organisms/PostEnd';
import ClientFooter from '../organisms/ClientFooter';

const Timeline: VFC = () => (
  <div>
    今、かかえている愚痴をつぶやいてみましょう！
    <Post />
    <PostEnd />
    <ClientFooter />
  </div>
);

export default Timeline;
