import Button from '@material-ui/core/Button';
import { VFC } from 'react';
import { Link } from 'react-router-dom';

const SignUpButton: VFC = () => (
  <div>
    <Button
      color="primary"
      style={{ maxWidth: '180px', minWidth: '180px' }}
      variant="contained"
      component={Link}
      to="/signup"
    >
      無料でサインアップ
    </Button>
  </div>
);

export default SignUpButton;
