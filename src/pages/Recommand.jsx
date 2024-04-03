import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';
import { ALL_BOOKS, ME } from '../graphql/queries';

const Recommand = () => {
  const result = useQuery(ME);
  const [genre, setGenre] = useState(null);
  const resultsBook = useQuery(ALL_BOOKS, {
    variables: { genre },
  });

  useEffect(() => {
    if (!result.data) {
      return;
    }
    const favGenre = result.data.me.favoriteGenre;

    setGenre(favGenre);
  }, [result.data]);

  if (result.loading) {
    return <div>loading</div>;
  }

  const me = result.data.me;
  if (!me) {
    redirect('/');
    return;
  }

  if (!resultsBook.data) {
    return;
  }
  const fav = me.favoriteGenre;
  const favBooks = resultsBook.data.allBooks;

  return (
    <div>
      <div>
        <h1>recommandations</h1>
        <p>
          books in your favorite genre <strong>{fav}</strong>
        </p>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {favBooks.map((a, i) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Recommand;
