const User = require("../model/user");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JET_EXPIRESIN,
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

    console.log(result.password);
    const token = generateToken(result._id);
    res.status(201).json({
      result,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
    console.log(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const checkuser = await User.findOne({ email });
    if (!checkuser)
      return res.status(404).json({
        message: "User does not exits..",
      });

    const checkpass = await checkuser.matchPassword(
      password,
      checkuser.password
    );
    if (!checkpass)
      return res.status(401).json({
        message: "Password is wrong",
      });

    const token = generateToken(checkuser._id);
    res.status(200).json({
      result: checkuser,
      message:'Login successful..',
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
    console.log(error);
  }
};
