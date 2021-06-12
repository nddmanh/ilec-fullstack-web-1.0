const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
  fullName: String,
  phoneNum: String,
  className: String
}, {
  timestamps: true
});

StudentSchema.index({ fullName: 'text' });

const Student = mongoose.model('Student', StudentSchema);

const find = async function (query, limit, offset, sortField, sortOrder) {
  const sortObject = {};
  sortObject[sortField] = sortOrder;

  const data = await Student
  .find(query)
  .limit(limit)
  .skip(offset)
  .sort(sortObject)
  .exec();

  const total = await Student.count(query);

  return {
    data,
    total
  }
}

const findById = function (id, cb) {
  Student.findById(id).exec(function (err, data) {
    cb(data);
  });
}

const create = function (inputs, cb) {
  const newStudent = new Student(inputs);

  return newStudent.save();
}

const update = function (id, newObject, cb) {
  Student.updateOne({ _id: id }, { $set: newObject }, function() {
    cb();
  });
}

const remove = function (id, cb) {
  Student.deleteOne({ _id: id }, function() {
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