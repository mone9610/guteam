import { VFC } from 'react';
import Typography from '@material-ui/core/Typography';

const Copyright: VFC = () => (
  <div>
    <Typography variant="body2" color="textPrimary" align="center">
      {'Copyright © '}
      <a href="https://github.com/mone9610/guteam">mone9610</a> All Rights
      Reserved. {new Date().getFullYear()}.
    </Typography>
  </div>
);
export default Copyright;
