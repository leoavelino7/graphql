const { ApolloServer, gql } = require('apollo-server')

const users = [
  {
    _id: String(Math.random()),
    name: "Leonardo",
    email: "leo@email.com",
    active: true
  },
  {
    _id: String(Math.random()),
    name: "Leonardo2",
    email: "leo2@email.com",
    active: false
  },
  {
    _id: String(Math.random()),
    name: "Leonardo3",
    email: "leo3@email.com",
    active: true
  }
]

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    active: Boolean!
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    hello: String
    users: [User!]!
    getUserByEmail(email: String!): User!
  }

  type Mutation{
    createUser(name: String!, email: String!): User!
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello world',
    users: () => users,
    getUserByEmail: (_, args) => {
      return users.find((user) => user.email === args.email)
    }
  },
  Mutation: {
    createUser: (_, args) => {
      const newUser = {
        _id: String(Math.random()),
        name: args.name,
        email: args.email,
        active: true
      }

      users.push(newUser)
      
      return newUser
    }
  }
}

const server = new ApolloServer( { typeDefs, resolvers })

server
  .listen()
  .then(({ url }) => console.log(`🔥 Server started at http://localhost:${url}`))