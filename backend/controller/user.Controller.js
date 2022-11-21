const User = require("../model/user");
const Folder = require("../model/Folder.model");
const File = require("../model/File.model");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { mailer } = require("../utils/mailSend");
const { log } = require("console");
const crypto = require("crypto");

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
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password, user.password))) {
      return res.status(401).json({
        message: "Incorrect Email or Password",
      });
    }

    const token = generateToken(user._id);
    res.status(200).json({
      result: user,
      message: "Login successful..",
      token,
    });
  } catch (error) {
    catchResponse(res, 500, "Something went wrong In Login...");
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
    catchResponse(res, 500, "Something went wrong");
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
      };
      const token = generateToken(oldUser._id);
      return res.status(200).json({
        result,
        token,
      });
    }
    try {
      const result = await User.create({
        googleId,
        email,
        name,
      });
      const token = generateToken(result._id);
      res.status(200).json({
        result,
        token,
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

exports.forgotPassword = async (req, res, next) => {
  if (!req.body.email)
    return res.status(400).json({
      message: "Please Provide Email",
    });
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(404)
      .json({ message: "Theare is no user with email address" });

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `http://localhost:3000/reset-password/change-password/${resetToken}`;
  // const navigateURL = `/reset-password/change-password/${resetToken}`;

  const message = `Forgot your password ? Go to this URL ${resetURL}.\n If you did't forgot your password, please ignore this email!`;
  mailer(req.body.email, message);

  res.status(200).json({
    message: "Token Sent to your email",
    // navigateURL,
  });
};

exports.resetPassword = async (req, res, next) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Token is invalid or expired. Please try again",
      });
    }

    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.save();
    res.status(200).json({
      message: "Your Password has been changed successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

exports.hideCode = async (req, res, next) => {
  if (!req.body.passcode)
    return res.status(400).json({ message: "Provide Passcode" });

  try {
    const hashedCode = crypto
      .createHash("sha256")
      .update(req.body.passcode)
      .digest("hex");

    const checkuser = await User.findOne({
      email: req.user.email,
    });

    if (checkuser.hideCode === undefined) {
      checkuser.hideCode = hashedCode;
      checkuser.save();
      return res.status(200).json({ message: "Passcode Registed." });
    } else {
      if (checkuser.hideCode === hashedCode) {
        const folders = await Folder.find({
          $and: [
            { userId: req.user.id },
            { isHide: true },
            { isDeleted: false },
          ],
        });

        const files = await File.find({
          $and: [
            { userId: req.user.id },
            { isHide: true },
            { isDeleted: false },
          ],
        });
        return res.status(200).json({
          message: "Passcode Success",
          folders,
          files,
        });
      } else {
        const folders = await Folder.find({
          $and: [
            { userId: req.user.id },
            { isHide: false },
            { isDeleted: false },
          ],
        });

        const files = await File.find({
          $and: [
            { userId: req.user.id },
            { isHide: false },
            { isDeleted: false },
          ],
        });
        return res.status(200).json({
          error: "Wrong Passcode",
          folders,
          files,
        });
      }
    }
  } catch (error) {
    catchResponse(res, 500, "Something went wrong...");
    console.log(error);
  }
};
