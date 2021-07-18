const repository = require('./category.repository');

const find = function (query) {
  // Transform query - Data validation
  const supportedQueryFields = ['title', 'description'];

  Object.keys(query).forEach(function (key) {
    if (!supportedQueryFields.includes(key)) {
      throw new Error(`Unrecognized field: ${key}`);
    }
  });

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