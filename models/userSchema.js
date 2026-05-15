const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  avatar: {
    type: String,
    default: "",
  },

  address: {
    type: String,
  },
  otp: {
    type: String,
    default: "",
  },
  otpExpires: {
    type: Date,
  },
  roll: {
    type: String,
    required: true,
    enum: ["user", "admin", 'moderator'],
    default: "user",
  },

  otpverify: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

// HASH PASSWORD BEFORE SAVE
userSchema.pre("save", async function (next) {
  try {
    // password modify na hole hash korbe na
    if (!this.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);

    next();
  } catch (error) {
    next(error);
  }
});

// COMPARE PASSWORD METHOD
userSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
