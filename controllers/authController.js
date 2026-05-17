const { otpEmailTemplates } = require("../helpers/emailTemplates");
const mailSender = require("../helpers/mailService");
const { isValidEmail, generateOTP } = require("../helpers/utils");
const userSchema = require("../models/userSchema");

const signup = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    if (!fullname) return res.status(400).send("Fullname is required");
    if (!email) return res.status(400).send("Email is required");
    if (!isValidEmail(email)) return res.status(400).send("Invalid email");
    if (!password) return res.status(400).send("Password is required");

    // ---------exesting email check
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User with this email already exists");
    }

    // ---------otp generate
    const otp = generateOTP();

    // ---------save user data in database
    const user = await userSchema.create({
      fullname,
      email,
      password,
      otp,
      otpExpires: Date.now() + 10 * 60 * 1000, // OTP expires in 10 minutes
    });

    await mailSender({
      email,
      subject: "OTP Verification",
      otp,
    });
  } catch (err) {
    return res.status(500).send("Server error");
  }

  res.status(200).send("Signup successful!");
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await userSchema.findOneAndUpdate({
        email , otp , otpExpires: {$gt: Date.now()} ,isverified: false
    }
   
    );
    if (!user) {
      return res.status(400).send("User not found");
    }

    if (user.otp !== otp) {
      return res.status(400).send("Invalid OTP");
    }

    if (Date.now() > user.otpExpires) {
      return res.status(400).send("OTP has expired");
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    // res.direct("clinturl/login");

    res.status(200).send("OTP verified successfully!");
  } catch (err) {
    return res.status(500).send("Server error");
  }
};


module.exports = {
  signup,
  verifyOTP,
};
