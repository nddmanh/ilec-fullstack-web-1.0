const repository = require('./user.repository');
const authHelper = require('../auth/auth.helper');
const PERMISSIONS = require('../../constants/permissions');
const AppError = require('../../error/AppError');

const find = function (query, user) {
  // check permissions
  
  if (!query.limit) {
    throw new AppError(400, 'Must have limit');
  }

  if (query.limit > 100) {
    throw new AppError(400, 'Cannot fetch that many!');
  }

  if (!query.offset) {
    query.offset = 0;
  }

  const limit = Number(query.limit);
  const offset = Number(query.offset);

  delete query.limit;
  delete query.offset;

  // Transform query - Data validation
  const supportedQueryFields = ['email', 'phoneNumber'];

  Object.keys(query).forEach(function (key) {
    if (!supportedQueryFields.includes(key)) {
      throw new AppError(400, `Unrecognized field: ${key}`);
    }
  });

  // Querying
  return repository.find(query, limit, offset);
}

const getProfile = function (user) {
  if (!authHelper.authorization(user.permissions, PERMISSIONS.USER.READ_SELF)) {
    throw new AppError(401, 'Permission required!');
  }

  return repository.findById(user._id);
}

const create = async function (inputs) {
  // Business logic

  // Data validation

  // Persist data
  let newUser = await repository.create(inputs);
  newUser.password = undefined;

  return newUser;
}

const update = function (id, newObject, cb) {
  // Business logic

  // Persist data
  repository.update(id, newObject, cb);
}

const remove = function (id, cb) {
  repository.remove(id, cb);
}

const findByEmail = function (email) {
  return repository.findByEmail(email);
}

module.exports = {
  find: find,
  create: create,
  update: update,
  remove: remove,
  findByEmail: findByEmail,
  getProfile: getProfile
};