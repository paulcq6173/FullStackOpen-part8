import { useQuery } from '@apollo/client';
import Authors from '../components/Authors';
import { ALL_AUTHORS } from '../graphql/queries';

const Home = ({ page, notify }) => {
  const resultsAuthors = useQuery(ALL_AUTHORS);

  if (resultsAuthors.loading) {
    return <div>loading Now</div>;
  }

  const authors = resultsAuthors.data.allAuthors;

  return (
    <div>
      <Authors show={page === 'authors'} results={authors} setError={notify} />
    </div>
  );
};

export default Home;
