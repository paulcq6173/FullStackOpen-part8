import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { updateCache } from '../graphql/CacheHelper';
import { ALL_BOOKS, CREATE_BOOK } from '../graphql/queries';
import useField from '../hooks/useField';

const NewBook = (props) => {
  const [genres, setGenres] = useState([]);
  const useTitle = useField('title');
  const useAuthor = useField('author');
  const usePublished = useField('number');
  const useGenre = useField('genre');
  const notify = props.notify;
  const title = useTitle.value;
  const author = useAuthor.value;
  const published = Number(usePublished.value);
  // It returns array, and the first element cludes defined mutation function
  const [createBook] = useMutation(CREATE_BOOK, {
    // Auto-Refresh with query books and authors,
    // and ensure same data wouldn't save to cache twice.
    update: (cache, response) => {
      alert(`New book add:`, response.data.addBook);
      updateCache(cache, { query: ALL_BOOKS }, response.data.addBook);
    },
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join('\n');
      notify(messages);
    },
  });

  const submit = async (event) => {
    event.preventDefault();

    createBook({ variables: { title, author, published, genres } });

    useTitle.onReset();
    useAuthor.onReset();
    usePublished.onReset();
    useGenre.onReset();
    setGenres([]);
  };

  const addGenre = () => {
    setGenres(genres.concat(useGenre.value));
    useGenre.onReset();
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input {...useTitle} />
        </div>
        <div>
          author
          <input {...useAuthor} />
        </div>
        <div>
          published
          <input {...usePublished} />
        </div>
        <div>
          <input {...useGenre} />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
