const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  googleId: { type: String },
  passwordChangedAt : {type:String}
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.matchPassword = async function (bodypassword, userpassword) {
  return await bcrypt.compare(bodypassword, userpassword);
};

userSchema.methods.chanedPasswordAfter = function (tokenTime) {
  if (this.passwordChangedAt) {
    const convertpasswordChangedAt = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return tokenTime < convertpasswordChangedAt;
  }
  //false means not changed..
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
