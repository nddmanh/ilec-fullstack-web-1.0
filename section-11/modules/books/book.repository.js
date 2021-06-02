const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
  name: String,
  year: Number,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "author"
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category"
  }
});

const Book = mongoose.model('Book', BookSchema);

const find = function () {
  return Book.find({}).populate('author', 'category').exec(); 
}

const findById = function (id, cb) {
  Book.findById(id).exec(function (err, data) {
    cb(data);
  });
}

const create = function (inputs, cb) {
  const newBook = new Book(inputs);

  return newBook.save();
}

const update = function (id, newObject, cb) {
  Book.updateOne({ _id: id }, { $set: newObject }, function() {
    cb();
  });
}

const remove = function (id, cb) {
  Book.deleteOne({ _id: id }, function() {
    cb();
  });
}

module.exports = {
  find: find,
  findById: findById,
  create: create,
  update: update,
  remove: remove
};