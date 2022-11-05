const User = require("../model/user");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JET_EXPIRESIN,
  });
};

const catchResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    message,
  });
};

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const checkuser = await User.findOne({ email });
    if (checkuser) {
      return res.status(400).json({ message: "User already registered.." });
    }

    const result = await User.create({
      name,
      email,
      password,
    });

    const token = generateToken(result._id);
    res.status(201).json({
      result,
      token,
    });
  } catch (error) {
    catchResponse(res, 500, "Something went wrong...");
    console.log(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const checkuser = await User.findOne({ email });

    if (
      !checkuser ||
      !(await checkuser.matchPassword(password, checkuser.password))
    ) {
      return res.status(401).json({
        message: "Email or Password is incorrect.",
      });
    }
    const token = generateToken(checkuser._id);
    res.status(200).json({
      result: checkuser,
      message: "Login successful..",
      token,
    });
  } catch (error) {
    catchResponse(res, 500, "Something went wrong...");
    console.log(error);
  }
};

exports.protect = async (req, res, next) => {
  //check token is avaliable or not
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        message: "You are not login , Please Login first",
      });
    }

    const payload = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //check user is still exits or not
    const loginUser = await User.findById(payload.id);
    if (!loginUser) {
      return catchResponse(res, 401, "User not exits with this token");
    }

    //GRANT ACCESS
    req.user = loginUser;
    next();
  } catch (error) {
    catchResponse(res, 500, "Something went wrong...");
  }
};

exports.googleSignIn = async (req, res, next) => {
  const { name, email, token, googleId } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      const result = {
        _id: oldUser._id.toString(),
        email,
        name,
        googleId,
      };
      return res.status(200).json({
        result,
        token,
        googleId,
      });
    }
    try {
      const result = await User.create({
        googleId,
        email,
        name,
      });

      res.status(200).json({
        result,
        token,
        googleId,
      });
    } catch (error) {
      res.status(500).json({
        message: "Backend Error",
      });
    }
  } catch (error) {
    catchResponse(res, 500, "Something went wrong...");
    console.log(error);
  }
};
