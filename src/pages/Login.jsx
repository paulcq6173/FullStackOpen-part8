import LoginForm from '../components/form/LoginForm';

const Login = ({ setToken, notify }) => {
  return (
    <div>
      <h2>Login</h2>
      <LoginForm setToken={setToken} setError={notify} />
    </div>
  );
};

export default Login;
