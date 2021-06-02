const mongoose = require('mongoose');

const AuthorSchema = mongoose.Schema({
  name: String,
  phone: String,
  age: Number,
  email: String
});

const Author = mongoose.model('Author', AuthorSchema);

const find = function () {
  return Author.find({}).exec(); 
}

const findById = function (id, cb) {
  Author.findById(id).exec(function (err, data) {
    cb(data);
  });
}

const create = function (inputs, cb) {
  const newAuthor = new Author(inputs);

  return newAuthor.save();
}

const update = function (id, newObject, cb) {
  Author.updateOne({ _id: id }, { $set: newObject }, function() {
    cb();
  });
}

const remove = function (id, cb) {
  Author.deleteOne({ _id: id }, function() {
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