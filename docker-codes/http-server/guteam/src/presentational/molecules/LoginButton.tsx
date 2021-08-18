import Button from '@material-ui/core/Button';
import { VFC } from 'react';
import { Link } from 'react-router-dom';

const LoginButton: VFC = () => (
  <div>
    <Button
      color="primary"
      style={{ maxWidth: '180px', minWidth: '180px' }}
      variant="outlined"
      component={Link}
      to="/login"
    >
      ログイン
    </Button>
  </div>
);

export default LoginButton;
