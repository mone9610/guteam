import { VFC } from 'react';
import Typography from '@material-ui/core/Typography';

const Copyright: VFC = () => (
  <div>
    <Typography variant="body2" color="textPrimary" align="center">
      {'Copyright © '}
      愚痴〜ム {new Date().getFullYear()}.
    </Typography>
  </div>
);

export default Copyright;
