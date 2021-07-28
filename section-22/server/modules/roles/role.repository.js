const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
  name: String,
  permissions: [{
    type: String
  }]
}, {
  timestamps: true
});

const Role = mongoose.model('Role', RoleSchema);

const find = async function (query, limit, offset) {
  const data = await Role
  .find(query)
  .limit(limit)
  .skip(offset)
  .exec();

  const total = await Role.count(query);

  return {
    data,
    total
  }
}

const findById = function (id, cb) {
  Role.findById(id).exec(function (err, data) {
    cb(data);
  });
}

const findByName = function (name) {
  return Role.findOne({ name: name });
}

const create = function (inputs, cb) {
  const newRole = new Role(inputs);

  return newRole.save();
}

const update = function (id, newObject, cb) {
  Role.updateOne({ _id: id }, { $set: newObject }, function() {
    cb();
  });
}

const remove = function (id, cb) {
  Role.deleteOne({ _id: id }, function() {
    cb();
  });
}

module.exports = {
  find: find,
  findById: findById,
  findByName: findByName,
  create: create,
  update: update,
  remove: remove
};