import { useMutation } from '@apollo/client';
import { useState } from 'react';
import Select from 'react-select';
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../graphql/queries';
import useField from '../hooks/useField';

const option = [
  { value: 'Robert Martin', label: 'Robert Martin' },
  { value: 'Martin Fowler', label: 'Martin Fowler' },
  { value: 'Fyodor Dostoevsky', label: 'Fyodor Dostoevsky' },
  { value: 'Joshua Kerievsky', label: 'Joshua Kerievsky' },
  { value: 'Sandi Metz', label: 'Sandi Metz' },
];

const Authors = (props) => {
  const [selectValue, setSelectValue] = useState(null);
  const useBorn = useField('born');
  const setError = props.setError;
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    // Auto-Refresh with query books and authors
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join('\n');
      setError(messages);
    },
  });

  if (!props.show) {
    return null;
  }

  const authors = props.results;

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = selectValue.value;
    const setBornTo = Number(useBorn.value);

    updateAuthor({ variables: { name, setBornTo } });

    useBorn.onReset();
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <form onSubmit={handleSubmit}>
          <h2>set birthyear</h2>
          <div>
            <Select
              style={{ border: '2px solid gray' }}
              options={option}
              defaultValue={selectValue}
              onChange={setSelectValue}
            />
          </div>
          <div>
            <label>born</label>
            <input {...useBorn} />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
