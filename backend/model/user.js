const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  googleID: { type: String, required: false },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.matchPassword = async function (bodypassword, userpassword) {
  return await bcrypt.compare(bodypassword, userpassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
