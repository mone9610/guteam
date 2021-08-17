import Button from '@material-ui/core/Button';
import { VFC } from 'react';
import { Link } from 'react-router-dom';

const LargeSignUpButton: VFC = () => (
  <div>
    <Button
      color="primary"
      style={{ maxWidth: '270px', minWidth: '270px' }}
      variant="contained"
      component={Link}
      to="/signup"
    >
      無料でサインアップ
    </Button>
  </div>
);

export default LargeSignUpButton;
