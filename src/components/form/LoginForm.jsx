import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { redirect } from 'react-router-dom';
import { LOGIN } from '../../graphql/queries';
import useField from '../../hooks/useField';

const LoginForm = ({ setToken, setError }) => {
  const useUsername = useField('username');
  const usePW = useField('password');
  const username = useUsername.value;
  const password = usePW.value;

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('user-token', token);
    }
  }, [result.data, setToken]);

  const handleLogin = (e) => {
    e.preventDefault();

    login({ variables: { username, password } });
    redirect('/');
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>username</label>
          <input {...useUsername} />
        </div>
        <div>
          <label>password</label>
          <input {...usePW} />
        </div>
        <button style={{ backgroundColor: 'goldenrod', color: 'white' }}>
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
