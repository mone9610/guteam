// no-unsafe-member-accessを無効化：any型にメンバーアクセスはあてていないが勝手に起動するため
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// FC内のpropsの型定義は冗長であるため、無効化
/* eslint-disable react/prop-types */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { VFC } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import { ThreadData, CommunityData } from 'common/CustomTypes';
import Spinner from 'presentational/molecules/Spinner';
import Thread from 'presentational/organisms/Thread';
import ThreadsFooter from 'presentational/organisms/ThreadsFooter';

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
  threads: ThreadData[];
  community: string;
  isLoading: boolean;
};

const ThreadList: VFC<Props> = (props) => {
  const classes = useStyles();
  const { threads, community, isLoading } = props;

  // updated_atで降順にソートする
  threads?.sort((a: ThreadData, b: ThreadData) => {
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
            {community}に関する、気になるスレッドを確認してみましょう！
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
          <ThreadsFooter />
        </>
      )}
    </div>
  );
};

export default ThreadList;
