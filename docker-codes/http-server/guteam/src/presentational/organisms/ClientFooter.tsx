import { VFC } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import MessageForm from 'container/organisms/MessageForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      position: 'fixed',
      bottom: 0,
      width: '80vw',
      backgroundColor: '#fafafa',
      margin: theme.spacing(1),
    },
  })
);

const ClientFooter: VFC = () => {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <MessageForm />
    </div>
  );
};

export default ClientFooter;
