import { VFC } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CommunityMessageForm from 'container/organisms/CommunityMessageForm';

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

const CommunityClientFooter: VFC = () => {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <CommunityMessageForm />
    </div>
  );
};

export default CommunityClientFooter;
