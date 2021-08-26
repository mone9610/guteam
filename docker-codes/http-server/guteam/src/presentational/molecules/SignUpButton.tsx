import Button from '@material-ui/core/Button';
import { VFC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SignUpButton: VFC = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div>
      <Button
        color="primary"
        style={{ maxWidth: '180px', minWidth: '180px' }}
        variant="contained"
        onClick={() => loginWithRedirect({ screen_hint: 'signup' })}
      >
        無料でサインアップ
      </Button>
    </div>
  );
};
export default SignUpButton;
