import { VFC } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    spinner: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '40vh',
    },
  })
);

const Spinner: VFC = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    </>
  );
};

export default Spinner;
