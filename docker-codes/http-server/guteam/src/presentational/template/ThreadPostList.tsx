// no-unsafe-member-accessを無効化：any型にメンバーアクセスはあてていないが勝手に起動するため
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// FC内のpropsの型定義は冗長であるため、無効化
/* eslint-disable react/prop-types */
import { VFC } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import { ThreadType, ThreadPostType, UserType } from 'common/CustomTypes';
import Spinner from 'presentational/molecules/Spinner';
import ThreadPost from 'presentational/organisms/ThreadPost';
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
  threadInfo: ThreadType;
  posts: ThreadPostType[];
  users: UserType[];
  isLoading: boolean;
};

const ThreadPostList: VFC<Props> = (props) => {
  const classes = useStyles();
  const { threadInfo, posts, users, isLoading } = props;

  // created_atで昇順にソートする
  posts?.sort((a: ThreadPostType, b: ThreadPostType) => {
    if (a.created_at < b.created_at) {
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
            <Typography variant="h6">{threadInfo?.title}</Typography>
            <Typography variant="subtitle1">
              {threadInfo?.description}
            </Typography>
          </div>

          <List className={classes.root}>
            {posts?.map((post) => {
              const found = users?.find((user) => post.user_id === user.id);
              return (
                <ThreadPost
                  key={post.id}
                  sub={found?.sub}
                  image_url={found?.image_url}
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

export default ThreadPostList;
