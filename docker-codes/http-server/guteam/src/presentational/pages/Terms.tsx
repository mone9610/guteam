import { VFC } from 'react';
import ReactMarkdown from 'react-markdown';

import TermsOfService from 'assets/md/TERMS_OF_SERVICE';

import { makeStyles } from '@material-ui/core';

const Terms: VFC = () => {
  const useStyles = makeStyles({
    content: {
      margin: '30px 20px 30px 20px',
    },
  });
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <ReactMarkdown>{TermsOfService}</ReactMarkdown>
    </div>
  );
};

export default Terms;
