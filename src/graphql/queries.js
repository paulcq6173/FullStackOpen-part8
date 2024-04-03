import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query findAllBook($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      author {
        name
        born
      }
      genres
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation AddBook(
    $title: String!
    $published: Int!
    $genres: [String!]!
    $author: String!
  ) {
    addBook(
      title: $title
      published: $published
      genres: $genres
      author: $author
    ) {
      title
      published
      genres
    }
  }
`;

export const FIND_BOOK = gql`
  query findBook($nameToSearch: String!) {
    findBookByTitle(title: $nameToSearch) {
      title
      published
      genres
      id
    }
  }
`;

export const ME = gql`
  query Query {
    me {
      username
      favoriteGenre
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation UpdateAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

const BOOK_DETAILS = gql`
  fragment bookDetails on Book {
    title
    published
    author {
      name
      born
    }
    genres
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...bookDetails
    }
  }
  ${BOOK_DETAILS}
`;
