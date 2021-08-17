import { VFC } from 'react';
import { Link } from 'react-router-dom';

const EasyLoginButton: VFC = () => (
  <div>
    <Link to="/client">おためしログイン</Link>
  </div>
);

export default EasyLoginButton;
