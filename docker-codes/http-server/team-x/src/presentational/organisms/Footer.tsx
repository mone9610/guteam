import { VFC } from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

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
      <Typography variant="body2" color="textPrimary" align="center">
        {'Copyright © '}
        愚痴〜ム {new Date().getFullYear()}.
      </Typography>
    </div>
  );
};

export default Footer;
