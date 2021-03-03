const data = require('./data')

const resolvers = {
  Author: {
    fullName: author => `${author.firstName} ${author.lastName}`
  },

  Book: {
    author: book => data.authors.find(author => author.id === book.authorId)
  },

  Query: {
    book: (_, { id }) => data.books.find(book => book.id === parseInt(id)),
    books: () => data.books,
    authors: () => data.authors
  },

  Mutation: {
    createBook: (_, { input }) => {
      const lastBook = data.books[data.books.length - 1]

      const book = {
        id: (lastBook && lastBook.id + 1) || 1,
        title: input.title,
        authorId: parseInt(input.authorId)
      }

      data.books.push(book)

      return book
    },

    updateBook: (_, { id, input }) => {
      const book = data.books.find(item => item.id === parseInt(id))
      if (!book) return null

      book.title = input.title
      book.authorId = parseInt(input.authorId)

      return book
    },

    deleteBook: (_, { id }) => {
      const index = data.books.findIndex(item => item.id === parseInt(id))
      if (index === -1) return null

      const book = data.books[index]
      data.books.splice(index, 1)

      return book
    }
  }
}

module.exports = resolvers
