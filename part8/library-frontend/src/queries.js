import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
query {
    allAuthors {
        name
        born
        bookCount
    }
}`

export const ALL_BOOKS = gql`
query allBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      title
      author {name}
      genres
      published
    }
  }`

export const ME = gql`
query {
    me{
        username
        favouriteGenre
    }
}`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!){
    addBook(
        title: $title,
        published: $published,
        author: $author,
        genres: $genres
    ) {
        title
        published
        author {
            name
        }
    }
}`

export const EDIT_AUTOR = gql`
mutation editAuthor($name: String!,$born: Int!){
    editAuthor(name: $name, born: $born){
        name,
        born
    }
}`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!){
        login(username: $username, password: $password) {
            value
        }
    }`