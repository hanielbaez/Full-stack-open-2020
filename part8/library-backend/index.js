const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const JWT_SECRET = 'THIS_IS_NO_SECRET'

const MONGODB_URI = 'mongodb+srv://dbUser:dbUser@cluster0.cjtqz.mongodb.net/book-gql?retryWrites=true&w=majority'

console.log('connection to', MONGODB_URI)

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const typeDefs = gql`
    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String]!
        id: ID!
    }

    type Author {
        name: String!
        born: Int
        bookCount: Int!
        id: ID!
    }

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

  type Query {
      me: User
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author]!
  }

  type Mutation {
      addBook(
          title: String!
          author: String!
          published: Int!
          genres: [String]!
      ): Book

      editAuthor(
          name: String!
          born: Int!
      ): Author

      createUser(
          username: String!
          favoriteGenre: String!
      ): User

      login(
          username: String!
          password: String!
      ): Token
  }
`

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => await Book.find({}).populate('author'),
        allAuthors: async () => {
            const authors = await Author.find({})

            return authors.map(author => {
                author.bookCount = Book.find({ author: author._id }).countDocuments() || 0
                return author
            })
        }
    },
    Mutation: {
        addBook: async (root, args, context) => {
            // if (!context.currentUser) {
            //     throw new AuthenticationError('not authenticated')
            // }

            let author = await Author.findOne({ name: args.author })

            if (!author) {
                const createdAuthor = new Author({
                    name: args.author
                })

                try {
                    author = await createdAuthor.save()
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                }
            }

            const book = new Book({
                ...args,
                author: author._id
            })
            try {
                return await book.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }
        },

        editAuthor: async (root, args, context) => {
            if (!context.currentUser) {
                throw new AuthenticationError('not authenticated')
            }

            return await Author.findOneAndUpdate({ name: args.name }, { born: args.born }, { new: true })
        },

        createUser: async (root, args) => {
            const user = new User({ ...args })
            try {
                return await user.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArg: args
                })
            }
        },

        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password != 'password') {
                throw new UserInputError('wrong credentials')
            }

            const userforToken = {
                username: user.username,
                id: user._id
            }

            return { value: jwt.sign(userforToken, JWT_SECRET) }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
})