import { VFC } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';

import Thread from '../organisms/Tread';
import PostEnd from '../organisms/PostEnd';

const useStyles = makeStyles(() =>
  createStyles({
    content: {
      flexGrow: 1,
      overflow: 'auto',
      'text-align': 'left',
    },
    txt: {
      display: 'inline-block',
      'text-align': 'left',
      margin: '10px',
    },
  })
);

const Community: VFC = () => {
  const classes = useStyles();

  return (
    <div>
      <main className={classes.content}>
        <div className={classes.txt}>
          トピックについて話し合いましょう！
          <br />
          ※コミュニティは全ユーザーに公開されます。
        </div>
        <Thread />
        <p />
        <Divider variant="fullWidth" />
      </main>
      <PostEnd />
    </div>
  );
};

export default Community;
