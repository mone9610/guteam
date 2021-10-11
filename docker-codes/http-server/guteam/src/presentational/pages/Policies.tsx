import { VFC } from 'react';
import ReactMarkdown from 'react-markdown';

import PrivacyPolicies from 'assets/md/PRIVACY_POLICIES';

import { makeStyles } from '@material-ui/core';

const Policies: VFC = () => {
  const useStyles = makeStyles({
    content: {
      margin: '30px 20px 30px 20px',
    },
  });
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <ReactMarkdown>{PrivacyPolicies}</ReactMarkdown>
    </div>
  );
};

export default Policies;
