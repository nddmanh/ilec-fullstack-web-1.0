const repository = require('./student.repository');

const find = function (query) {
  // Business logic

  // Querying
  return repository.find(query);
}

const create = function (inputs) {
  // Business logic

  // Data validation

  // Persist data
  return repository.create(inputs);
}

const update = function (id, newObject, cb) {
  // Business logic

  // Persist data
  repository.update(id, newObject, cb);
}

const remove = function (id, cb) {
  repository.remove(id, cb);
}

module.exports = {
  find: find,
  create: create,
  update: update,
  remove: remove
};