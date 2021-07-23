const yup = require('yup');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const userService = require('../users/user.service');

const login = async (body) => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
  });

  await schema.validate(body);

  const existedUser = await userService.findByEmail(body.email);

  if (!existedUser) {
    throw new Error('No user with this email!');
  }

  const comparePasswordResult = await bcrypt.compare(body.password, existedUser.password);

  if (!comparePasswordResult) {
    throw new Error('Wrong password!');
  }

  const tokenData = {
    _id: existedUser._id,
    email: existedUser.email,
    phoneNumber: existedUser.phoneNumber,
    role: existedUser.role
  };

  const token = await jwt.sign(tokenData, config.secretKey, {
    expiresIn: '2h'
  });

  return {
    token: token
  };
}

const register = async (body) => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    phoneNumber: yup.string().min(10).required()
  });

  await schema.validate(body);

  const existedEmail = await userService.findByEmail(body.email);

  if (existedEmail) {
    throw new Error('Email has already existed!');
  }

  const hashedPassword = await bcrypt.hash(body.password, config.saltRounds);

  return await userService.create({
    email: body.email,
    phoneNumber: body.phoneNumber,
    password: hashedPassword
  });
}

module.exports = {
  login,
  register
};
