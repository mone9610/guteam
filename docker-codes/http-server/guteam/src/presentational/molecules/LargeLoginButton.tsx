import Button from '@material-ui/core/Button';
import { VFC } from 'react';
import { Link } from 'react-router-dom';

const LargeLoginButton: VFC = () => (
  <div>
    <Button
      color="primary"
      style={{ maxWidth: '270px', minWidth: '270px' }}
      variant="outlined"
      component={Link}
      to="/login"
    >
      ログイン
    </Button>
  </div>
);

export default LargeLoginButton;
