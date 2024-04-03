import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { ALL_BOOKS, FIND_BOOK } from '../graphql/queries';

const Book = ({ book, onClose }) => {
  const title = book.title;

  return (
    <div>
      <h2>{title}</h2>
      <div>published:{book.published}</div>
      <button onClick={onClose}>close</button>
    </div>
  );
};

const Books = () => {
  const [genre, setGenre] = useState(null);
  const allBooks = useQuery(ALL_BOOKS, {
    variables: { genre },
  });
  const [nameToSearch, setNameToSearch] = useState(null);
  const result = useQuery(FIND_BOOK, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  });

  if (allBooks.loading) {
    return null;
  }
  const books = allBooks.data.allBooks;

  if (nameToSearch && result.data) {
    return (
      <Book
        book={result.data.findBookByTitle}
        onClose={() => setNameToSearch(null)}
      />
    );
  }

  return (
    <div>
      <h2>books</h2>
      <p>{genre === '' ? 'all genres' : `in genre ${genre}`}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a, i) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>
                <button key={i} onClick={() => setNameToSearch(a.title)}>
                  view
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setGenre('refactoring')}>refactoring</button>
      <button onClick={() => setGenre('agile')}>agile</button>
      <button onClick={() => setGenre('patterns')}>patterns</button>
      <button onClick={() => setGenre('design')}>design</button>
      <button onClick={() => setGenre('crime')}>crime</button>
      <button onClick={() => setGenre('classic')}>classic</button>
      <button onClick={() => setGenre('biology')}>biology</button>
      <button onClick={() => setGenre(null)}>all genres</button>
    </div>
  );
};

export default Books;
