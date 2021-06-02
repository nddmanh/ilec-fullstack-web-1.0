const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  name: String,
  summary: String
});

const Category = mongoose.model('Category', CategorySchema);

const find = function () {
  return Category.find({}).exec(); 
}

const findById = function (id, cb) {
  Category.findById(id).exec(function (err, data) {
    cb(data);
  });
}

const create = function (inputs, cb) {
  const newCategory = new Category(inputs);

  return newCategory.save();
}

const update = function (id, newObject, cb) {
  Category.updateOne({ _id: id }, { $set: newObject }, function() {
    cb();
  });
}

const remove = function (id, cb) {
  Category.deleteOne({ _id: id }, function() {
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