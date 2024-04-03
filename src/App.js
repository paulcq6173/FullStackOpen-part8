import { useApolloClient, useSubscription } from '@apollo/client';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Notify from './components/Notify';
import TopNav from './components/TopNav';
import { updateCache } from './graphql/CacheHelper';
import { ALL_BOOKS, BOOK_ADDED } from './graphql/queries';
import Home from './pages/Home';
import Login from './pages/Login';
import Recommand from './pages/Recommand';

const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState('authors');
  const [errMessage, setErrMessage] = useState('');
  const client = useApolloClient();

  // When a new book is added, the server sends a notification
  // to the client, and the callback function defined in the onData
  // attribute is called and given the details of the new books as
  // parameters.
  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      notify(`${addedBook.name} added`);

      // The new book added to the Apollo cache,
      // so it is rendered to the screen immediately.
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  const notify = (message) => {
    setErrMessage(message);
    setTimeout(() => {
      setErrMessage('');
    }, 5000);
  };

  return (
    <div>
      <TopNav
        setPage={setPage}
        setToken={setToken}
        token={token}
        client={client}
      />
      <Notify errorMessage={errMessage} />
      <Routes>
        <Route path="/" element={<Home page={page} notify={notify} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/recommand" element={<Recommand />} />
        <Route path="/newbook" element={<NewBook notify={notify} />} />
        <Route
          path="/login"
          element={<Login setToken={setToken} notify={notify} />}
        />
      </Routes>
    </div>
  );
};

export default App;
