import { VFC } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '80vw',
      marginBottom: '10vh',
    },
    inline: {
      display: 'inline',
    },
  })
);

const ThreadEnd: VFC = () => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemText primary="これ以上のスレッドはありません。" />
      </ListItem>
    </List>
  );
};

export default ThreadEnd;
