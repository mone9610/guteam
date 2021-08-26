import Button from '@material-ui/core/Button';
import { VFC } from 'react';
import { useHistory } from 'react-router-dom';

const LargeLoginButton: VFC = () => {
  const history = useHistory();

  return (
    <div>
      <Button
        color="primary"
        style={{ maxWidth: '270px', minWidth: '270px' }}
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

export default LargeLoginButton;
