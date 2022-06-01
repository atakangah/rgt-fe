import { useAuth0 } from '@auth0/auth0-react';
import Button from '../../components/button/Button';

const Login = () => {
  const { loginWithPopup } = useAuth0();

  const onClickLoginButton = () => {
    loginWithPopup();
  };

  return (
    <div>
      <h1>Login to RGT Chat</h1>
      <Button
        value="Login"
        disabled={false}
        onClickHandler={onClickLoginButton}
      />
    </div>
  );
};

export default Login;
