import { gql } from '@apollo/client'

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

export const ADD_BLOG = gql`
mutation AddBlog($title: String!, $author: String!, $published: Int!, $genres: [String]!){
    addBook(title: $title, author: $author, published: $published, genres: $genres){
        title
        author
        published
        genres
        id
    }
}
`

export const ALL_BOOKS = gql`
query GetAllBooks {
    allBooks{
        title
        author
        published
        id
    }
}
`