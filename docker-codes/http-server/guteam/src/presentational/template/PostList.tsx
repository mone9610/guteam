/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-lone-blocks */
import { VFC } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { PostData, User } from 'common/CustomTypes';
import Skeleton from '@material-ui/lab/Skeleton';
import Spinner from 'presentational/molecules/Spinner';
import Post from 'presentational/organisms/Post';
import PostEnd from 'presentational/organisms/PostEnd';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '80vw',
    },
    inline: {
      display: 'inline',
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
  //   const { isLoading } = isLoading;

  return (
    <div>
      {isLoading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <List className={classes.root}>
            {posts.map((post) => {
              const found = users.find((user) => post.user_id === user.id);
              return (
                <Post
                  key={post.id}
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
