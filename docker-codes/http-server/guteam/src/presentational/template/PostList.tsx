// no-unsafe-member-accessを無効化：any型にメンバーアクセスはあてていないが勝手に起動するため
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// FC内のpropsの型定義は冗長であるため、無効化
/* eslint-disable react/prop-types */
import { VFC } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { PostData, User } from 'common/CustomTypes';
import Spinner from 'presentational/molecules/Spinner';
import Post from 'presentational/organisms/Post';
import PostEnd from 'presentational/organisms/PostEnd';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '80vw',
    },
    txt: {
      margin: theme.spacing(2),
    },
  })
);

type Props = {
  posts: PostData[];
  users: User[];
  isLoading: boolean;
};

const PostList: VFC<Props> = (props) => {
  const classes = useStyles();
  const { posts, users, isLoading } = props;

  // created_atで降順にソートする
  posts?.sort((a: PostData, b: PostData) => {
    if (a.created_at > b.created_at) {
      return -1;
    }
    return 1;
  });

  return (
    <div>
      {isLoading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <div className={classes.txt}>
            今、かかえている愚痴をつぶやいてみましょう！
          </div>

          <List className={classes.root}>
            {posts?.map((post) => {
              const found = users?.find((user) => post.user_id === user.id);
              return (
                <Post
                  key={post.id}
                  sub={found?.sub}
                  picture_url={found?.picture_url}
                  name={found?.name}
                  message={post.message}
                  is_deleted={post.is_deleted}
                  created_at={post.created_at}
                  updated_at={post.updated_at}
                />
              );
            })}
          </List>
          <PostEnd />
        </>
      )}
    </div>
  );
};

export default PostList;
