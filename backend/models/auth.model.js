const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const authSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide name"],
  },
  email: {
    type: String,
    required: [true, "Please Provide email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please provide propper email id"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please provide Confirm password"],
    validate: {
      //this only work on .save() and .create()
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not same",
    },
  },
});

authSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

authSchema.methods.matchPassword = async function (bodypassword, userpassword) {
  console.log('hello');
  console.log(await bcrypt.compare(bodypassword, userpassword));
  return await bcrypt.compare(bodypassword, userpassword);
};

const Auth = mongoose.model("Auth", authSchema);
module.exports = Auth;
