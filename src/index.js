const fs = require('fs')
const path = require('path')
const { ApolloServer } = require('apollo-server')

const resolvers = require('./resolvers')
const typeDefs = fs.readFileSync(path.join(__dirname, 'types.graphql'), 'utf-8')

const server = new ApolloServer({ resolvers, typeDefs })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
