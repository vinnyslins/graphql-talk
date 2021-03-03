const data = require('./data')

const resolvers = {
  Author: {
    fullName: author => `${author.firstName} ${author.lastName}`
  },

  Book: {
    author: book => data.authors.find(author => author.id === book.authorId)
  },

  Query: {
    books: () => data.books,
    authors: () => data.authors
  },

  Mutation: {
    createBook: (_, { input }) => {
      const book = {
        id: data.books.length + 1,
        title: input.title,
        authorId: parseInt(input.authorId)
      }

      data.books.push(book)

      return book
    }
  }
}

module.exports = resolvers
