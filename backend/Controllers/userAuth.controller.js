const Auth = require("../models/auth.model");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const errorResponse = require("../utils/errorResponse");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

exports.register = catchAsync(async (req, res, next) => {
  const newUser = await Auth.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  newUser.password = undefined;
  const token = generateToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Auth.findOne({ email });
  if (!user)
    return res.status(404).json({
      message: "User not found",
    });

  const checkpassword = await user.matchPassword(password, user.password);


  if(!checkpassword) return res.status(401).json({
    message: "Wrong password",
  })
  const token = generateToken(user._id);

  res.status({
    status: "success",
    token,
    data: {
      user,
    },
  });
});
