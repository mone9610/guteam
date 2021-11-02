// no-unsafe-member-accessを無効化：any型にメンバーアクセスはあてていないが勝手に起動するため
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// FC内のpropsの型定義は冗長であるため、無効化
/* eslint-disable react/prop-types */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { VFC } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

import { ThreadType } from 'common/CustomTypes';
import Spinner from 'presentational/molecules/Spinner';
import Thread from 'presentational/organisms/Thread';
import ThreadsFooter from 'presentational/organisms/ThreadsFooter';
import ThreadEnd from 'presentational/organisms/ThreadEnd';

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
  threads: ThreadType[];
  community: string;
  isLoading: boolean;
};

const ThreadList: VFC<Props> = (props) => {
  const classes = useStyles();
  const { threads, community, isLoading } = props;

  // updated_atで降順にソートする
  threads?.sort((a: ThreadType, b: ThreadType) => {
    if (a.updated_at > b.updated_at) {
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
            <Typography variant="h6">
              {community}に関する、気になるスレッドを確認してみましょう！
            </Typography>
          </div>

          <List className={classes.root}>
            {threads?.map((thread) => (
              <Thread
                id={thread.id}
                community_id={thread.community_id}
                title={thread.title}
                image_url={thread.image_url}
                created_at={thread.created_at}
              />
            ))}
          </List>
          <ThreadEnd />
          <ThreadsFooter />
        </>
      )}
    </div>
  );
};

export default ThreadList;
