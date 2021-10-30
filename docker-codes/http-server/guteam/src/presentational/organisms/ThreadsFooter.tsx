import { VFC } from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      overflow: 'hidden',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      margin: theme.spacing(1, 0, 3),
      position: 'fixed',
      bottom: 0,
      width: '80vw',
      backgroundColor: '#fafafa',
    },
  })
);

const ThreadsFooter: VFC = () => {
  const classes = useStyles();
  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();

  return (
    <div className={classes.content}>
      <Grid container justifyContent="center" alignContent="center" spacing={2}>
        <Grid item xs={12}>
          <Button
            onClick={preventDefault}
            variant="contained"
            size="large"
            color="primary"
          >
            新規スレッド作成
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ThreadsFooter;
