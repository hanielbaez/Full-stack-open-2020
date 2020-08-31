import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        id
        title
        published
        genres
        author{
            id
            name
            born
        }
    }
`

export const ALL_USERS = gql`
query GetAllUsers{
    allAuthors{
        name
        born
        id
        bookCount
    },
}
`

export const AUTHOR_BORN = gql`
    mutation SetAuthorBorn($name: String!, $born: Int!){
        editAuthor(name: $name, born: $born){
            name
            born
            id
        }
    }
`

export const ADD_BOOK = gql`
mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String]!){
    addBook(title: $title, author: $author, published: $published, genres: $genres){
        id
        title
        published
        genres
    }
}
`

export const ALL_BOOKS = gql`
query GetAllBooks($filterBy: String) {
    allBooks(filterBy: $filterBy){
       ...BookDetails
    }
}
${BOOK_DETAILS}
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!){
        login(username: $username, password: $password){
            value
        }
    }
`

export const CURRENT_USER = gql`
    query currentUser{
        me{
            id
            username
            favoriteGenre
        }
    }
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
        ...BookDetails
        }
    }
  ${BOOK_DETAILS}
`;
