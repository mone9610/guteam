import Button from '@material-ui/core/Button';
import { VFC } from 'react';
import { useHistory } from 'react-router-dom';

const LoginButton: VFC = () => {
  const history = useHistory();

  return (
    <div>
      <Button
        color="primary"
        style={{ maxWidth: '180px', minWidth: '180px' }}
        variant="outlined"
        onClick={() => {
          history.push('/client');
        }}
      >
        ログイン
      </Button>
    </div>
  );
};

export default LoginButton;
