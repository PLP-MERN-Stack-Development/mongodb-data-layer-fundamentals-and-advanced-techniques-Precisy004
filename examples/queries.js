// queries.js
use("plp_bookstore")

// Find all books in a specific genre
db.books.find({ genre: "Self-help" })

// Find books published after a certain year
db.books.find({ published_year: { $gt: 2010 } })

// Find books by a specific author
db.books.find({ author: "James Clear" })

// Update the price of a specific book
db.books.updateOne({ title: "1984" }, { $set: { price: 24 } })

// Delete a book by its title
db.books.deleteOne({ title: "The Great Gatsby" })

// Advanced Queries
db.books.find({ in_stock: true, published_year: { $gt: 2010 } }, { title: 1, author: 1, price: 1, _id: 0 }).sort({ price: 1 }).limit(5).skip(0)

// Aggregation
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])

db.books.aggregate([
  { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
  { $sort: { totalBooks: -1 } },
  { $limit: 1 }
])

db.books.aggregate([
  {
    $group: {
      _id: { $subtract: [{ $divide: ["$published_year", 10] }, { $mod: [{ $divide: ["$published_year", 10] }, 1] }] },
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
])

// Indexing
db.books.createIndex({ title: 1 })
db.books.createIndex({ author: 1, published_year: 1 })
db.books.find({ title: "Atomic Habits" }).explain("executionStats")
// queries.js
use("plp_bookstore")

// Find all books in a specific genre
db.books.find({ genre: "Self-help" })

// Find books published after a certain year
db.books.find({ published_year: { $gt: 2010 } })

// Find books by a specific author
db.books.find({ author: "James Clear" })

// Update the price of a specific book
db.books.updateOne({ title: "1984" }, { $set: { price: 24 } })

// Delete a book by its title
db.books.deleteOne({ title: "The Great Gatsby" })

// Advanced Queries
db.books.find({ in_stock: true, published_year: { $gt: 2010 } }, { title: 1, author: 1, price: 1, _id: 0 }).sort({ price: 1 }).limit(5).skip(0)

// Aggregation
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])

db.books.aggregate([
  { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
  { $sort: { totalBooks: -1 } },
  { $limit: 1 }
])

db.books.aggregate([
  {
    $group: {
      _id: { $subtract: [{ $divide: ["$published_year", 10] }, { $mod: [{ $divide: ["$published_year", 10] }, 1] }] },
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
])

// Indexing
db.books.createIndex({ title: 1 })
db.books.createIndex({ author: 1, published_year: 1 })
db.books.find({ title: "Atomic Habits" }).explain("executionStats")
