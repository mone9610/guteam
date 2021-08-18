import { VFC } from 'react';
import { makeStyles } from '@material-ui/core';
import Copyright from '../../container/molecules/Copyright';

const useStyles = makeStyles({
  footer: {
    color: '#000000',
    backgroundColor: '#D6C2DE',
    width: '100%',
    bottom: 0,
  },
});

const Footer: VFC = () => {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <Copyright />
    </div>
  );
};

export default Footer;
