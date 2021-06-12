const repository = require('./student.repository');

const find = function (query) {
  if (!query.limit) {
    throw new Error('Must have limit');
  }

  if (query.limit > 100) {
    throw new Error('You cannot fetch that many');
  }

  if (!query.offset) {
    query.offset = 0;
  }

  const limit = Number(query.limit);
  const offset = Number(query.offset);
  const sort = query.sort;
  const sortOrder = query.sortOrder;

  delete query.limit;
  delete query.offset;
  delete query.sort;
  delete query.sortOrder;

  // Transform query - Data validation
  const supportedQueryFields = ['fullName', 'phoneNum', 'className'];

  Object.keys(query).forEach(function (key) {
    if (!supportedQueryFields.includes(key)) {
      throw new Error(`Unrecognized field: ${key}`);
    }
  });

  if (query.fullName) {
    query.fullName = { $regex: query.fullName, $options: 'i' };
  }

  // Querying
  return repository.find(query, limit, offset, sort, sortOrder);
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