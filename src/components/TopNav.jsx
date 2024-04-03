import { Link } from 'react-router-dom';

const TopNav = ({ token, setPage, setToken, client }) => {
  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore(); // Clear apollo-client stored cache
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'start', gap: '4px' }}>
      <button
        style={{
          backgroundColor: 'goldenrod',
          border: '2 solid slate',
        }}
        onClick={() => setPage('authors')}
      >
        <Link style={{ textDecoration: 'none' }} to="/">
          authors
        </Link>
      </button>
      <button
        style={{
          backgroundColor: 'goldenrod',
          border: '2 solid slate',
        }}
      >
        <Link style={{ textDecoration: 'none' }} to="/books">
          books
        </Link>
      </button>
      {token ? (
        <div>
          <button onClick={() => setPage('add')}>
            <Link style={{ textDecoration: 'none' }} to="/newbook">
              add book
            </Link>
          </button>
          <button>
            <Link style={{ textDecoration: 'none' }} to="/recommand">
              recommand
            </Link>
          </button>
          <button onClick={logout}>logout</button>
        </div>
      ) : (
        <Link
          style={{
            textDecoration: 'none',
            backgroundColor: 'goldenrod',
            border: '2 solid slate',
          }}
          to="/login"
        >
          login
        </Link>
      )}
    </div>
  );
};

export default TopNav;
