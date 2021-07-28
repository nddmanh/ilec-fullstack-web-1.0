const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: String,
  password: String,
  phoneNumber: String,
  role: {
    type: String,
    default: 'USER'
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', UserSchema);

const find = async function (query, limit, offset) {
  const data = await User
  .find(query)
  .limit(limit)
  .skip(offset)
  .exec();

  const total = await User.count(query);

  return {
    data,
    total
  }
}

const findById = function (id) {
  return User.findById(id);
}

const create = function (inputs, cb) {
  const newUser = new User(inputs);

  return newUser.save();
}

const update = function (id, newObject, cb) {
  User.updateOne({ _id: id }, { $set: newObject }, function() {
    cb();
  });
}

const remove = function (id, cb) {
  User.deleteOne({ _id: id }, function() {
    cb();
  });
}

const findByEmail = function (email) {
  return User.findOne({ email: email });
}

module.exports = {
  find: find,
  findById: findById,
  create: create,
  update: update,
  remove: remove,
  findByEmail: findByEmail
};